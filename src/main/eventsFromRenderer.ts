import { ipcMain, dialog } from 'electron';

import config from '../config';
import createProjectWindow from './windows/project';
import { encodeImage } from '../lib/images';

ipcMain.on('createNewProject', createProjectWindow);

ipcMain.on('selectProjectImage', async (): Promise<void> => {
  const result = await dialog.showOpenDialog({
    filters: [
      { name: 'Images', extensions: config.extensions.images },
    ],
    properties: ['openFile'],
  });

  const encodedImage = await encodeImage(result.filePaths[0]);

  console.log(encodedImage);
});
