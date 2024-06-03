import axios from "axios";

import {
  GET_PROFILE,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
} from "./types";

export const getProfile = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/users/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE,
      payload: "no user",
    });
  }
};

export const createProfile =
  (profileData, history, userId, userName) => async (dispatch) => {
    try {
      await axios.post("/api/profile", profileData);
      history.push(`/users/${userId}/${userName}`);
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This cannot be undone.")) {
    try {
      await axios.delete("/api/profile");
      dispatch({
        type: SET_CURRENT_USER,
        payload: {},
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  }
};
