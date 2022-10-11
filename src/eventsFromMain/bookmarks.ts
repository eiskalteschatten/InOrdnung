import { createNewBookmark } from '../shared/lib/bookmarks';

window.api.on('createNewBookmark', () => {
  // TODO: navigate to boomarks page
  createNewBookmark();
});
