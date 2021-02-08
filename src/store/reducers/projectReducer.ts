import { Reducer } from 'redux';

import { Project } from '../../interfaces/project';
import { ProjectActions } from '../actions/projectActions';

import {
  PROJECT_SET_PROJECT,
  PROJECT_SET_PROJECT_INFO,
  PROJECT_DELETE_IMAGE,
  PROJECT_SET_BOOKMARKS,
  PROJECT_ADD_BOOKMARK,
} from '../constants';

export const initialState: Project = {
  projectInfo: {},
  bookmarks: [],
};

const projectReducer: Reducer<Project, ProjectActions> = (
  state = initialState,
  action: ProjectActions
): any => {
  switch (action.type) {
    case PROJECT_SET_PROJECT:
      return action.payload;
    case PROJECT_SET_PROJECT_INFO:
      return {
        ...state,
        projectInfo: action.payload,
      };
    case PROJECT_DELETE_IMAGE:
      delete state.projectInfo.image;
      return state;
    case PROJECT_SET_BOOKMARKS:
      return {
        ...state,
        bookmarks: action.payload,
      };
    case PROJECT_ADD_BOOKMARK:
      let { bookmarks } = state;

      if (Array.isArray(state.bookmarks)) {
        bookmarks.push(action.payload);
      }
      else {
        bookmarks = [action.payload];
      }

      return { ...state, bookmarks };
    default:
      return state;
  }
};

export default projectReducer;
