import { BrowserWindow, dialog, app } from 'electron';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';
import log from 'electron-log';

import config from '../../config';
import { ProjectFile, ProjectFileMetaData, RecentProjectsLocalStorage } from '../../interfaces/project';
import { getTranslation } from '../../lib/helper';
import createProjectWindow from '../windows/project';

const translation = getTranslation();

export const saveFileAs = async (window: BrowserWindow): Promise<void> => {
  const { filePath, canceled } = await dialog.showSaveDialog(window, {
    filters: [
      { name: translation.projectInOrdnungProjectFile, extensions: [config.extensions.default] },
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
        projectFile.project.projectInfo.name,
        projectFile.project.projectInfo.image?.image,
        projectFile.project.projectInfo.image?.mimeType
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
        { name: translation.projectInOrdnungProjectFile, extensions: [config.extensions.default] },
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

export const addToRecentProjects = async (filePath: string, projectName?: string, image?: string, mimeType?: string): Promise<void> => {
  try {

    const addToRecentProjectsPath = 'file://' + path.join(__dirname, '../workers/', 'addToRecentProjects.html');

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
      addToRecentProjectsWindow.webContents.send('startWorker', { projectName, filePath, image, mimeType });
    });
  }
  catch (error) {
    log.error(error);
  }
};

export const getRecentProjects = async (): Promise<RecentProjectsLocalStorage[]> => {
  let recentProjects = [];

  try {
    const recentProjectsFilePath = path.resolve(config.app.storagePath, 'recentProjects.json');

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
