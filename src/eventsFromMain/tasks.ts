import { createTaskList } from '../shared/lib/tasks';

window.api.on('createTaskList', () => createTaskList());
