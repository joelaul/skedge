import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/auth/authSlice';
import profileReducer from './features/profile/profileSlice';
import errorReducer from './features/error/errorSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    error: errorReducer
  },
});

export default store