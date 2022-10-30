import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import conversationSliceReducer from './slices/conversation';
import authSliceReducer from './slices/auth';

export const store = configureStore({
  reducer: {
    conversation: conversationSliceReducer,
    auth: authSliceReducer,
  },
});

export type RootStateProps = ReturnType<typeof store.getState>;
type AppDispatchProps = typeof store.dispatch;

export const useAppDispatch: () => AppDispatchProps = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStateProps> = useSelector;
