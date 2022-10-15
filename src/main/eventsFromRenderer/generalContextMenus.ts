import { ipcMain, IpcMainEvent, BrowserWindow, Menu } from 'electron';

import textFieldContextMenu from '../menus/contextMenus/textField';
import copyContextMenu from '../menus/contextMenus/copy';

ipcMain.on('openTextFieldContextMenu', (e: IpcMainEvent): void => {
  const window = BrowserWindow.fromWebContents(e.sender) || undefined;
  const menu = Menu.buildFromTemplate(textFieldContextMenu());
  menu?.popup({ window });
});

ipcMain.on('openCopyContextMenu', (e: IpcMainEvent): void => {
  const window = BrowserWindow.fromWebContents(e.sender) || undefined;
  const menu = Menu.buildFromTemplate(copyContextMenu());
  menu?.popup({ window });
});
