import { Action } from 'redux';

import {
  APP_SET_PLATFORM,
  APP_OPEN_NEW_BOOKMARK_DIALOG,
} from '../constants';

export interface AppSetPlatform extends Action<typeof APP_SET_PLATFORM> {
  platform: string;
}


export interface AppOpenNewBookMarkDialog extends Action<typeof APP_OPEN_NEW_BOOKMARK_DIALOG> {
  payload: boolean;
}

export type AppActions =
  AppSetPlatform |
  AppOpenNewBookMarkDialog;

export const appSetPlatform = (platform: string): AppSetPlatform => ({ type: APP_SET_PLATFORM, platform });
export const appSetOpenNewBookmarkDialog = (payload: boolean): AppOpenNewBookMarkDialog => ({ type: APP_OPEN_NEW_BOOKMARK_DIALOG, payload });
