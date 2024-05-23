import { createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from "jwt-decode";

import { serverUrl } from '../../../constants';

export const registerUser = () => {

};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    
    let res = null;  
    try {
      res = await fetch(`${serverUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!res.ok) {
        // setErrors([...Object.values(data)]);
        rejectWithValue(`Server error. HTTP status code: ${res.status}`);        
      } else {
        // setErrors([]);
        const { token } = data;
        localStorage.setItem("jwt", token);
        const decoded = jwtDecode(token);

        return decoded;
      }
    } catch (error) {
      rejectWithValue(error);
    }
});

export const setCurrentUser = () => {

}

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwt");
  // dispatch(SetCurrentUser({}));
};