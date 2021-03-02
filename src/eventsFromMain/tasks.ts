import { IpcRendererEvent } from 'electron';

import { Task } from '../interfaces/tasks';

import { dispatch } from '../store';
import { projectDeleteTask } from '../store/actions/projectActions/taskActions';

window.api.on('deleteTask', (e: IpcRendererEvent, task: Task): void => {
  if (task.id) {
    dispatch(projectDeleteTask(task.id));
  }
});
