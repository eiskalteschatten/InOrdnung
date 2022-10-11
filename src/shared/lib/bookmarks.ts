import { v4 as uuidv4 } from 'uuid';

import { dispatch } from '../../store';
import { setEditingBookmark } from '../../store/entities/project/bookmarks';

import { Bookmark } from '../../shared/interfaces/bookmarks';

export const createNewBookmark = () => {
  const newBookmark: Bookmark = {
    id: uuidv4(),
    name: '',
    url: '',
  };

  dispatch(setEditingBookmark(newBookmark));
};
