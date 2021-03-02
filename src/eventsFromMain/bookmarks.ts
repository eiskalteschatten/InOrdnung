import { IpcRendererEvent } from 'electron';

import { Bookmark } from '../interfaces/bookmarks';
import { isValidUrl } from '../lib/links';

import { dispatch } from '../store';
import { projectDeleteBookmark } from '../store/actions/projectActions/bookmarkActions';

window.api.on('openBookmark', (e: IpcRendererEvent, bookmark: Bookmark): void => {
  if (bookmark.url && isValidUrl(bookmark.url)) {
    window.shell.openExternal(bookmark.url);
  }
});

window.api.on('deleteBookmark', (e: IpcRendererEvent, bookmark: Bookmark): void => {
  if (bookmark.id) {
    dispatch(projectDeleteBookmark(bookmark.id));
  }
});
