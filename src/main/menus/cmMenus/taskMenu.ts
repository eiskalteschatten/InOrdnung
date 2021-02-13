import { dialog, MenuItemConstructorOptions, MenuItem, BrowserWindow } from 'electron';

import { Task } from '../../../interfaces/tasks';
import { getTranslation } from '../../../lib/helper';

const translation = getTranslation();

export default (task: Task): MenuItemConstructorOptions[] => (
  [
    {
      label: translation.tasksEditTask,
      click: async (item: MenuItem, focusedWindow?: BrowserWindow): Promise<void> => {
        if (focusedWindow?.webContents) {
          focusedWindow?.webContents.send('editTask', task);
        }
      },
    },
    {
      label: translation.tasksDeleteTask,
      click: async (item: MenuItem, focusedWindow?: BrowserWindow): Promise<void> => {
        const result = await dialog.showMessageBox({
          message: translation.bookmarkDeleteTaskConfirmation,
          detail: translation.youCantUndoThisAction,
          buttons: [translation.no, translation.yes],
          type: 'warning',
          defaultId: 0,
          cancelId: 0,
        });

        if (result.response === 1) {
          focusedWindow?.webContents.send('deleteTask', task);
        }
      },
    },
  ]
);
