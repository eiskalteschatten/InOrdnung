import { dialog, MenuItemConstructorOptions, MenuItem, BrowserWindow } from 'electron';

import { Bookmark } from '../../../interfaces/bookmarks';
import { getTranslation } from '../../../lib/helper';

const translation = getTranslation();

export default (bookmark: Bookmark): MenuItemConstructorOptions[] => (
  [
    {
      label: translation.bookmarksOpenBookmark,
      click: async (item: MenuItem, focusedWindow?: BrowserWindow): Promise<void> => {
        if (focusedWindow?.webContents) {
          focusedWindow?.webContents.send('openBookmark', bookmark);
        }
      },
    },
    { type: 'separator' },
    {
      label: translation.bookmarksEditBookmark,
      click: async (item: MenuItem, focusedWindow?: BrowserWindow): Promise<void> => {
        if (focusedWindow?.webContents) {
          focusedWindow?.webContents.send('editBookmark', bookmark);
        }
      },
    },
    {
      label: translation.bookmarksDeleteBookmark,
      click: async (item: MenuItem, focusedWindow?: BrowserWindow): Promise<void> => {
        const result = await dialog.showMessageBox({
          message: translation.bookmarkDeleteBookmarkConfirmation,
          detail: translation.youCantUndoThisAction,
          buttons: [translation.no, translation.yes],
          type: 'warning',
          defaultId: 0,
          cancelId: 0,
        });

        if (result.response === 1) {
          focusedWindow?.webContents.send('deleteBookmark', bookmark);
        }
      },
    },
  ]
);
