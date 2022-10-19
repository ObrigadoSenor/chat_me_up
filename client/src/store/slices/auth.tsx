import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConversationType, UserType } from '../../../__generated_types__/types';

export interface AuthStateProps {
  details: Pick<UserType, 'email' | 'token' | 'name' | '_id'> | null;
  loggedIn: boolean;
}

const initialState: AuthStateProps = {
  details: null,
  loggedIn: false,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthStateProps['details']>) => {
      state.details = action.payload;
      state.loggedIn = action.payload !== null;
    },
    signOut: (state) => {
      state.details = null;
      state.loggedIn = false;
    },
  },
});

export const { setUser, signOut } = authSlice.actions;

export default authSlice.reducer;
