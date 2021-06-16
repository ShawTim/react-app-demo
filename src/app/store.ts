import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import errorReducer from '@features/error/slice';
import githubReducer from '@features/github/slice';

export const history = createBrowserHistory();

export const rootReducer = combineReducers({
  router: connectRouter(history),
  error: errorReducer,
  github: githubReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware(history)),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
