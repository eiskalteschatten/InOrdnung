import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron';
import { FileStoreMetaData } from '../../shared/interfaces/fileMetaData';

import { ProjectFile } from '../../shared/lib/projectFiles/1-0/interfaces';
import getFileMainInstance from '../lib/projectFiles';
import AbstractFileMain from '../lib/projectFiles/AbstractFileMain';
import createProjectWindow from '../windows/project';

ipcMain.on('createNewProject', () => createProjectWindow());

ipcMain.on('saveProject', async (e: IpcMainEvent, projectFile: ProjectFile, fileMetaData: FileStoreMetaData, closeWindow = false) => {
  const window = BrowserWindow.fromWebContents(e.sender);
  const fileClass = await getFileMainInstance();

  if (window) {
    if (!fileMetaData.path) {
      await fileClass.saveFileAs(projectFile, fileMetaData, window);
    }
    else {
      await fileClass.writeFile(projectFile, fileMetaData, window);

      if (closeWindow) {
        window.close();
      }
    }
  }
});

ipcMain.on('saveProjectAs', async (e: IpcMainEvent, projectFile: ProjectFile, fileMetaData: FileStoreMetaData) => {
  const window = BrowserWindow.fromWebContents(e.sender);
  const fileClass = await getFileMainInstance();

  if (window) {
    await fileClass.saveFileAs(projectFile, fileMetaData, window);
  }
});

ipcMain.on('projectIsEdited', (e: IpcMainEvent, isEdited = true): void => {
  const window = BrowserWindow.fromWebContents(e.sender);
  window?.setDocumentEdited(isEdited);
});

ipcMain.on('openFile', async (e: IpcMainEvent, filePath: string): Promise<void> => {
  await AbstractFileMain.openFile(filePath, e.sender);
});

ipcMain.on('openFileDialog', async (e: IpcMainEvent): Promise<void> => {
  await AbstractFileMain.openFileDialog(e.sender);
});

ipcMain.on('getRecentProjects', async (e: IpcMainEvent): Promise<void> => {
  await AbstractFileMain.getRecentProjects(e.sender);
});
