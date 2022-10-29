import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './slices/auth';
import systemSliceReducer from './slices/system';

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    system: systemSliceReducer,
  },
});

export type RootStateProps = ReturnType<typeof store.getState>;
type AppDispatchProps = typeof store.dispatch;

export const useAppDispatch: () => AppDispatchProps = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStateProps> = useSelector;
