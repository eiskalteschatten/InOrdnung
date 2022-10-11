import { createNewBookmark } from '../shared/lib/bookmarks';

window.api.on('createNewBookmark', () => createNewBookmark());
