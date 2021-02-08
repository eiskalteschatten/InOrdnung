import { ipcMain, IpcMainEvent, BrowserWindow, Menu } from 'electron';

import bookmarkMenuCm from '../cmMenus/bookmarkMenu';
import { Bookmark } from '../../interfaces/bookmarks';

ipcMain.on('showBookmarkMenu', (e: IpcMainEvent, bookmark: Bookmark): void => {
  const window = BrowserWindow.fromWebContents(e.sender);

  if (window) {
    const menu = Menu.buildFromTemplate(bookmarkMenuCm(bookmark));
    menu.popup({ window });
  }
});
