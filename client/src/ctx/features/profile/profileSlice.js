import { createSlice } from '@reduxjs/toolkit';

const isEmpty = (data) => {
    return (
        Object.keys(data).length === 0
    )
};

const initialState = {
  errors: {}
}

const errorSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
  }
})

export default errorSlice.reducer