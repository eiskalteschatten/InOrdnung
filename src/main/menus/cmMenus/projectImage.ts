import { dialog, MenuItemConstructorOptions, MenuItem, BrowserWindow } from 'electron';

import { getTranslation } from '../../../lib/helper';
import { selectProjectImage } from '../../lib/project';

const translation = getTranslation();

const template: MenuItemConstructorOptions[] = [
  {
    label: translation.projectChooseImage,
    click: async (item: MenuItem, focusedWindow?: BrowserWindow): Promise<void> => {
      if (focusedWindow?.webContents) {
        await selectProjectImage(focusedWindow);
      }
    },
  },
  {
    label: translation.projectDeleteImage,
    click: async (item: MenuItem, focusedWindow?: BrowserWindow): Promise<void> => {
      const result = await dialog.showMessageBox({
        message: translation.projectDeleteImageConfirmation,
        detail: translation.youCantUndoThisAction,
        buttons: [translation.no, translation.yes],
        type: 'warning',
        defaultId: 0,
        cancelId: 0,
      });

      if (result.response === 1) {
        focusedWindow?.webContents.send('deleteProjectImage');
      }
    },
  },
];

export default template;
