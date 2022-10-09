import { BrowserWindow, dialog, app } from 'electron';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';
import log from 'electron-log';

import i18n from '../../i18n/main';
import config from '../../config/main';
import { ProjectFile, ProjectFileMetaData, RecentProjectsLocalStorage } from '../../shared/interfaces/File';
import createProjectWindow from '../windows/main';

const { t } = i18n;

export const saveFileAs = async (window: BrowserWindow): Promise<void> => {
  const { filePath, canceled } = await dialog.showSaveDialog(window, {
    filters: [
      { name: t('files:inOrdnungProjectFile'), extensions: [config.extensions.default] },
    ],
  });

  if (!canceled) {
    window.setRepresentedFilename(filePath || '');
    window.webContents.send('setProjectFileMetaData', { path: filePath });
    window.webContents.send('saveProject');
  }
};

export const writeFile = async (projectFile: ProjectFile, fileMetaData: ProjectFileMetaData, window: BrowserWindow): Promise<void> => {
  try {
    if (!fileMetaData.path) {
      await saveFileAs(window);
    }
    else {
      await fsPromises.writeFile(fileMetaData.path, JSON.stringify(projectFile), 'utf8');

      window.webContents.send('setProjectFileMetaData', {
        ...fileMetaData,
        saved: true,
        fileLoaded: true,
      });

      window.setDocumentEdited(false);
      app.addRecentDocument(fileMetaData.path);

      await addToRecentProjects(
        fileMetaData.path,
        projectFile.project.info.name
      );
    }
  }
  catch (error) {
    log.error(error);
  }
};

export const openFileDialog = async (): Promise<void> => {
  try {
    const { filePaths, canceled } = await dialog.showOpenDialog({
      filters: [
        { name: t('files:inOrdnungProjectFile'), extensions: [config.extensions.default] },
      ],
      properties: ['openFile'],
    });

    if (!canceled) {
      await openFile(filePaths[0]);
    }
  }
  catch (error) {
    log.error(error);
  }
};

export const openFile = async (filePath: string): Promise<void> => {
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
};

export const addToRecentProjects = async (filePath: string, projectName?: string): Promise<void> => {
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
};

export const getRecentProjects = async (): Promise<RecentProjectsLocalStorage[]> => {
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
};
