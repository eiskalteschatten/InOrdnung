import { MenuItemConstructorOptions, MenuItem, BrowserWindow } from 'electron';

import menuBuilder from '../../menuBuilder';
import appMenuItems from './app';
import editMenuItems from './edit';
import viewMenuItems from './view';
import windowMenuItems from './window';
import helpMenuItems from './help';

import { getTranslation } from '../../../../lib/helper';
import createWindow from '../../../windows/project';
import { openFileDialog, saveFileAs } from '../../../lib/projectFile';

const translation = getTranslation();

const template: MenuItemConstructorOptions[] = [
  {
    label: translation.file,
    submenu: [
      {
        label: translation.new,
        submenu: [
          {
            label: translation.menuNewProject,
            accelerator: 'CmdOrCtrl+N',
            click: async (): Promise<void> => {
              await createWindow();
            },
          },
          { type: 'separator' },
          {
            label: translation.tasksNewTask,
            click: (item: MenuItem, focusedWindow?: BrowserWindow): void => {
              focusedWindow?.webContents.send('newTask');
            },
          },
          {
            label: translation.quickNotesNewQuickNote,
            click: (item: MenuItem, focusedWindow?: BrowserWindow): void => {
              focusedWindow?.webContents.send('newQuickNote');
            },
          },
          {
            label: translation.bookmarksNewBookmark,
            click: (item: MenuItem, focusedWindow?: BrowserWindow): void => {
              focusedWindow?.webContents.send('newBookmark');
            },
          },
        ],
      },
      {
        label: translation.menuOpen,
        accelerator: 'CmdOrCtrl+O',
        click: async (): Promise<void> => {
          await openFileDialog();
        },
      },
      {
        label: translation.menuOpenRecent,
        role: 'recentDocuments',
        submenu:[
          {
            label: translation.menuClearMenu,
            role: 'clearRecentDocuments',
          },
        ],
      },
      { type: 'separator' },
      { role: 'close' },
      {
        label: translation.menuSave,
        accelerator: 'CmdOrCtrl+S',
        click: (item: MenuItem, focusedWindow?: BrowserWindow): void => {
          focusedWindow?.webContents.send('saveProject');
        },
      },
      {
        label: translation.menuSaveAs,
        accelerator: 'CmdOrCtrl+Shift+S',
        click: async (item: MenuItem, focusedWindow?: BrowserWindow): Promise<void> => {
          if (focusedWindow) {
            await saveFileAs(focusedWindow);
          }
        },
      },
    ],
  },
  menuBuilder(editMenuItems),
  menuBuilder(viewMenuItems),
  menuBuilder(windowMenuItems),
  menuBuilder(helpMenuItems),
];

if (process.platform === 'darwin') {
  template.unshift(menuBuilder(appMenuItems));
}

export default template;
