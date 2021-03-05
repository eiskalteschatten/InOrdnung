import { Action } from 'redux';

import { SortingOptions, UiPreferences, PrimaryColor } from '../../interfaces/ui';

import {
  UI_SET_PREFERENCES,
  UI_SET_SIDEBAR_WIDTH,
  UI_SET_TASKS_SORTING_OPTIONS,
  UI_SET_TASKS_SHOW_COMPLETED_TASKS,
  UI_SET_BOOKMARKS_SORTING_OPTIONS,
  UI_SET_PROJECT_COLOR,
} from '../constants';


export interface UiSetPreferences extends Action<typeof UI_SET_PREFERENCES> {
  payload: UiPreferences;
}

export interface UiSetSidebarWidth extends Action<typeof UI_SET_SIDEBAR_WIDTH> {
  payload: number | undefined;
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
export interface UiSetProjectColor extends Action<typeof UI_SET_PROJECT_COLOR> {
  payload: PrimaryColor;
}

export type UiActions =
  UiSetPreferences |
  UiSetSidebarWidth |
  UiSetTasksSortingOptions |
  UiSetShowCompletedTasks |
  UiSetBookmarksSortingOptions |
  UiSetProjectColor;

export const uiSetPreferences = (payload: UiPreferences): UiSetPreferences => ({ type: UI_SET_PREFERENCES, payload });
export const uiSetSidebarWidth = (payload?: number): UiSetSidebarWidth => ({ type: UI_SET_SIDEBAR_WIDTH, payload });
export const uiSetTasksSortingOptions = (payload: SortingOptions): UiSetTasksSortingOptions => ({ type: UI_SET_TASKS_SORTING_OPTIONS, payload });
export const uiSetShowCompletedTasks = (payload: boolean): UiSetShowCompletedTasks => ({ type: UI_SET_TASKS_SHOW_COMPLETED_TASKS, payload });
export const uiSetBookmarksSortingOptions = (payload: SortingOptions): UiSetBookmarksSortingOptions => ({ type: UI_SET_BOOKMARKS_SORTING_OPTIONS, payload });
export const uiSetProjectColor = (payload: PrimaryColor): UiSetProjectColor => ({ type: UI_SET_PROJECT_COLOR, payload });
