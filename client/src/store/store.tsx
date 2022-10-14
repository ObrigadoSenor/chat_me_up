import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import roomSliceReducer from './slices/room';

export const store = configureStore({
  reducer: {
    room: roomSliceReducer,
  },
});

export type RootStateProps = ReturnType<typeof store.getState>;
type AppDispatchProps = typeof store.dispatch;

export const useAppDispatch: () => AppDispatchProps = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStateProps> = useSelector;
