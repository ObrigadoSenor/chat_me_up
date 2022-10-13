import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TemplateStateProps {
  value: number;
}

const initialState: TemplateStateProps = {
  value: 5,
};

const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = templateSlice.actions;

export default templateSlice.reducer;
