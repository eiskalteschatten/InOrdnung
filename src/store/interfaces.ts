import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { State } from '.';

// See https://redux.js.org/recipes/usage-with-typescript#usage-with-redux-thunk
export type ReduxThunk<T, A> = ThunkAction<T, State, unknown, Action<A>>;
