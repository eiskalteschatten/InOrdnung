import { IpcRendererEvent } from 'electron';
import { createNewBookmark, deleteBookmark, editBookmark } from '../shared/lib/bookmarks';

window.api.on('createNewBookmark', () => createNewBookmark());
window.api.on('editBookmark', (e: IpcRendererEvent, id: string) => editBookmark(id));
window.api.on('deleteBookmark', (e: IpcRendererEvent, id: string) => deleteBookmark(id));
