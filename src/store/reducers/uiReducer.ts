import { Reducer } from 'redux';

import { BookmarkSortingOptions } from '../../interfaces/bookmarks';
import { UiActions } from '../actions/uiActions';

import {
  UI_OPEN_NEW_BOOKMARK_DIALOG,
  UI_SET_BOOKMARKS_SORTING_OPTIONS,
} from '../constants';

export interface UiState {
  openNewBookmarkDialog: boolean;
  bookmarksSortingOptions: BookmarkSortingOptions;
}

export const initialState: UiState = {
  openNewBookmarkDialog: false,
  bookmarksSortingOptions: {},
};

const uiReducer: Reducer<UiState, UiActions> = (
  state = initialState,
  action: UiActions
): any => {
  switch (action.type) {
    case UI_OPEN_NEW_BOOKMARK_DIALOG:
      return {
        ...state,
        openNewBookmarkDialog: action.payload,
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
