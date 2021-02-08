import { remove } from 'lodash';

import { ProjectAddBookmark, ProjectSetBookmarks } from '.';
import { ReduxThunk } from '../../interfaces';
import { Bookmark } from '../../../interfaces/bookmarks';

import {
  PROJECT_SET_BOOKMARKS,
  PROJECT_ADD_BOOKMARK,
} from '../../constants';

export const projectSetBookmarks = (payload: Bookmark[]): ProjectSetBookmarks => ({ type: PROJECT_SET_BOOKMARKS, payload });
export const projectAddBookmark = (payload: Bookmark): ProjectAddBookmark => ({ type: PROJECT_ADD_BOOKMARK, payload });

export const projectEditBookmark = (bookmark: Bookmark): ReduxThunk<void, typeof PROJECT_SET_BOOKMARKS> =>
  (dispatch: any, getState: Function): ProjectSetBookmarks => {
    const state = getState();
    const { bookmarks } = state.project;

    for (const index in bookmarks) {
      if (bookmarks[index].id === bookmark.id) {
        bookmarks[index] = bookmark;
        break;
      }
    }

    return dispatch({ type: PROJECT_SET_BOOKMARKS, payload: bookmarks });
  };

export const projectDeleteBookmark = (id: string): ReduxThunk<void, typeof PROJECT_SET_BOOKMARKS> =>
  (dispatch: any, getState: Function): ProjectSetBookmarks => {
    const state = getState();
    const { bookmarks } = state.project;
    remove(bookmarks, (bookmark: Bookmark): boolean => bookmark.id === id);
    return dispatch({ type: PROJECT_SET_BOOKMARKS, payload: bookmarks });
  };
