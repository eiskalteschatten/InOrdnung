import { Reducer } from 'redux';

import { AppActions } from '../actions/appActions';

import {
  APP_SET_PLATFORM,
  APP_OPEN_NEW_BOOKMARK_DIALOG,
} from '../constants';

export interface AppState {
  platform: string;
  openNewBookmarkDialog: boolean;
}

export const initialState: AppState = {
  platform: '',
  openNewBookmarkDialog: false,
};

const appReducer: Reducer<AppState, AppActions> = (
  state = initialState,
  action: AppActions
): any => {
  switch (action.type) {
    case APP_SET_PLATFORM:
      return {
        ...state,
        platform: action.platform,
      };
    case APP_OPEN_NEW_BOOKMARK_DIALOG:
      return {
        ...state,
        openNewBookmarkDialog: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
