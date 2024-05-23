import {
  GET_QUESTIONS,
  GET_QUESTION,
  GET_USER_QUESTIONS,
} from "../actions/types";

const initialState = {
  questions: [],
  question: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        questions: action.payload,
        question: {},
      };
    case GET_QUESTION:
      return {
        ...state,
        question: action.payload,
      };
    case GET_USER_QUESTIONS:
      return {
        questions: action.payload,
        question: {},
      };
    default:
      return state;
  }
};
