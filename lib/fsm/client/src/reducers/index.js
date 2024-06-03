import { combineReducers } from "redux";
import authReducer from "./authReducer";
import questionReducer from "./questionReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  authReducer,
  questionReducer,
  errorReducer,
  profileReducer,
});
