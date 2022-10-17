import { IpcRendererEvent } from 'electron';

import { createTask, createTaskList, deleteTaskList, renameTaskList } from '../shared/lib/tasks';

window.api.on('createTaskList', () => createTaskList());
window.api.on('renameTaskList', (e: IpcRendererEvent, id: string) => renameTaskList(id));
window.api.on('deleteTaskList', (e: IpcRendererEvent, id: string) => deleteTaskList(id));

window.api.on('createTask', (e: IpcRendererEvent, taskListId?: string) => createTask(taskListId));