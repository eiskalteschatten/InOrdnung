import { Action } from 'redux';

import { Project } from '../../../interfaces/project';
import { ProjectInfo } from '../../../interfaces/projectInfo';
import { Task } from '../../../interfaces/tasks';
import { Bookmark } from '../../../interfaces/bookmarks';

import {
  PROJECT_SET_PROJECT,
  PROJECT_SET_PROJECT_INFO,
  PROJECT_DELETE_IMAGE,
  PROJECT_SET_TASKS,
  PROJECT_ADD_TASK,
  PROJECT_SET_BOOKMARKS,
  PROJECT_ADD_BOOKMARK,
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
  payload: Bookmark[];
}

export interface ProjectAddTask extends Action<typeof PROJECT_ADD_TASK> {
  payload: Task;
}


// Bookmarks
export interface ProjectSetBookmarks extends Action<typeof PROJECT_SET_BOOKMARKS> {
  payload: Bookmark[];
}

export interface ProjectAddBookmark extends Action<typeof PROJECT_ADD_BOOKMARK> {
  payload: Bookmark;
}

export type ProjectActions =
  ProjectSetProject |
  ProjectSetProjectInfo |
  ProjectDeleteImage |
  ProjectSetTasks |
  ProjectAddTask |
  ProjectSetBookmarks |
  ProjectAddBookmark;

export const projectSetProject = (payload: Project): ProjectSetProject => ({ type: PROJECT_SET_PROJECT, payload });
