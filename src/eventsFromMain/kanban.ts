import { IpcRendererEvent } from 'electron';

import { dispatch } from '../store';
import { projectDeleteKanbanTask } from '../store/actions/projectActions/kanbanActions';
import { uiSetOpenEditKanbanTaskDialog } from '../store/actions/uiTempActions';

window.api.on('deleteKanbanTask', (e: IpcRendererEvent, taskId: string): void => {
  dispatch(projectDeleteKanbanTask(taskId));
  dispatch(uiSetOpenEditKanbanTaskDialog(false));
});
