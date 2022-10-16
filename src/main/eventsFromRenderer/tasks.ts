import { ipcMain, IpcMainEvent, BrowserWindow, Menu } from 'electron';

import taskListContextMenu from '../menus/contextMenus/taskList';

ipcMain.on('openTaskListContextMenu', (e: IpcMainEvent, taskListId: string): void => {
  const window = BrowserWindow.fromWebContents(e.sender) || undefined;
  const menu = Menu.buildFromTemplate(taskListContextMenu(taskListId));
  menu?.popup({ window });
});
