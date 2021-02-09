import { remove } from 'lodash';

import { ProjectAddTask, ProjectSetTasks } from '.';
import { ReduxThunk } from '../../interfaces';
import { Task } from '../../../interfaces/tasks';

import {
  PROJECT_SET_TASKS,
  PROJECT_ADD_TASK,
} from '../../constants';

export const projectSetTasks = (payload: Task[]): ProjectSetTasks => ({ type: PROJECT_SET_TASKS, payload });
export const projectAddTask = (payload: Task): ProjectAddTask => ({ type: PROJECT_ADD_TASK, payload });

export const projectEditTask = (task: Task): ReduxThunk<void, typeof PROJECT_SET_TASKS> =>
  (dispatch: any, getState: Function): ProjectSetTasks => {
    const state = getState();
    const { tasks } = state.project;

    for (const index in tasks) {
      if (tasks[index].id === task.id) {
        tasks[index] = task;
        break;
      }
    }

    return dispatch({ type: PROJECT_SET_TASKS, payload: tasks });
  };

export const projectDeleteTask = (id: string): ReduxThunk<void, typeof PROJECT_SET_TASKS> =>
  (dispatch: any, getState: Function): ProjectSetTasks => {
    const state = getState();
    const { tasks } = state.project;
    remove(tasks, (task: Task): boolean => task.id === id);
    return dispatch({ type: PROJECT_SET_TASKS, payload: tasks });
  };
