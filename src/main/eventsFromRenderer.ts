import { ipcMain, dialog, IpcMainEvent, BrowserWindow, Menu } from 'electron';

import config from '../config';
import createProjectWindow from './windows/project';
import { checkIfFileIsImage, encodeImage, getFileType } from './lib/images';
import projectImageCm from './cmMenus/projectImage';

ipcMain.on('createNewProject', createProjectWindow);

ipcMain.on('selectProjectImage', async (e: IpcMainEvent): Promise<void> => {
  const result = await dialog.showOpenDialog({
    filters: [
      { name: 'Images', extensions: config.extensions.images },
    ],
    properties: ['openFile'],
  });

  const imagePath = result.filePaths[0];
  if (imagePath) {
    const image = await encodeImage(imagePath);
    const mimeType = await getFileType(imagePath);
    e.sender.send('updateProjectInfo', { image: { image, mimeType } });
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
