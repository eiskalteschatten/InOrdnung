import { Reducer } from 'redux';

import { UiActions } from '../actions/uiActions';

import {
  UI_OPEN_NEW_BOOKMARK_DIALOG,
} from '../constants';

export interface UiState {
  platform: string;
  openNewBookmarkDialog: boolean;
}

export const initialState: UiState = {
  platform: '',
  openNewBookmarkDialog: false,
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
    default:
      return state;
  }
};

export default uiReducer;
