import { UserType } from '@chat_me_up/shared/generated/serverTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteItemAsync, setItemAsync } from 'expo-secure-store';

export interface AuthStateProps {
  user: Pick<UserType, 'email' | 'name' | 'token' | '_id'> | null;
  signedIn: boolean;
  loading: boolean;
  userToken: string | null;
}

const initialState: AuthStateProps = {
  user: null,
  signedIn: false,
  loading: true,
  userToken: null,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthStateProps['user']>) => {
      state.user = action.payload;
      state.signedIn = action.payload !== null;
      state.loading = false;
      setItemAsync('userToken', action?.payload?.token || '');
    },
    setUserToken: (state, action: PayloadAction<AuthStateProps['userToken']>) => {
      state.userToken = action.payload;
      setItemAsync('userToken', action?.payload || '');
    },
    signOut: (state) => {
      state.user = null;
      state.signedIn = false;
      state.loading = false;
      deleteItemAsync('userToken');
    },
    setLoading: (state, action: PayloadAction<AuthStateProps['loading']>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, signOut, setLoading, setUserToken } = authSlice.actions;

export default authSlice.reducer;
