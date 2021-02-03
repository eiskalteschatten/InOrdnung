import { dialog, MenuItemConstructorOptions, MenuItem, BrowserWindow } from 'electron';

const template: MenuItemConstructorOptions[] = [
  {
    label: 'Choose Image',
    click: (item: MenuItem, focusedWindow?: BrowserWindow): void => {
      focusedWindow?.webContents.send('get-bookcover-color');
    },
  },
  {
    label: 'Delete Image',
    click: async (item: MenuItem, focusedWindow?: BrowserWindow): Promise<void> => {
      const result = await dialog.showMessageBox({
        message: 'Are you sure you want to delete the project image?',
        detail: 'You can\'t undo this action.',
        buttons: ['No', 'Yes'],
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
