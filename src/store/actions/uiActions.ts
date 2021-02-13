import { Action } from 'redux';

import { SortingOptions, UiPreferences } from '../../interfaces/ui';

import {
  UI_SET_PREFERENCES,
  UI_OPEN_EDIT_TASK_DIALOG,
  UI_OPEN_EDIT_BOOKMARK_DIALOG,
  UI_SET_TASKS_SORTING_OPTIONS,
  UI_SET_TASKS_SHOW_COMPLETED_TASKS,
  UI_SET_BOOKMARKS_SORTING_OPTIONS,
} from '../constants';


export interface UiSetPreferences extends Action<typeof UI_SET_PREFERENCES> {
  payload: UiPreferences;
}

export interface UiOpenEditTaskDialog extends Action<typeof UI_OPEN_EDIT_TASK_DIALOG> {
  payload: boolean;
}

export interface UiOpenEditBookmarkDialog extends Action<typeof UI_OPEN_EDIT_BOOKMARK_DIALOG> {
  payload: boolean;
}

export interface UiSetTasksSortingOptions extends Action<typeof UI_SET_TASKS_SORTING_OPTIONS> {
  payload: SortingOptions;
}

export interface UiSetShowCompletedTasks extends Action<typeof UI_SET_TASKS_SHOW_COMPLETED_TASKS> {
  payload: boolean;
}

export interface UiSetBookmarksSortingOptions extends Action<typeof UI_SET_BOOKMARKS_SORTING_OPTIONS> {
  payload: SortingOptions;
}


export type UiActions =
  UiSetPreferences |
  UiOpenEditTaskDialog |
  UiOpenEditBookmarkDialog |
  UiSetTasksSortingOptions |
  UiSetShowCompletedTasks |
  UiSetBookmarksSortingOptions;

export const uiSetPreferences = (payload: UiPreferences): UiSetPreferences => ({ type: UI_SET_PREFERENCES, payload });
export const uiSetOpenEditTaskDialog = (payload: boolean): UiOpenEditTaskDialog => ({ type: UI_OPEN_EDIT_TASK_DIALOG, payload });
export const uiSetOpenEditBookmarkDialog = (payload: boolean): UiOpenEditBookmarkDialog => ({ type: UI_OPEN_EDIT_BOOKMARK_DIALOG, payload });
export const uiSetTasksSortingOptions = (payload: SortingOptions): UiSetTasksSortingOptions => ({ type: UI_SET_TASKS_SORTING_OPTIONS, payload });
export const uiSetShowCompletedTasks = (payload: boolean): UiSetShowCompletedTasks => ({ type: UI_SET_TASKS_SHOW_COMPLETED_TASKS, payload });
export const uiSetBookmarksSortingOptions = (payload: SortingOptions): UiSetBookmarksSortingOptions => ({ type: UI_SET_BOOKMARKS_SORTING_OPTIONS, payload });
