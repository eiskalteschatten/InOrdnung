import { ipcMain, IpcMainEvent, dialog, BrowserWindow, Menu } from 'electron';

import kanbanTaskMenuCm from '../menus/cmMenus/kanbanTaskMenu';
import { KanbanTask } from '../../interfaces/kanban';
import { getTranslation } from '../lib/helper';

const translation = getTranslation();

ipcMain.on('showKanbanMenu', (e: IpcMainEvent, task: KanbanTask): void => {
  const window = BrowserWindow.fromWebContents(e.sender);

  if (window) {
    const menu = Menu.buildFromTemplate(kanbanTaskMenuCm(task));
    menu.popup({ window });
  }
});

ipcMain.on('deleteKanbanTask', async (e: IpcMainEvent, taskId: string): Promise<void> => {
  const result = await dialog.showMessageBox({
    message: translation.kanbanDeleteTaskConfirmation,
    detail: translation.youCantUndoThisAction,
    buttons: [translation.no, translation.yes],
    type: 'warning',
    defaultId: 0,
    cancelId: 0,
  });

  if (result.response === 1) {
    e.sender.send('deleteKanbanTask', taskId);
  }
});
