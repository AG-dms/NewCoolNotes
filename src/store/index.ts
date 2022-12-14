import { AuthInitialState } from './slices/authSlice/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createMigrate, persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import authSlice from './slices/authSlice/authSlice';

// for persistor
const authConfig = {
  key: 'auth',
  version: -1,
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  debug: false,
  migrate: createMigrate({}, { debug: false }),
};

const rootReducer = combineReducers({
  // example of slice
  auth: persistReducer<AuthInitialState>(authConfig, authSlice),
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  // base middleware
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
