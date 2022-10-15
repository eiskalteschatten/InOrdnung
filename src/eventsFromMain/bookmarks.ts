import { IpcRendererEvent } from 'electron';
import { createNewBookmark, deleteBookmark } from '../shared/lib/bookmarks';

window.api.on('createNewBookmark', () => createNewBookmark());
window.api.on('editBookmark', () => createNewBookmark());
window.api.on('deleteBookmark', (e: IpcRendererEvent, id: string) => deleteBookmark(id));
