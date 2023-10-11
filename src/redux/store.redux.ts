import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authSlice from './slices/auth/auth.slice';

const reducer = combineReducers({
  auth: authSlice,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    version: 1,
  },
  reducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistedStore = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
