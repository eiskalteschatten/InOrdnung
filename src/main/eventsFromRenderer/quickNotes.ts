import { ipcMain, IpcMainEvent, BrowserWindow, Menu, dialog } from 'electron';

import quickNoteMenuCm from '../cmMenus/quickNoteMenu';
import { QuickNote } from '../../interfaces/quickNotes';
import { getTranslation } from '../../lib/helper';

ipcMain.on('showQuickNoteMenu', (e: IpcMainEvent, quickNote: QuickNote): void => {
  const window = BrowserWindow.fromWebContents(e.sender);

  if (window) {
    const menu = Menu.buildFromTemplate(quickNoteMenuCm(quickNote));
    menu.popup({ window });
  }
});

ipcMain.on('deleteQuickNote', async (e: IpcMainEvent, quickNote: QuickNote): Promise<void> => {
  const translation = getTranslation();

  const result = await dialog.showMessageBox({
    message: translation.quickNoteDeleteNoteConfirmation,
    detail: translation.youCantUndoThisAction,
    buttons: [translation.no, translation.yes],
    type: 'warning',
    defaultId: 0,
    cancelId: 0,
  });

  if (result.response === 1) {
    e.sender.send('deleteQuickNote', quickNote);
  }
});
