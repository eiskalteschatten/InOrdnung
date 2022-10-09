import { combineReducers } from '@reduxjs/toolkit';

import { reducer as info } from './info';

export const reducer = combineReducers({
  info,
});
