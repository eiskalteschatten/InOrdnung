import { ipcMain, IpcMainEvent, BrowserWindow, Menu } from 'electron';

import taskMenuCm from '../cmMenus/taskMenu';
import { Task } from '../../interfaces/tasks';

ipcMain.on('showTaskMenu', (e: IpcMainEvent, task: Task): void => {
  const window = BrowserWindow.fromWebContents(e.sender);

  if (window) {
    const menu = Menu.buildFromTemplate(taskMenuCm(task));
    menu.popup({ window });
  }
});
