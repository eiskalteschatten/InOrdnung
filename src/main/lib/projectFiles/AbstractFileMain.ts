import { app, BrowserWindow, dialog, WebContents, MenuItem, Menu } from 'electron';
import log from 'electron-log';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';
import { unzip, createGzip } from 'zlib';
import { promisify } from 'util';
import { pipeline } from 'stream';

import config from '../../../config/main';
import i18n from '../../../i18n/main';
import { FileStoreMetaData } from '../../../shared/interfaces/fileMetaData';
import createProjectWindow from '../../windows/project';
import { RecentProjectsLocalStorage } from '../../../shared/interfaces/settings';

const { t } = i18n;

export default abstract class AbstractFileMain<ProjectFile> {
  abstract saveFileAs(projectFile: ProjectFile, fileMetaData: FileStoreMetaData, window: BrowserWindow): Promise<void>
  abstract writeFile(projectFile: ProjectFile, fileMetaData: FileStoreMetaData, window: BrowserWindow): Promise<void>

  protected async zipFile(tempFilePath: string, filePath: string) {
    const gzip = createGzip();
    const source = fs.createReadStream(tempFilePath);
    const destination = fs.createWriteStream(filePath);
    const _pipeline = promisify(pipeline);
    await _pipeline(source, gzip, destination);
  }

  static async openFileDialog(webContents?: WebContents) {
    try {
      const { filePaths, canceled } = await dialog.showOpenDialog({
        filters: [
          { name: t('files:inOrdnungProjectFile'), extensions: [config.extensions.default] },
        ],
        properties: ['openFile'],
      });

      if (!canceled) {
        await AbstractFileMain.openFile(filePaths[0], webContents);
      }
    }
    catch (error) {
      log.error(error);
    }
  }

  static async openFile(filePath: string, webContents?: WebContents) {
    try {
      const fileBuffer = await fsPromises.readFile(filePath);
      const _unzip = promisify(unzip);
      const fileContentsBuffer = await _unzip(fileBuffer);
      const fileContents = fileContentsBuffer.toString();
      const projectFile = JSON.parse(fileContents);
      const window = await createProjectWindow({ projectFile, filePath });
      window.setRepresentedFilename(filePath || '');
      app.addRecentDocument(filePath);

      if (webContents) {
        webContents.send('closeWindowIfFileNotLoaded');
      }
    }
    catch (error) {
      log.error(error);
    }
  }

  static async addToRecentProjects(filePath: string, projectName?: string) {
    try {
      const addToRecentProjectsPath = 'file://' + path.join(__dirname, '../../workers/addToRecentProjects', 'index.html');

      const addToRecentProjectsWindow = new BrowserWindow({
        width: 400,
        height: 400,
        show: false,
        webPreferences: {
          contextIsolation: true,
          preload: path.join(__dirname, '../../preload.js'),
        },
      });

      addToRecentProjectsWindow.loadURL(addToRecentProjectsPath);
      addToRecentProjectsWindow.webContents.on('did-finish-load', () => {
        addToRecentProjectsWindow.webContents.send('startWorker', { projectName, filePath });
      });
    }
    catch (error) {
      log.error(error);
    }
  }

  static async getRecentProjects(webContents?: WebContents): Promise<RecentProjectsLocalStorage[]> {
    let recentProjects: RecentProjectsLocalStorage[] = [];

    try {
      const recentProjectsFilePath = path.resolve(config.storagePath, 'recentProjects.json');

      const recentProjectsString = fs.existsSync(recentProjectsFilePath)
        ? await fsPromises.readFile(recentProjectsFilePath, 'utf8')
        : '';

      recentProjects = recentProjectsString ? JSON.parse(recentProjectsString) : [];

      for (const index in recentProjects) {
        if (recentProjects[index]?.path && !fs.existsSync(recentProjects[index].path)) {
          recentProjects.splice(Number(index), 1);
        }
      }

      if (webContents) {
        webContents.send('setRecentProjects', recentProjects);
      }

      if (process.platform !== 'darwin') {
        const appMenu = Menu.getApplicationMenu();
        const openRecentMenu = appMenu?.getMenuItemById('non-mac-open-recent');

        if (openRecentMenu?.submenu && recentProjects.length > 0) {
          // This is a nasty hack because Electron doesn't allow me to do any other way.
          // It works even though clear() is not in the official API.
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          openRecentMenu.submenu.clear();

          for (const project of recentProjects) {
            openRecentMenu.submenu.append(new MenuItem({
              label: path.basename(project.path),
              click: async (item: MenuItem, focusedWindow?: BrowserWindow) => {
                await AbstractFileMain.openFile(project.path, focusedWindow?.webContents);
              },
            }));
          }
        }
      }
    }
    catch (error) {
      log.error(error);
    }

    return recentProjects;
  }
}
