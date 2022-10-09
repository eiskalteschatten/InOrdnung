import { combineReducers } from '@reduxjs/toolkit';

import { reducer as status } from './status';
import { reducer as info } from './info';

export const reducer = combineReducers({
  status,
  info,
});
