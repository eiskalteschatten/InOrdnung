import { BrowserWindow, dialog, app } from 'electron';
import { promises as fsPromises } from 'fs';

import config from '../../config';
import { ProjectFile, ProjectFileMetaData } from '../../interfaces/project';
import { getTranslation } from '../../lib/helper';
import createProjectWindow from '../windows/project';
import { createThumbnail } from './images';

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
      await addToRecentProjects(window, fileMetaData.path, projectFile.project.projectInfo.image?.image, projectFile.project.projectInfo.image?.mimeType);
    }
  }
  catch (error) {
    console.error(error);
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
    console.error(error);
  }
};

export const openFile = async (filePath: string): Promise<void> => {
  try {
    const fileContentsString = await fsPromises.readFile(filePath, 'utf8');
    const fileContents = JSON.parse(fileContentsString);
    await createProjectWindow(fileContents, filePath);
    app.addRecentDocument(filePath);
  }
  catch (error) {
    console.error(error);
  }
};

export const addToRecentProjects = async (window: BrowserWindow, filePath: string, image?: string, mimeType?: string): Promise<void> => {
  try {
    const thumbnail = image ? await createThumbnail(image) : undefined;
    window.webContents.send('addToRecentProjects', filePath, thumbnail, mimeType);
  }
  catch (error) {
    console.error(error);
  }
};
