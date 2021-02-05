import { ipcMain, IpcMainEvent, BrowserWindow, Menu } from 'electron';

import createProjectWindow from './windows/project';
import { checkIfFileIsImage, encodeImage, getFileType } from './lib/images';
import projectImageCm from './cmMenus/projectImage';
import { selectProjectImage } from './lib/project';
import { openFile, openFileDialog, writeFile } from './lib/projectFile';
import { ProjectFile, ProjectFileMetaData } from '../interfaces/project';

ipcMain.on('createNewProject', () => createProjectWindow());

ipcMain.on('selectProjectImage', async (e: IpcMainEvent): Promise<void> => {
  const window = BrowserWindow.fromWebContents(e.sender);
  if (window) {
    await selectProjectImage(window);
  }
});

ipcMain.on('handleProjectImageDrop', async (e: IpcMainEvent, imagePath: string): Promise<void> => {
  const fileIsImage = checkIfFileIsImage(imagePath, true);

  if (fileIsImage) {
    const image = await encodeImage(imagePath);
    const mimeType = await getFileType(imagePath);
    e.sender.send('updateProjectInfo', { image: { image, mimeType } });
  }
});

ipcMain.on('showProjectImageContextMenu', (e: IpcMainEvent): void => {
  const window = BrowserWindow.fromWebContents(e.sender);

  if (window) {
    const menu = Menu.buildFromTemplate(projectImageCm);
    menu.popup({ window });
  }
});

ipcMain.on('saveProject', async (e: IpcMainEvent, projectFile: ProjectFile, fileMetaData: ProjectFileMetaData, closeWindow = false): Promise<void> => {
  const window = BrowserWindow.fromWebContents(e.sender);

  if (window) {
    await writeFile(projectFile, fileMetaData, window);

    if (closeWindow) {
      window.close();
    }
  }
});

ipcMain.on('projectIsEdited', (e: IpcMainEvent): void => {
  const window = BrowserWindow.fromWebContents(e.sender);
  window?.setDocumentEdited(true);
});

ipcMain.on('openFile', async (e: IpcMainEvent, filePath: string): Promise<void> => {
  await openFile(filePath);
});

ipcMain.on('openFileDialog', async (): Promise<void> => {
  await openFileDialog();
});
