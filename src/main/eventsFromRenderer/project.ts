import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron';

import { ProjectFile, ProjectFileMetaData } from '../../shared/interfaces/File';
import { saveFileAs, writeFile } from '../lib/projectFile';

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
