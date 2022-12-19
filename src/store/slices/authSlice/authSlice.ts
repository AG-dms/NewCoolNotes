import { AuthInitialState, User } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthInitialState = {
  user: null,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    actionSetUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    actionCleanAuthStore: state => {
      return initialState;
    },
  },

  // extraReducers: builder => {},
});

export const { actionSetUser, actionCleanAuthStore } = authSlice.actions;

export default authSlice.reducer;
