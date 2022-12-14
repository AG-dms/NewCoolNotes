import { AuthInitialState } from './types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AuthInitialState = {
  test: true,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},

  // extraReducers: builder => {},
});

export const {} = authSlice.actions;

export default authSlice.reducer;
