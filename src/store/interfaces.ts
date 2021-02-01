import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { State } from '.';

export type ReduxThunk<T, A> = ThunkAction<T, State, unknown, Action<A>>;
