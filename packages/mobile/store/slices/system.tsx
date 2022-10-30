import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setItemAsync } from 'expo-secure-store';

export interface SystemStateProps {
  theme: 'dark' | 'light';
}

const initialState: SystemStateProps = {
  theme: 'dark',
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<SystemStateProps['theme']>) => {
      state.theme = action.payload;
      setItemAsync('theme', action?.payload || 'light');
    },
  },
});

export const { setTheme } = systemSlice.actions;

export default systemSlice.reducer;
