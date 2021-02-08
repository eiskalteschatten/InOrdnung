import { Reducer } from 'redux';

import { AppActions } from '../actions/appActions';

import {
  APP_SET_PLATFORM,
} from '../constants';

export interface AppState {
  platform: string;
}

export const initialState: AppState = {
  platform: '',
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
    default:
      return state;
  }
};

export default appReducer;
