import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthResponseType, AuthStateType } from './auth.types';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    access_token: null,
    user_data: null,
    isFetchingUser: false,
  } as AuthStateType,
  reducers: {
    loginStart: (state) => {
      state.isFetchingUser = true;
      state.access_token = null;
      state.user_data = null;
    },
    login: (state, action: PayloadAction<AuthResponseType>) => {
      state.isFetchingUser = false;
      state.user_data = action.payload.user_data;
      state.access_token = action.payload.access_token;
    },
    logOut: (state) => {
      state.isFetchingUser = false;
      state.access_token = null;
      state.user_data = null;
    },
    updateUserPhotoUrl: (state, action: PayloadAction<string>) => {
      if (state.user_data) {
        state.user_data.user_photo_url = action.payload;
      }
    },
    loginError: (state) => {
      state.user_data = null;
      state.isFetchingUser = false;
      state.access_token = null;
    },
  },
});

export default authSlice.reducer;
export const { logOut, login, loginStart, updateUserPhotoUrl, loginError } =
  authSlice.actions;
