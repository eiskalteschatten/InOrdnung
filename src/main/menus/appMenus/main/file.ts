import { BrowserWindow, MenuItem as ElectronMenuItem } from 'electron';

import { MenuItem, nonMacPlatforms } from '../../menuBuilder';
import i18n from '../../../../i18n/main';
import AbstractFileMain from '../../../lib/projectFiles/AbstractFileMain';
import createProjectWindow from '../../../windows/project';

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
            click: (): void => {
              createProjectWindow();
            },
          },
        },
        { item: { type: 'separator' } },
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
            label: t('tasks:newTask'),
            click: (item: ElectronMenuItem, focusedWindow?: BrowserWindow): void => {
              focusedWindow?.webContents.send('createTask');
            },
          },
        },
        {
          item: {
            label: t('tasks:newTaskList'),
            click: (item: ElectronMenuItem, focusedWindow?: BrowserWindow): void => {
              focusedWindow?.webContents.send('createTaskList');
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
          await AbstractFileMain.openFileDialog();
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
