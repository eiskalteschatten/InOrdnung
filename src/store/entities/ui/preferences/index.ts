import { combineReducers } from '@reduxjs/toolkit';

import { reducer as general } from './general';
import { reducer as bookmarks } from './bookmarks';
import { reducer as tasks } from './tasks';

export const reducer = combineReducers({
  general,
  bookmarks,
  tasks,
});
