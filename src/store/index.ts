import { AnyAction, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';

import app from './reducers/appReducer';
import projectInfo from './reducers/projectInfoReducer';
import file from './reducers/fileReducer';

const devExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers = devExtension && process.env.NODE_ENV === 'development' ? devExtension : compose;

const reducer = combineReducers({
  app,
  projectInfo,
  file,
});

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export type State = ReturnType<typeof reducer>;

// Shortcuts
export const dispatch: ThunkDispatch<any, any, AnyAction> = store.dispatch.bind(store);
export const getState = store.getState.bind(store);

export default store;
