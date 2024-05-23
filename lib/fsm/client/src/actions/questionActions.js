import axios from "axios";

import {
  GET_QUESTIONS,
  GET_QUESTION,
  GET_USER_QUESTIONS,
  GET_ERRORS,
  CLEAR_ERRORS,
} from "./types";

export const getQuestions = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/questions");
    dispatch({
      type: GET_QUESTIONS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getQuestion = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/questions/${id}`);
    dispatch({
      type: GET_QUESTION,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const createQuestion =
  (newQuestionData, history) => async (dispatch) => {
    try {
      await axios.post("/api/questions", newQuestionData);
      history.push("/");
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };

export const getUserQuestions = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/questions/user/${userId}`);
    dispatch({
      type: GET_USER_QUESTIONS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteQuestion = (id, history) => async (dispatch) => {
  try {
    await axios.delete(`/api/questions/${id}`);
    history.push("/");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const likeQuestion = (id) => async (dispatch) => {
  try {
    await axios.post(`/api/questions/like/${id}`);
    dispatch(getQuestion(id));
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const addAnswer = (questionId, newAnswer) => async (dispatch) => {
  try {
    const res = await axios.post(
      `/api/questions/answer/${questionId}`,
      newAnswer
    );
    dispatch({
      type: GET_QUESTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const deleteAnswer = (questionId, answerId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/questions/answer/delete/${questionId}/${answerId}`
    );
    dispatch({
      type: GET_QUESTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
