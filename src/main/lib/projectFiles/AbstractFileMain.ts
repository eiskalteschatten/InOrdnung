import { app, BrowserWindow, dialog, WebContents, MenuItem, Menu } from 'electron';
import log from 'electron-log';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';

import config from '../../../config/main';
import i18n from '../../../i18n/main';
import { FileStoreMetaData } from '../../../shared/interfaces/fileMetaData';
import createProjectWindow from '../../windows/project';
import { RecentProjectsLocalStorage } from '../../../shared/interfaces/settings';

const { t } = i18n;

export default abstract class AbstractFileMain<ProjectFile> {
  abstract saveFileAs(projectFile: ProjectFile, fileMetaData: FileStoreMetaData, window: BrowserWindow): Promise<void>
  abstract writeFile(projectFile: ProjectFile, fileMetaData: FileStoreMetaData, window: BrowserWindow): Promise<void>

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
      const fileContents = await fsPromises.readFile(filePath, 'utf8');
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
        if (!fs.existsSync(recentProjects[index].path)) {
          delete recentProjects[index];
        }
      }

      if (webContents) {
        webContents.send('setRecentProjects', recentProjects);
      }

      const appMenu = Menu.getApplicationMenu();
      const openRecentMenu = appMenu?.getMenuItemById('non-mac-open-recent');

      if (openRecentMenu?.submenu && recentProjects.length > 0) {
        for (const index in recentProjects) {
          const project = recentProjects[index];
          const itemPosition = Number(index) + 1;  // Use index + 1 to account for the "No Recent Items" menu.

          openRecentMenu.submenu.insert(itemPosition, new MenuItem({
            label: path.basename(project.path),
            click: async (item: MenuItem, focusedWindow?: BrowserWindow) => {
              await AbstractFileMain.openFile(project.path, focusedWindow?.webContents);
            },
          }));
        }
      }
    }
    catch (error) {
      log.error(error);
    }

    return recentProjects;
  }
}
