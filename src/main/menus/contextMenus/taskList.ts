import { BrowserWindow, MenuItemConstructorOptions, MenuItem as ElectronMenuItem } from 'electron';

import { MenuItem, buildMenu } from '../menuBuilder';
import i18n from '../../../i18n/main';

const { t } = i18n;

export default (taskListId: string): MenuItemConstructorOptions[] => {
  const menuItems: MenuItem[] = [
    {
      item: {
        label: t('tasks:newTask'),
        click: (item: ElectronMenuItem, focusedWindow?: BrowserWindow): void => {
          focusedWindow?.webContents.send('createTask', taskListId);
        },
      },
    },
    { item: { type: 'separator' } },
    {
      item: {
        label: t('tasks:newTaskList'),
        click: (item: ElectronMenuItem, focusedWindow?: BrowserWindow): void => {
          focusedWindow?.webContents.send('createTaskList');
        },
      },
    },
    { item: { type: 'separator' } },
    {
      item: {
        label: t('common:rename'),
        click: (item: ElectronMenuItem, focusedWindow?: BrowserWindow): void => {
          focusedWindow?.webContents.send('renameTaskList', taskListId);
        },
      },
    },
    {
      item: {
        label: t('common:delete'),
        click: (item: ElectronMenuItem, focusedWindow?: BrowserWindow): void => {
          focusedWindow?.webContents.send('deleteTaskList', taskListId);
        },
      },
    },
  ];

  return buildMenu(menuItems);
};
