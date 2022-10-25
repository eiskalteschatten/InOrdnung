import { app, BrowserWindow, dialog } from 'electron';
import log from 'electron-log';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';

import config from '../../../config/main';
import i18n from '../../../i18n/main';
import { FileStoreMetaData } from '../../interfaces/fileMetaData';
import createProjectWindow from '../../../main/windows/project';
import { RecentProjectsLocalStorage } from '../../interfaces/settings';

const { t } = i18n;

export default abstract class AbstractFileMain<ProjectFile> {
  abstract saveFileAs(projectFile: ProjectFile, fileMetaData: FileStoreMetaData, window: BrowserWindow): Promise<void>
  abstract writeFile(projectFile: ProjectFile, fileMetaData: FileStoreMetaData, window: BrowserWindow): Promise<void>

  async openFileDialog() {
    try {
      const { filePaths, canceled } = await dialog.showOpenDialog({
        filters: [
          { name: t('files:inOrdnungProjectFile'), extensions: [config.extensions.default] },
        ],
        properties: ['openFile'],
      });

      if (!canceled) {
        await this.openFile(filePaths[0]);
      }
    }
    catch (error) {
      log.error(error);
    }
  }

  async openFile(filePath: string) {
    try {
      const fileContentsString = await fsPromises.readFile(filePath, 'utf8');
      const fileContents = JSON.parse(fileContentsString);
      const window = await createProjectWindow(fileContents, filePath);
      window.setRepresentedFilename(filePath || '');
      app.addRecentDocument(filePath);
    }
    catch (error) {
      log.error(error);
    }
  }

  static async addToRecentProjects(filePath: string, projectName?: string) {
    try {
      const addToRecentProjectsPath = 'file://' + path.join(__dirname, '../workers/addToRecentProjects', 'index.html');

      const addToRecentProjectsWindow = new BrowserWindow({
        width: 400,
        height: 400,
        show: false,
        webPreferences: {
          contextIsolation: true,
          preload: path.join(__dirname, '../preload.js'),
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

  static async getRecentProjects(): Promise<RecentProjectsLocalStorage[]> {
    let recentProjects = [];

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
    }
    catch (error) {
      log.error(error);
    }

    return recentProjects;
  }
}
