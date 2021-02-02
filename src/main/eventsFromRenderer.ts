import { ipcMain, dialog } from 'electron';

import config from '../config';
import createProjectWindow from './windows/project';

ipcMain.on('createNewProject', createProjectWindow);

ipcMain.on('selectProjectImage', async (): Promise<void> => {
  const result = await dialog.showOpenDialog({
    filters: [
      { name: 'Images', extensions: config.extensions.images },
    ],
    properties: ['openFile'],
  });
});
