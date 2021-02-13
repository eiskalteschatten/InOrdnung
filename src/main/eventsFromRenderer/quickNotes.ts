import { ipcMain, IpcMainEvent, BrowserWindow, Menu } from 'electron';

import quickNoteMenuCm from '../cmMenus/quickNoteMenu';
import { QuickNote } from '../../interfaces/quickNotes';

ipcMain.on('showQuickNoteMenu', (e: IpcMainEvent, quickNote: QuickNote): void => {
  const window = BrowserWindow.fromWebContents(e.sender);

  if (window) {
    const menu = Menu.buildFromTemplate(quickNoteMenuCm(quickNote));
    menu.popup({ window });
  }
});
