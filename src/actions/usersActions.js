import { axios } from "../connection/ConnectionHandler";
import { API } from "../constants/api";
import { formatUsers } from "./settingsActionsUtils";
import {
  ADD_NEW_USER,
  USERS_FORM_TOOGLE_LOADING,
  SHOW_NOTIFICATION,
  UPDATE_USER,
  DELETE_USER,
  SET_USER_LIST,
} from "../constants";
import { keyBy } from "lodash";

/* USER LIST */
export const fetchUsers = () => {
  return async (dispatch) => {
    const response = await axios
      .get(API.users.list)
      .then((response) => {
        const users = formatUsers(response.data);
        dispatch({ type: SET_USER_LIST, payload: keyBy(users, "_id") });
        return response.status;
      })
      .catch((err) => err);
    return response;
  };
};

// USERS
export const createUser = (newUser) => {
  return async (dispatch) => {
    dispatch({ type: USERS_FORM_TOOGLE_LOADING });
    const response = await axios
      .post(API.users.create, newUser)
      .then((response) => {
        const user = formatUsers(response.data);
        dispatch({ type: ADD_NEW_USER, payload: user });
        dispatch({ type: USERS_FORM_TOOGLE_LOADING });
        dispatch({
          type: SHOW_NOTIFICATION,
          payload: {
            show: true,
            status: "success",
            message: "Usuario creado con éxito.",
          },
        });
        return response.status;
      })
      .catch((err) => {
        dispatch({ type: USERS_FORM_TOOGLE_LOADING });
        return err;
      });
    return response;
  };
};

export const updateUser = (updatedUser) => {
  return async (dispatch) => {
    dispatch({ type: USERS_FORM_TOOGLE_LOADING });
    const response = await axios
      .put(`${API.users.edit}${updatedUser._id}`, updatedUser)
      .then((response) => {
        const user = formatUsers(response.data);
        dispatch({ type: UPDATE_USER, payload: user });
        dispatch({ type: USERS_FORM_TOOGLE_LOADING });
        dispatch({
          type: SHOW_NOTIFICATION,
          payload: {
            show: true,
            status: "info",
            message: "Usuario actualizado.",
          },
        });
        return response.status;
      })
      .catch((err) => {
        dispatch({ type: USERS_FORM_TOOGLE_LOADING });
        return err;
      });
    return response;
  };
};

export const deleteUsers = (Ids) => {
  return async (dispatch) => {
    dispatch({ type: USERS_FORM_TOOGLE_LOADING });
    const response = await axios
      .delete(`${API.users.delete}`, { data: Ids })
      .then((response) => {
        dispatch({ type: DELETE_USER, payload: Ids });
        dispatch({ type: USERS_FORM_TOOGLE_LOADING });
        dispatch({
          type: SHOW_NOTIFICATION,
          payload: {
            show: true,
            status: "info",
            message: "Usuario eliminado.",
          },
        });
        return response.status;
      })
      .catch((err) => {
        dispatch({ type: USERS_FORM_TOOGLE_LOADING });
        return err;
      });
    return response;
  };
};
