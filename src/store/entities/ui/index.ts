import { combineReducers } from '@reduxjs/toolkit';

import { reducer as preferences } from './preferences';
import { reducer as session } from './session';

export const reducer = combineReducers({
  preferences,
  session,
});
