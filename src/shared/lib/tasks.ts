import { v4 as uuidv4 } from 'uuid';

import { dispatch } from '../../store';
import { addTaskList } from '../../store/entities/project/tasks';

import { TaskList, TaskViewType } from '../interfaces/tasks';

export const createTaskList = () => {
  const newTaskList: TaskList = {
    id: uuidv4(),
    name: '',
    view: TaskViewType.LIST,
  };

  dispatch(addTaskList(newTaskList));
};
