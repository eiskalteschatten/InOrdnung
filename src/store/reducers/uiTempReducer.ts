import { Reducer } from 'redux';

import { UiActions } from '../actions/uiTempActions';

import {
  UI_OPEN_EDIT_TASK_DIALOG,
  UI_OPEN_EDIT_QUICK_NOTE_DIALOG,
  UI_OPEN_EDIT_BOOKMARK_DIALOG,
  UI_OPEN_EDIT_KANBAN_TASK_DIALOG,
} from '../constants';

export interface UiTempState {
  openEditTaskDialog: boolean;
  openEditQuickNoteDialog: boolean;
  openEditBookmarkDialog: boolean;
  openEditKanbanTaskDialog: boolean;
}

export const initialState: UiTempState = {
  openEditTaskDialog: false,
  openEditQuickNoteDialog: false,
  openEditBookmarkDialog: false,
  openEditKanbanTaskDialog: false,
};

const uiTempReducer: Reducer<UiTempState, UiActions> = (
  state = initialState,
  action: UiActions
): any => {
  switch (action.type) {
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
    case UI_OPEN_EDIT_KANBAN_TASK_DIALOG:
      return {
        ...state,
        openEditKanbanTaskDialog: action.payload,
      };
    default:
      return state;
  }
};

export default uiTempReducer;
