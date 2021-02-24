import { IpcRendererEvent } from 'electron';

import { dispatch } from '../store';
import { projectDeleteKanbanTask } from '../store/actions/projectActions/kanbanActions';
import { uiSetOpenEditKanbanTaskDialog } from '../store/actions/uiTempActions';

const { ipcRenderer } = window.require('electron');

ipcRenderer.on('deleteKanbanTask', (e: IpcRendererEvent, taskId: string): void => {
  dispatch(projectDeleteKanbanTask(taskId));
  dispatch(uiSetOpenEditKanbanTaskDialog(false));
});
