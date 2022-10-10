import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron';

import { ProjectFile, ProjectFileMetaData } from '../../shared/interfaces/File';
import { openFile, openFileDialog, saveFileAs, writeFile } from '../lib/projectFile';

ipcMain.on('saveProject', async (e: IpcMainEvent, projectFile: ProjectFile, fileMetaData: ProjectFileMetaData, closeWindow = false) => {
  const window = BrowserWindow.fromWebContents(e.sender);

  if (window) {
    if (!fileMetaData.path) {
      await saveFileAs(projectFile, fileMetaData, window);
    }
    else {
      await writeFile(projectFile, fileMetaData, window);

      if (closeWindow) {
        window.close();
      }
    }
  }
});

ipcMain.on('saveProjectAs', async (e: IpcMainEvent, projectFile: ProjectFile, fileMetaData: ProjectFileMetaData) => {
  const window = BrowserWindow.fromWebContents(e.sender);

  if (window) {
    await saveFileAs(projectFile, fileMetaData, window);
  }
});

ipcMain.on('projectIsEdited', (e: IpcMainEvent, isEdited = true): void => {
  const window = BrowserWindow.fromWebContents(e.sender);
  window?.setDocumentEdited(isEdited);
});

ipcMain.on('openFile', async (e: IpcMainEvent, filePath: string): Promise<void> => {
  await openFile(filePath);
});

ipcMain.on('openFileDialog', async (): Promise<void> => {
  await openFileDialog();
});
