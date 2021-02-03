import { dialog, MenuItemConstructorOptions, MenuItem, BrowserWindow } from 'electron';

import translations from '../../intl';
import { getLocale } from '../../lib/helper';

const translation = translations[getLocale()];

const template: MenuItemConstructorOptions[] = [
  {
    label: translation.projectChooseImage,
    click: (item: MenuItem, focusedWindow?: BrowserWindow): void => {
      focusedWindow?.webContents.send('get-bookcover-color');
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
        focusedWindow?.webContents.send('delete-bookcover');
      }
    },
  },
];

export default template;
