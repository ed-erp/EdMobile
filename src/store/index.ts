import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../screens/HomeScreen/store/homeSlice';
import authFlowReducer from './slices/authFlowSlice';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    authFlow: authFlowReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;