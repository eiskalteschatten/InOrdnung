import { BrowserWindow, MenuItemConstructorOptions, MenuItem as ElectronMenuItem } from 'electron';

import { MenuItem, buildMenu } from '../menuBuilder';
import i18n from '../../../i18n/main';

const { t } = i18n;

export default (taskId: string, taskListId?: string): MenuItemConstructorOptions[] => {
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
        label: t('tasks:editTask'),
        click: (item: ElectronMenuItem, focusedWindow?: BrowserWindow): void => {
          focusedWindow?.webContents.send('editTask', taskId);
        },
      },
    },
    {
      item: {
        label: t('common:delete'),
        click: (item: ElectronMenuItem, focusedWindow?: BrowserWindow): void => {
          focusedWindow?.webContents.send('deleteTask', taskId);
        },
      },
    },
  ];

  return buildMenu(menuItems);
};
