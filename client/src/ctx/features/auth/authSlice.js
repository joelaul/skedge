import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser } from './authActions';

const initialState = {
    user: null,
    error: {},
    loading: false,
    status: 'idle'
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload
    },
    logoutUser: (state) => {
      state.user = null,
      state.error = {},
      state.loading = false,
      state.status = 'idle',
      localStorage.removeItem('jwt');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = {};
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = {};
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setCurrentUser, logoutUser } = authSlice.actions

export default authSlice.reducer