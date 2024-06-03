import { createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

import { serverUrl } from "../../../constants";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    let res = null;
    try {
      res = await fetch(`${serverUrl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        console.error(`Request declined. HTTP status code: ${res.status}`);
        return rejectWithValue(data);
      } else {
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    let res = null;
    try {
      res = await fetch(`${serverUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        console.error(`Request declined. HTTP status code: ${res.status}`);
        return rejectWithValue(data);
      } else {
        const { token } = data;
        localStorage.setItem("jwt", token);
        const decoded = jwtDecode(token);
        return decoded;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
