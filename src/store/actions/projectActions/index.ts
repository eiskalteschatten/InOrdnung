import { Action } from 'redux';

import { Project } from '../../../interfaces/project';
import { ProjectInfo } from '../../../interfaces/projectInfo';
import { Bookmark } from '../../../interfaces/bookmarks';

import {
  PROJECT_SET_PROJECT,
  PROJECT_SET_PROJECT_INFO,
  PROJECT_DELETE_IMAGE,
  PROJECT_SET_BOOKMARKS,
  PROJECT_ADD_BOOKMARK,
} from '../../constants';

export interface ProjectSetProject extends Action<typeof PROJECT_SET_PROJECT> {
  payload: Project;
}

export interface ProjectSetProjectInfo extends Action<typeof PROJECT_SET_PROJECT_INFO> {
  payload: ProjectInfo;
}

export type ProjectDeleteImage = Action<typeof PROJECT_DELETE_IMAGE>;

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
  ProjectSetBookmarks |
  ProjectAddBookmark;
