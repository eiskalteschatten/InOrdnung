import { ipcMain, dialog, IpcMainEvent } from 'electron';

import config from '../config';
import createProjectWindow from './windows/project';
import { checkIfFileIsImage, encodeImage } from '../lib/images';

ipcMain.on('createNewProject', createProjectWindow);

ipcMain.on('selectProjectImage', async (): Promise<void> => {
  const result = await dialog.showOpenDialog({
    filters: [
      { name: 'Images', extensions: config.extensions.images },
    ],
    properties: ['openFile'],
  });

  const encodedImage = await encodeImage(result.filePaths[0]);

  // TODO: send to Redux

  console.log(encodedImage);
});

ipcMain.on('handleProjectImageDrop', async (event: IpcMainEvent, imagePath: string): Promise<void> => {
  const fileIsImage = checkIfFileIsImage(imagePath, true);

  if (fileIsImage) {
    const encodedImage = await encodeImage(imagePath);

    // TODO: send to Redux

    console.log(encodedImage);
  }
});
