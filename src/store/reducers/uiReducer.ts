import { Reducer } from 'redux';

import { SortingOptions } from '../../interfaces/ui';
import { UiActions } from '../actions/uiActions';

import {
  UI_OPEN_EDIT_TASK_DIALOG,
  UI_OPEN_EDIT_BOOKMARK_DIALOG,
  UI_SET_TASKS_SORTING_OPTIONS,
  UI_SET_BOOKMARKS_SORTING_OPTIONS,
} from '../constants';

export interface UiState {
  openEditTaskDialog: boolean;
  openEditBookmarkDialog: boolean;
  tasksSortingOptions: SortingOptions;
  bookmarksSortingOptions: SortingOptions;
}

export const initialState: UiState = {
  openEditTaskDialog: false,
  openEditBookmarkDialog: false,
  tasksSortingOptions: {},
  bookmarksSortingOptions: {},
};

const uiReducer: Reducer<UiState, UiActions> = (
  state = initialState,
  action: UiActions
): any => {
  switch (action.type) {
    case UI_OPEN_EDIT_TASK_DIALOG:
      return {
        ...state,
        openEditTaskDialog: action.payload,
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
