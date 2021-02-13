import { dialog, MenuItemConstructorOptions, MenuItem, BrowserWindow } from 'electron';

import { QuickNote } from '../../../interfaces/quickNotes';
import { getTranslation } from '../../../lib/helper';

const translation = getTranslation();

export default (quickNote: QuickNote): MenuItemConstructorOptions[] => (
  [
    {
      label: translation.quickNotesOpenNote,
      click: async (item: MenuItem, focusedWindow?: BrowserWindow): Promise<void> => {
        if (focusedWindow?.webContents) {
          focusedWindow?.webContents.send('editQuickNote', quickNote);
        }
      },
    },
    {
      label: translation.quickNotesDeleteNote,
      click: async (item: MenuItem, focusedWindow?: BrowserWindow): Promise<void> => {
        const result = await dialog.showMessageBox({
          message: translation.quickNoteDeleteNoteConfirmation,
          detail: translation.youCantUndoThisAction,
          buttons: [translation.no, translation.yes],
          type: 'warning',
          defaultId: 0,
          cancelId: 0,
        });

        if (result.response === 1) {
          focusedWindow?.webContents.send('deleteQuickNote', quickNote);
        }
      },
    },
  ]
);
