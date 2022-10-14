import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoomType } from '../../../__generated_types__/types';

export interface RoomStateProps {
  enteredRoomId: RoomType['_id'] | null;
}

const initialState: RoomStateProps = {
  enteredRoomId: null,
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoomId: (state, action: PayloadAction<RoomType['_id'] | null>) => {
      state.enteredRoomId = action.payload;
    },
  },
});

export const { setRoomId } = roomSlice.actions;

export default roomSlice.reducer;
