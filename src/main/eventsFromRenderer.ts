import { ipcMain, dialog } from 'electron';

import createProjectWindow from './windows/project';

ipcMain.on('createNewProject', createProjectWindow);

ipcMain.on('selectProjectImage', async (): Promise<void> => {
  const result = await dialog.showOpenDialog(remote.getCurrentWindow(), {
    filters: [
      { name: 'Images', extensions: config.bookcovers.extensions },
    ],
    properties: ['openFile'],
  });
});
