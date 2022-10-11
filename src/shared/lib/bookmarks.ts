import { v4 as uuidv4 } from 'uuid';

import { dispatch, getState } from '../../store';
import { bookmarksAdapter, setEditingBookmark } from '../../store/entities/project/bookmarks';

import { Bookmark } from '../../shared/interfaces/bookmarks';

export const createNewBookmark = () => {
  const state = getState();

  const newBookmark: Bookmark = {
    id: uuidv4(),
    name: '',
    url: '',
  };

  bookmarksAdapter.addOne(state.project.bookmarks.data, newBookmark);
  dispatch(setEditingBookmark(newBookmark));
};
