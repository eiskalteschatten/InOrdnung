import { v4 as uuidv4 } from 'uuid';
import { t } from 'i18next';

import { dispatch } from '../../store';
import { addBookmark, deleteBookmark as deleteBookmarkFromStore } from '../../store/entities/project/bookmarks';

import { Bookmark } from '../../shared/interfaces/bookmarks';

export const createNewBookmark = () => {
  const newBookmark: Bookmark = {
    id: uuidv4(),
    name: '',
    url: '',
  };

  dispatch(addBookmark(newBookmark));
  editBookmark(newBookmark.id);
};

export const editBookmark = (id: string) => {
  const navigateEvent = new CustomEvent('navigateTo',{ detail: `/bookmarks/edit/${id}` });
  window.dispatchEvent(navigateEvent);
};

export const deleteBookmark = (id: string) => {
  const result = window.api.sendSync('openAlert', {
    message: t('bookmarks:confirmDeleteBookmark'),
    detail: t('common:areYouSureYouWantToContinue'),
    types: 'warning',
    buttons: [t('common:no'), t('common:yes')],
  });

  if (result === 1) {
    dispatch(deleteBookmarkFromStore(id));
    const navigateEvent = new CustomEvent('navigateTo',{ detail: '/bookmarks' });
    window.dispatchEvent(navigateEvent);
  }
};
