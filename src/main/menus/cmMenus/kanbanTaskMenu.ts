import { dialog, MenuItemConstructorOptions, MenuItem, BrowserWindow } from 'electron';

import { KanbanTask } from '../../../interfaces/kanban';
import { getTranslation } from '../../lib/helper';

const translation = getTranslation();

export default (task: KanbanTask): MenuItemConstructorOptions[] => (
  [
    {
      label: translation.kanbanEditTask,
      click: async (item: MenuItem, focusedWindow?: BrowserWindow): Promise<void> => {
        if (focusedWindow?.webContents) {
          focusedWindow?.webContents.send('editKanbanTask', task);
        }
      },
    },
    {
      label: translation.kanbanDeleteTask,
      click: async (item: MenuItem, focusedWindow?: BrowserWindow): Promise<void> => {
        const result = await dialog.showMessageBox({
          message: translation.kanbanDeleteTaskConfirmation,
          detail: translation.youCantUndoThisAction,
          buttons: [translation.no, translation.yes],
          type: 'warning',
          defaultId: 0,
          cancelId: 0,
        });

        if (result.response === 1) {
          focusedWindow?.webContents.send('deleteKanbanTask', task.id);
        }
      },
    },
  ]
);
