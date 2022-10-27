import { combineReducers } from '@reduxjs/toolkit';

import { reducer as info } from './info';
import { reducer as bookmarks } from './bookmarks';
import { reducer as tasks } from './tasks';

export const reducer = combineReducers({
  info,
  bookmarks,
  tasks,
});
