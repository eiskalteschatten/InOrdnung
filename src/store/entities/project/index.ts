import { combineReducers } from '@reduxjs/toolkit';

import { reducer as info } from './info';
import { reducer as bookmarks } from './bookmarks';

export const reducer = combineReducers({
  info,
  bookmarks,
});
