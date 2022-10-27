import { ipcMain, IpcMainEvent, BrowserWindow, Menu } from 'electron';

import bookmarkContextMenu from '../menus/contextMenus/bookmark';

ipcMain.on('openBookmarkContextMenu', (e: IpcMainEvent, bookmarkId: string): void => {
  const window = BrowserWindow.fromWebContents(e.sender) || undefined;
  const menu = Menu.buildFromTemplate(bookmarkContextMenu(bookmarkId));
  menu?.popup({ window });
});
