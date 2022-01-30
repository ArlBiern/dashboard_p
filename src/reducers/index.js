import { combineReducers } from "redux";
import users from "./usersReducer";
import fetchingUsers from "./fetchingReducer";

export default combineReducers({
  users: users,
  fetchingUsers: fetchingUsers,
});
