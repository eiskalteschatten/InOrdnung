import { ipcMain, IpcMainEvent, BrowserWindow } from 'electron';

import createProjectWindow from '../windows/project';
import { openFile, openFileDialog, saveFileAs, writeFile } from '../lib/projectFile';
import { ProjectFile, ProjectFileMetaData } from '../../interfaces/project';

ipcMain.on('createNewProject', () => createProjectWindow());

ipcMain.on('saveProject', async (e: IpcMainEvent, projectFile: ProjectFile, fileMetaData: ProjectFileMetaData, closeWindow = false): Promise<void> => {
  const window = BrowserWindow.fromWebContents(e.sender);

  if (window) {
    if (!fileMetaData.path) {
      await saveFileAs(window);
    }
    else {
      await writeFile(projectFile, fileMetaData, window);

      if (closeWindow) {
        window.close();
      }
    }
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
