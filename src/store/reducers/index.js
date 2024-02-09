import { combineReducers } from "redux";
import {
  authorization,
  profile,
  currentRoute,
  notifications,
  app,
  usersForm,
  users,
  alerts,
  alertsForm,
  currentTheme,
  Chats,
  ChatsForm,
} from "./Reducers";

export default combineReducers({
  Chats,
  ChatsForm,
  app,
  authorization,
  currentRoute,
  profile,
  notifications,
  usersForm,
  users,
  alerts,
  alertsForm,
  currentTheme,
});
