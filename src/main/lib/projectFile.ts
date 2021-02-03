import { BrowserWindow, dialog } from 'electron';

import config from '../../config';

export const saveFile = async (window: BrowserWindow): Promise<void> => {
  await saveFileAs(window);
};

export const saveFileAs = async (window: BrowserWindow): Promise<void> => {
  const { filePath, canceled } = await dialog.showSaveDialog(window, {
    filters: [
      { name: 'InOrdnung Project File', extensions: [config.extensions.default] },
    ],
  });

  if (!canceled) {
    window.webContents.send('setProjectFileData', {
      path: filePath,
      saved: true,
      fileLoaded: true,
    });
  }
};
