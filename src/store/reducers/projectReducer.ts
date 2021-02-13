import { Reducer } from 'redux';

import { Project } from '../../interfaces/project';
import { ProjectActions } from '../actions/projectActions';

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
} from '../constants';

export const initialState: Project = {
  projectInfo: {},
  tasks: [],
  quickNotes: [],
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


    // Tasks
    case PROJECT_SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case PROJECT_ADD_TASK:
      let { tasks } = state;

      if (Array.isArray(state.tasks)) {
        tasks.push(action.payload);
      }
      else {
        tasks = [action.payload];
      }

      return { ...state, tasks };


    // Quick Notes
    case PROJECT_SET_QUICK_NOTES:
      return {
        ...state,
        quickNotes: action.payload,
      };
    case PROJECT_ADD_QUICK_NOTE:
      let { quickNotes } = state;

      if (Array.isArray(state.quickNotes)) {
        quickNotes.push(action.payload);
      }
      else {
        quickNotes = [action.payload];
      }

      return { ...state, quickNotes };


    // Bookmarks
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
