import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionCleanAuthStore } from './slices/authSlice/authSlice';

export const actionClearStore = createAsyncThunk<void>(
  'global, clearStore',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(actionCleanAuthStore);
    } catch (error) {
      // do nothing
    }
  },
);
