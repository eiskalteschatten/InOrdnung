import { remove } from 'lodash';

import { ProjectAddKanbanTask, ProjectSetKanbanTasks } from '.';
import { ReduxThunk } from '../../interfaces';
import { KanbanTask } from '../../../interfaces/kanban';

import {
  PROJECT_KANBAN_TASKS_SET,
  PROJECT_KANBAN_TASKS_ADD,
} from '../../constants';

export const projectSetKanbanTasks = (payload: KanbanTask[]): ProjectSetKanbanTasks => ({ type: PROJECT_KANBAN_TASKS_SET, payload });
export const projectAddKanbanTask = (payload: KanbanTask): ProjectAddKanbanTask => ({ type: PROJECT_KANBAN_TASKS_ADD, payload });

export const projectEditKanbanTask = (task: KanbanTask): ReduxThunk<void, typeof PROJECT_KANBAN_TASKS_SET> =>
  (dispatch: any, getState: Function): ProjectSetKanbanTasks => {
    const state = getState();
    const kanbanTasks = [...state.project?.kanban?.tasks ?? []];

    for (const index in kanbanTasks) {
      if (kanbanTasks[index].id === task.id) {
        kanbanTasks[index] = task;
        break;
      }
    }

    return dispatch({ type: PROJECT_KANBAN_TASKS_SET, payload: kanbanTasks });
  };

export const projectDeleteKanbanTask = (id: string): ReduxThunk<void, typeof PROJECT_KANBAN_TASKS_SET> =>
  (dispatch: any, getState: Function): ProjectSetKanbanTasks => {
    const state = getState();
    const { kanbanTasks } = state.project;
    remove(kanbanTasks, (task: KanbanTask): boolean => task.id === id);
    return dispatch({ type: PROJECT_KANBAN_TASKS_SET, payload: kanbanTasks });
  };
