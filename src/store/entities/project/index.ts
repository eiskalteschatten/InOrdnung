import { combineReducers } from '@reduxjs/toolkit';

import { reducer as meta } from './meta';
import { reducer as info } from './info';

export const reducer = combineReducers({
  meta,
  info,
});
