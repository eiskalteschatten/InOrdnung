import { combineReducers } from '@reduxjs/toolkit';

import { reducer as project } from './project';
import { reducer as info } from './info';

export const reducer = combineReducers({
  project,
  info,
});
