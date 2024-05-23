import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/auth/authSlice';
import errorReducer from './features/error/errorSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer
  },
})