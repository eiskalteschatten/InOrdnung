import { Reducer } from 'redux';

import { UiPreferences } from '../../interfaces/ui';
import { UiActions } from '../actions/uiActions';

import {
  UI_SET_PREFERENCES,
  UI_SET_SIDEBAR_WIDTH,
  UI_OPEN_EDIT_TASK_DIALOG,
  UI_OPEN_EDIT_QUICK_NOTE_DIALOG,
  UI_OPEN_EDIT_BOOKMARK_DIALOG,
  UI_SET_TASKS_SORTING_OPTIONS,
  UI_SET_TASKS_SHOW_COMPLETED_TASKS,
  UI_SET_BOOKMARKS_SORTING_OPTIONS,
} from '../constants';

export type UiState = UiPreferences;

export const initialState: UiState = {
  openEditTaskDialog: false,
  openEditQuickNoteDialog: false,
  openEditBookmarkDialog: false,
  tasksSortingOptions: {},
  showCompletedTasks: false,
  bookmarksSortingOptions: {},
};

const uiReducer: Reducer<UiState, UiActions> = (
  state = initialState,
  action: UiActions
): any => {
  switch (action.type) {
    case UI_SET_PREFERENCES:
      return {
        ...state,
        ...action.payload,
      };
    case UI_SET_SIDEBAR_WIDTH:
      return {
        ...state,
        sidebarWidth: action.payload,
      };
    case UI_OPEN_EDIT_TASK_DIALOG:
      return {
        ...state,
        openEditTaskDialog: action.payload,
      };
    case UI_OPEN_EDIT_QUICK_NOTE_DIALOG:
      return {
        ...state,
        openEditQuickNoteDialog: action.payload,
      };
    case UI_OPEN_EDIT_BOOKMARK_DIALOG:
      return {
        ...state,
        openEditBookmarkDialog: action.payload,
      };
    case UI_SET_TASKS_SORTING_OPTIONS:
      return {
        ...state,
        tasksSortingOptions: action.payload,
      };
    case UI_SET_TASKS_SHOW_COMPLETED_TASKS:
      return {
        ...state,
        showCompletedTasks: action.payload,
      };
    case UI_SET_BOOKMARKS_SORTING_OPTIONS:
      return {
        ...state,
        bookmarksSortingOptions: action.payload,
      };
    default:
      return state;
  }
};

export default uiReducer;
