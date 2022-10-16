import { BrowserWindow, MenuItemConstructorOptions, MenuItem as ElectronMenuItem } from 'electron';

import { MenuItem, buildMenu } from '../menuBuilder';
import i18n from '../../../i18n/main';

const { t } = i18n;

export default (bookmarkId: string): MenuItemConstructorOptions[] => {
  const menuItems: MenuItem[] = [
    {
      item: {
        label: t('bookmarks:newBookmark'),
        click: (item: ElectronMenuItem, focusedWindow?: BrowserWindow): void => {
          focusedWindow?.webContents.send('createBookmark');
        },
      },
    },
    { item: { type: 'separator' } },
    {
      item: {
        label: t('bookmarks:editBookmark'),
        click: (item: ElectronMenuItem, focusedWindow?: BrowserWindow): void => {
          focusedWindow?.webContents.send('editBookmark', bookmarkId);
        },
      },
    },
    {
      item: {
        label: t('bookmarks:deleteBookmark'),
        click: (item: ElectronMenuItem, focusedWindow?: BrowserWindow): void => {
          focusedWindow?.webContents.send('deleteBookmark', bookmarkId);
        },
      },
    },
  ];

  return buildMenu(menuItems);
};
