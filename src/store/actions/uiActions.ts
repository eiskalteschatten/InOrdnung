import { Action } from 'redux';

import {
  UI_OPEN_NEW_BOOKMARK_DIALOG,
} from '../constants';


export interface UiOpenNewBookMarkDialog extends Action<typeof UI_OPEN_NEW_BOOKMARK_DIALOG> {
  payload: boolean;
}

export type UiActions =
UiOpenNewBookMarkDialog;

export const uiSetOpenNewBookmarkDialog = (payload: boolean): UiOpenNewBookMarkDialog => ({ type: UI_OPEN_NEW_BOOKMARK_DIALOG, payload });
