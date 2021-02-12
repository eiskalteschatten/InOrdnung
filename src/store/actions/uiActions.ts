import { Action } from 'redux';

import { SortingOptions } from '../../interfaces/ui';

import {
  UI_OPEN_EDIT_TASK_DIALOG,
  UI_OPEN_EDIT_BOOKMARK_DIALOG,
  UI_SET_TASKS_SORTING_OPTIONS,
  UI_SET_BOOKMARKS_SORTING_OPTIONS,
} from '../constants';


export interface UiOpenEditTaskDialog extends Action<typeof UI_OPEN_EDIT_TASK_DIALOG> {
  payload: boolean;
}

export interface UiOpenEditBookmarkDialog extends Action<typeof UI_OPEN_EDIT_BOOKMARK_DIALOG> {
  payload: boolean;
}

export interface UiSetTasksSortingOptions extends Action<typeof UI_SET_TASKS_SORTING_OPTIONS> {
  payload: SortingOptions;
}

export interface UiSetBookmarksSortingOptions extends Action<typeof UI_SET_BOOKMARKS_SORTING_OPTIONS> {
  payload: SortingOptions;
}


export type UiActions =
  UiOpenEditTaskDialog |
  UiOpenEditBookmarkDialog |
  UiSetTasksSortingOptions |
  UiSetBookmarksSortingOptions;

export const uiSetOpenEditTaskDialog = (payload: boolean): UiOpenEditTaskDialog => ({ type: UI_OPEN_EDIT_TASK_DIALOG, payload });
export const uiSetOpenEditBookmarkDialog = (payload: boolean): UiOpenEditBookmarkDialog => ({ type: UI_OPEN_EDIT_BOOKMARK_DIALOG, payload });
export const uiSetTasksSortingOptions = (payload: SortingOptions): UiSetTasksSortingOptions => ({ type: UI_SET_TASKS_SORTING_OPTIONS, payload });
export const uiSetBookmarksSortingOptions = (payload: SortingOptions): UiSetBookmarksSortingOptions => ({ type: UI_SET_BOOKMARKS_SORTING_OPTIONS, payload });
