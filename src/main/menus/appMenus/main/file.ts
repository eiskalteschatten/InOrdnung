import { BrowserWindow, MenuItem as ElectronMenuItem } from 'electron';

import { MenuItem, nonMacPlatforms } from '../../menuBuilder';
import i18n from '../../../../i18n/main';
import { openFileDialog, saveFileAs } from '../../../lib/projectFile';

const { t } = i18n;

export default (): MenuItem => {
  const submenuItems: MenuItem[] = [
    {
      item: {
        label: t('appMenu:new'),
      },
      submenu: [
        {
          item: {
            label: t('projects:newProject'),
            accelerator: 'CmdOrCtrl+N',
            click: async (): Promise<void> => {
              console.log('New Project');
            },
          },
        },
        { item: { type: 'separator' } },
        {
          item: {
            label: t('bookmarks:newBookmark'),
            click: async (): Promise<void> => {
              console.log('New Bookmark');
            },
          },
        },
      ],
    },
    {
      item: {
        label: t('appMenu:open'),
        accelerator: 'CmdOrCtrl+O',
        click: async (): Promise<void> => {
          await openFileDialog();
        },
      },
    },
    {
      platforms: ['darwin'],
      item: {
        label: t('appMenu:openRecent'),
        role: 'recentDocuments',
        submenu:[
          {
            label: t('appMenu:clearMenu'),
            role: 'clearRecentDocuments',
          },
        ],
      },
    },
    { item: { type: 'separator' } },
    {
      platforms: ['darwin'],
      item: {
        label: t('appMenu:close'),
        role: 'close',
      },
    },
    {
      item:  {
        label: t('common:save'),
        accelerator: 'CmdOrCtrl+S',
        click: (item: ElectronMenuItem, focusedWindow?: BrowserWindow): void => {
          focusedWindow?.webContents.send('saveProject');
        },
      },
    },
    {
      item: {
        label: t('appMenu:saveAs'),
        accelerator: 'CmdOrCtrl+Shift+S',
        click: (item: ElectronMenuItem, focusedWindow?: BrowserWindow): void => {
          if (focusedWindow) {
            focusedWindow?.webContents.send('saveProjectAs');
          }
        },
      },
    },
    {
      platforms: nonMacPlatforms,
      item: { type: 'separator' },
    },
    {
      platforms: nonMacPlatforms,
      item: {
        label: t('appMenu:quit'),
        role: 'quit',
      },
    },
  ];

  const menuItem: MenuItem = {
    item: {
      label: t('appMenu:file'),
    },
    submenu: submenuItems,
  };

  return menuItem;
};
