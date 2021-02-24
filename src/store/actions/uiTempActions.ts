import { Action } from 'redux';

import { SortingOptions, UiPreferences } from '../../interfaces/ui';

import {
  UI_OPEN_EDIT_TASK_DIALOG,
  UI_OPEN_EDIT_QUICK_NOTE_DIALOG,
  UI_OPEN_EDIT_BOOKMARK_DIALOG,
  UI_OPEN_EDIT_KANBAN_TASK_DIALOG,
} from '../constants';


export interface UiOpenEditTaskDialog extends Action<typeof UI_OPEN_EDIT_TASK_DIALOG> {
  payload: boolean;
}

export interface UiOpenEditQuickNoteDialog extends Action<typeof UI_OPEN_EDIT_QUICK_NOTE_DIALOG> {
  payload: boolean;
}

export interface UiOpenEditBookmarkDialog extends Action<typeof UI_OPEN_EDIT_BOOKMARK_DIALOG> {
  payload: boolean;
}

export interface UiOpenEditKanbanTaskDialog extends Action<typeof UI_OPEN_EDIT_KANBAN_TASK_DIALOG> {
  payload: boolean;
}

export type UiActions =
  UiOpenEditTaskDialog |
  UiOpenEditQuickNoteDialog |
  UiOpenEditBookmarkDialog |
  UiOpenEditKanbanTaskDialog;

export const uiSetOpenEditTaskDialog = (payload: boolean): UiOpenEditTaskDialog => ({ type: UI_OPEN_EDIT_TASK_DIALOG, payload });
export const uiSetOpenEditQuickNoteDialog = (payload: boolean): UiOpenEditQuickNoteDialog => ({ type: UI_OPEN_EDIT_QUICK_NOTE_DIALOG, payload });
export const uiSetOpenEditBookmarkDialog = (payload: boolean): UiOpenEditBookmarkDialog => ({ type: UI_OPEN_EDIT_BOOKMARK_DIALOG, payload });
export const uiSetOpenEditKanbanTaskDialog = (payload: boolean): UiOpenEditKanbanTaskDialog => ({ type: UI_OPEN_EDIT_KANBAN_TASK_DIALOG, payload });
