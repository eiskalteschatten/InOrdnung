import { v4 as uuidv4 } from 'uuid';
import { t } from 'i18next';

import { dispatch, getState } from '../../store';

import {
  addTask,
  addTaskList,
  deleteTaskList as deleteTaskListFromStore,
  setEditingId,
  setListEditingId,
  deleteTask as deleteTaskFromStore,
  setCurrentTaskNumber,
} from '../../store/entities/project/tasks';

import { Task, TaskList, TaskStatus, TaskListViewType } from '../interfaces/tasks';

export const createTaskList = () => {
  const newTaskList: TaskList = {
    id: uuidv4(),
    name: '',
    view: TaskListViewType.LIST,
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

export const generateNewTask = (taskListId?: string): Task => {
  const state = getState();
  const newTaskNumber = state.project.tasks.currentTaskNumber + 1;
  dispatch(setCurrentTaskNumber(newTaskNumber));

  return {
    id: uuidv4(),
    number: newTaskNumber,
    name: '',
    status: TaskStatus.TODO,
    taskListId,
  };
};

export const createTask = (taskListId?: string) => {
  const newTask = generateNewTask(taskListId);
  dispatch(addTask(newTask));
  dispatch(setEditingId(newTask.id));
};

export const editTask = (id: string) => {
  dispatch(setEditingId(id));
};

export const deleteTask = (id: string) => {
  const result = window.api.sendSync('openAlert', {
    message: t('tasks:confirmDeleteTask'),
    detail: t('common:areYouSureYouWantToContinue'),
    types: 'warning',
    buttons: [t('common:no'), t('common:yes')],
  });

  if (result === 1) {
    dispatch(deleteTaskFromStore(id));
    dispatch(setEditingId());
  }
};
