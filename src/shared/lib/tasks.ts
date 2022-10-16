import { v4 as uuidv4 } from 'uuid';
import { t } from 'i18next';

import { dispatch } from '../../store';
import { addTask, addTaskList, deleteTaskList as deleteTaskListFromStore, setListEditingId } from '../../store/entities/project/tasks';

import { Task, TaskList, TaskStatus, TaskViewType } from '../interfaces/tasks';

export const createTaskList = () => {
  const newTaskList: TaskList = {
    id: uuidv4(),
    name: '',
    view: TaskViewType.LIST,
  };

  dispatch(addTaskList(newTaskList));
  renameTaskList(newTaskList.id);
};

export const renameTaskList = (id: string) => dispatch(setListEditingId(id));

export const deleteTaskList = (id: string) => {
  const result = window.api.sendSync('openAlert', {
    message: t('tasks:confirmDeleteTaskList'),
    detail: t('common:areYouSureYouWantToContinue'),
    types: 'warning',
    buttons: [t('common:no'), t('common:yes')],
  });

  if (result === 1) {
    dispatch(deleteTaskListFromStore(id));
  }
};

export const createTask = (taskListId?: string) => {
  const newTask: Task = {
    id: uuidv4(),
    name: '',
    status: TaskStatus.TODO,
    taskListId,
  };

  dispatch(addTask(newTask));
};
