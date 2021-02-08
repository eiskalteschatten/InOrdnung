import { Action } from 'redux';

import { Project } from '../../interfaces/project';
import { ProjectInfo } from '../../interfaces/projectInfo';
import { Bookmark } from '../../interfaces/bookmarks';
import { ReduxThunk } from '../interfaces';

import {
  PROJECT_SET_PROJECT,
  PROJECT_SET_PROJECT_INFO,
  PROJECT_DELETE_IMAGE,
  PROJECT_SET_BOOKMARKS,
  PROJECT_ADD_BOOKMARK,
} from '../constants';

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


// Project Info
export const projectSetProject = (payload: Project): ProjectSetProject => ({ type: PROJECT_SET_PROJECT, payload });
export const projectSetProjectInfo = (payload: ProjectInfo): ProjectSetProjectInfo => ({ type: PROJECT_SET_PROJECT_INFO, payload });
export const projectDeleteImage = (): ProjectDeleteImage => ({ type: PROJECT_DELETE_IMAGE });


// Bookmarks
export const projectSetBookmarks = (payload: Bookmark[]): ProjectSetBookmarks => ({ type: PROJECT_SET_BOOKMARKS, payload });
export const projectAddBookmark = (payload: Bookmark): ProjectAddBookmark => ({ type: PROJECT_ADD_BOOKMARK, payload });

export const projectEditBookmark = (bookmark: Bookmark): ReduxThunk<void, typeof PROJECT_SET_BOOKMARKS> =>
  (dispatch: any, getState: Function): ProjectSetBookmarks => {
    const state = getState();
    const { bookmarks } = state.project;

    for (const index in bookmarks) {
      if (bookmarks[index].id === bookmark.id) {
        bookmarks[index] = bookmark;
        break;
      }
    }

    return dispatch({ type: PROJECT_SET_BOOKMARKS, payload: bookmarks });
  };

export const projectDeleteBookmark = (id: string): ReduxThunk<void, typeof PROJECT_SET_BOOKMARKS> =>
  (dispatch: any, getState: Function): ProjectSetBookmarks => {
    const state = getState();
    const { bookmarks } = state.project;

    for (const index in bookmarks) {
      if (bookmarks[index].id === id) {
        delete bookmarks[index];
        break;
      }
    }

    return dispatch({ type: PROJECT_SET_BOOKMARKS, payload: bookmarks });
  };
