import { IpcRendererEvent } from 'electron';

import { createBookmark, deleteBookmark, editBookmark } from '../shared/lib/bookmarks';

window.api.on('createBookmark', () => createBookmark());
window.api.on('editBookmark', (e: IpcRendererEvent, id: string) => editBookmark(id));
window.api.on('deleteBookmark', (e: IpcRendererEvent, id: string) => deleteBookmark(id));
