import { IpcRendererEvent } from 'electron';

import { dispatch } from '../store';
import { projectDeleteKanbanTask } from '../store/actions/projectActions/kanbanActions';
import { uiOpenEditKanbanTaskDialog } from '../store/actions/uiActions';

const { ipcRenderer } = window.require('electron');

ipcRenderer.on('deleteKanbanTask', (e: IpcRendererEvent, taskId: string): void => {
  dispatch(projectDeleteKanbanTask(taskId));
  dispatch(uiOpenEditKanbanTaskDialog(false));
});
