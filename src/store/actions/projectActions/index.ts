import { Action } from 'redux';

import { Project } from '../../../interfaces/project';
import { ProjectInfo } from '../../../interfaces/projectInfo';
import { Task } from '../../../interfaces/tasks';
import { QuickNote } from '../../../interfaces/quickNotes';
import { Bookmark } from '../../../interfaces/bookmarks';
import { KanbanTask } from '../../../interfaces/kanban';

import {
  PROJECT_SET_PROJECT,
  PROJECT_SET_PROJECT_INFO,
  PROJECT_DELETE_IMAGE,
  PROJECT_SET_TASKS,
  PROJECT_ADD_TASK,
  PROJECT_SET_QUICK_NOTES,
  PROJECT_ADD_QUICK_NOTE,
  PROJECT_SET_BOOKMARKS,
  PROJECT_ADD_BOOKMARK,
  PROJECT_KANBAN_TASKS_SET,
  PROJECT_KANBAN_TASKS_ADD,
} from '../../constants';

// Project
export interface ProjectSetProject extends Action<typeof PROJECT_SET_PROJECT> {
  payload: Project;
}


// Project Info
export interface ProjectSetProjectInfo extends Action<typeof PROJECT_SET_PROJECT_INFO> {
  payload: ProjectInfo;
}

export type ProjectDeleteImage = Action<typeof PROJECT_DELETE_IMAGE>;


// Tasks
export interface ProjectSetTasks extends Action<typeof PROJECT_SET_TASKS> {
  payload: Task[];
}

export interface ProjectAddTask extends Action<typeof PROJECT_ADD_TASK> {
  payload: Task;
}


// Quick Notes
export interface ProjectSetQuickNotes extends Action<typeof PROJECT_SET_QUICK_NOTES> {
  payload: QuickNote[];
}

export interface ProjectAddQuickNote extends Action<typeof PROJECT_ADD_QUICK_NOTE> {
  payload: QuickNote;
}


// Bookmarks
export interface ProjectSetBookmarks extends Action<typeof PROJECT_SET_BOOKMARKS> {
  payload: Bookmark[];
}

export interface ProjectAddBookmark extends Action<typeof PROJECT_ADD_BOOKMARK> {
  payload: Bookmark;
}


// Kanban
export interface ProjectSetKanbanTasks extends Action<typeof PROJECT_KANBAN_TASKS_SET> {
  payload: KanbanTask[];
}

export interface ProjectAddKanbanTask extends Action<typeof PROJECT_KANBAN_TASKS_ADD> {
  payload: KanbanTask;
}


export type ProjectActions =
  ProjectSetProject |
  ProjectSetProjectInfo |
  ProjectDeleteImage |
  ProjectSetTasks |
  ProjectAddTask |
  ProjectSetQuickNotes |
  ProjectAddQuickNote |
  ProjectSetBookmarks |
  ProjectAddBookmark |
  ProjectSetKanbanTasks |
  ProjectAddKanbanTask;


export const projectSetProject = (payload: Project): ProjectSetProject => ({ type: PROJECT_SET_PROJECT, payload });
