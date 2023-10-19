import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { iUpdateUserResponse } from '@/screens/UserSettings/types/responses.types';

import { AuthResponseType, AuthStateType } from './auth.types';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    access_token: null,
    user_data: null,
  } as AuthStateType,
  reducers: {
    loginStart: (state) => {
      state.access_token = null;
      state.user_data = null;
    },
    login: (state, action: PayloadAction<AuthResponseType>) => {
      state.user_data = action.payload.user_data;
      state.access_token = action.payload.access_token;
    },
    logOut: (state) => {
      state.access_token = null;
      state.user_data = null;
    },
    updateUser: (state, action: PayloadAction<iUpdateUserResponse>) => {
      if (state.user_data) {
        state.user_data.user_photo_url = action.payload.user_photo_url;
        state.user_data.updated_at = String(action.payload.updated_at);
        state.user_data.funds = action.payload.funds;
        state.user_data.user_name = action.payload.user_name;
        state.user_data.user_email = action.payload.user_email;
      }
    },
    loginError: (state) => {
      state.user_data = null;
      state.access_token = null;
    },
  },
});

export default authSlice.reducer;
export const { logOut, login, loginStart, updateUser, loginError } =
  authSlice.actions;
