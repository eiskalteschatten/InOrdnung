import { IpcRendererEvent } from 'electron';

import { Bookmark } from '../interfaces/bookmarks';
import { isValidUrl } from '../lib/links';

import { dispatch } from '../store';
import { projectDeleteBookmark } from '../store/actions/projectActions/bookmarkActions';

const { ipcRenderer, shell } = window.require('electron');

ipcRenderer.on('openBookmark', (e: IpcRendererEvent, bookmark: Bookmark): void => {
  if (bookmark.url && isValidUrl(bookmark.url)) {
    shell.openExternal(bookmark.url);
  }
});

ipcRenderer.on('deleteBookmark', (e: IpcRendererEvent, bookmark: Bookmark): void => {
  if (bookmark.id) {
    dispatch(projectDeleteBookmark(bookmark.id));
  }
});
