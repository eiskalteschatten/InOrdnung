import { BrowserWindow, MenuItem as ElectronMenuItem } from 'electron';

import { getTranslation } from '../../../../lib/helper';
import createProjectWindow from '../../../windows/project';
import { openFileDialog, saveFileAs } from '../../../lib/projectFile';
import { MenuItem } from '../../menuBuilder';

const translation = getTranslation();

const submenuItems: MenuItem[] = [
  {
    item: {
      label: translation.new,
    },
    submenu: [
      {
        item: {
          label: translation.menuNewProject,
          accelerator: 'CmdOrCtrl+N',
          click: async (): Promise<void> => {
            await createProjectWindow();
          },
        },
      },
      { item: { type: 'separator' } },
      {
        item: {
          label: translation.tasksNewTask,
          click: (item: ElectronMenuItem, focusedWindow?: BrowserWindow): void => {
            focusedWindow?.webContents.send('newTask');
          },
        },
      },
      {
        item: {
          label: translation.quickNotesNewQuickNote,
          click: (item: ElectronMenuItem, focusedWindow?: BrowserWindow): void => {
            focusedWindow?.webContents.send('newQuickNote');
          },
        },
      },
      {
        item: {
          label: translation.bookmarksNewBookmark,
          click: (item: ElectronMenuItem, focusedWindow?: BrowserWindow): void => {
            focusedWindow?.webContents.send('newBookmark');
          },
        },
      },
    ],
  },
  {
    item: {
      label: translation.menuOpen,
      accelerator: 'CmdOrCtrl+O',
      click: async (): Promise<void> => {
        await openFileDialog();
      },
    },
  },
  {
    platforms: ['darwin'],
    item: {
      label: translation.menuOpenRecent,
      role: 'recentDocuments',
      submenu:[
        {
          label: translation.menuClearMenu,
          role: 'clearRecentDocuments',
        },
      ],
    },
  },
  { item: { type: 'separator' } },
  { item: { role: 'close' } },
  {
    item:  {
      label: translation.menuSave,
      accelerator: 'CmdOrCtrl+S',
      click: (item: ElectronMenuItem, focusedWindow?: BrowserWindow): void => {
        focusedWindow?.webContents.send('saveProject');
      },
    },
  },
  {
    item: {
      label: translation.menuSaveAs,
      accelerator: 'CmdOrCtrl+Shift+S',
      click: async (item: ElectronMenuItem, focusedWindow?: BrowserWindow): Promise<void> => {
        if (focusedWindow) {
          await saveFileAs(focusedWindow);
        }
      },
    },
  },
];

const menuItem: MenuItem = {
  item: {
    label: translation.file,
  },
  submenu: submenuItems,
};

export default menuItem;
