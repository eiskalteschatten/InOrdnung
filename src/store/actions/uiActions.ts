import { Action } from 'redux';

import { BookmarkSortingOptions } from '../../interfaces/bookmarks';

import {
  UI_OPEN_EDIT_TASK_DIALOG,
  UI_OPEN_EDIT_BOOKMARK_DIALOG,
  UI_SET_BOOKMARKS_SORTING_OPTIONS,
} from '../constants';


export interface UiOpenEditTaskDialog extends Action<typeof UI_OPEN_EDIT_TASK_DIALOG> {
  payload: boolean;
}

export interface UiOpenEditBookmarkDialog extends Action<typeof UI_OPEN_EDIT_BOOKMARK_DIALOG> {
  payload: boolean;
}

export interface UiSetBookmarksSortingOptions extends Action<typeof UI_SET_BOOKMARKS_SORTING_OPTIONS> {
  payload: BookmarkSortingOptions;
}


export type UiActions =
  UiOpenEditTaskDialog |
  UiOpenEditBookmarkDialog |
  UiSetBookmarksSortingOptions;

export const uiSetOpenEditTaskDialog = (payload: boolean): UiOpenEditTaskDialog => ({ type: UI_OPEN_EDIT_TASK_DIALOG, payload });
export const uiSetOpenEditBookmarkDialog = (payload: boolean): UiOpenEditBookmarkDialog => ({ type: UI_OPEN_EDIT_BOOKMARK_DIALOG, payload });
export const uiSetBookmarksSortingOptions = (payload: BookmarkSortingOptions): UiSetBookmarksSortingOptions => ({ type: UI_SET_BOOKMARKS_SORTING_OPTIONS, payload });
