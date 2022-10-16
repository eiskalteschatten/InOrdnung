import { v4 as uuidv4 } from 'uuid';
import { t } from 'i18next';

import { dispatch } from '../../store';
import { addTaskList, deleteTaskList as deleteTaskListFromStore } from '../../store/entities/project/tasks';

import { TaskList, TaskViewType } from '../interfaces/tasks';

export const createTaskList = () => {
  const newTaskList: TaskList = {
    id: uuidv4(),
    name: '',
    view: TaskViewType.LIST,
  };

  dispatch(addTaskList(newTaskList));
};

export const renameTaskList = (id: string) => {

};

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

