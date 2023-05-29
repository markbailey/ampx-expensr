import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { reducer as authReducer } from './auth';
import { REDUCER_KEY as DB_KEY, databaseApi } from '../services/firebase/database';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [DB_KEY]: databaseApi.reducer,
  },
  middleware: (gDM) => gDM({ serializableCheck: false }).concat(databaseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
