import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConversationType } from '../../../__generated_types__/types';

export interface ConversationStateProps {
  enteredConversationId: ConversationType['_id'] | null;
}

const initialState: ConversationStateProps = {
  enteredConversationId: null,
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConversationId: (state, action: PayloadAction<ConversationType['_id'] | null>) => {
      state.enteredConversationId = action.payload;
    },
  },
});

export const { setConversationId } = conversationSlice.actions;

export default conversationSlice.reducer;
