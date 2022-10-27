import { ipcMain, IpcMainEvent, BrowserWindow, Menu } from 'electron';

import taskListContextMenu from '../menus/contextMenus/taskList';
import taskContextMenu from '../menus/contextMenus/task';

ipcMain.on('openTaskListContextMenu', (e: IpcMainEvent, taskListId: string): void => {
  const window = BrowserWindow.fromWebContents(e.sender) || undefined;
  const menu = Menu.buildFromTemplate(taskListContextMenu(taskListId));
  menu?.popup({ window });
});

ipcMain.on('openTaskContextMenu', (e: IpcMainEvent, taskId: string, taskListId?: string): void => {
  const window = BrowserWindow.fromWebContents(e.sender) || undefined;
  const menu = Menu.buildFromTemplate(taskContextMenu(taskId, taskListId));
  menu?.popup({ window });
});
