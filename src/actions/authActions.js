import { axios } from "../connection/ConnectionHandler";
import { fetchChats } from "./ChatsActions";
import {
  APP_COOKIE_NAME,
  AUTH,
  PASS_COOKIE_NAME,
  SET_CURRENT_ROUTE,
  SET_PROFILE,
  USER_COOKIE_NAME,
  USER_ID_COOKIE_NAME,
} from "../constants";
import { API } from "../constants/api";
import { deleteCookie, getCookie, setCookie } from "../utils";
import { fetchUsers } from "./usersActions";
import { routes } from "../constants/routes";
import { fetchAlerts } from "./alertsActions";

const rememberLogin = (username, password, remember) => {
  if (remember) {
    setCookie(USER_COOKIE_NAME, username, 30);
    setCookie(PASS_COOKIE_NAME, password, 30);
  } else {
    deleteCookie(USER_COOKIE_NAME, "");
    deleteCookie(PASS_COOKIE_NAME, "");
  }
};

/* PERSISTENCY CHECK */
export const checkToken = () => {
  return async (dispatch) => {
    const token = await getCookie(APP_COOKIE_NAME);
    const userId = await getCookie(USER_ID_COOKIE_NAME);
    if (token) {
      dispatch({ type: AUTH, payload: { auth: true, token, userId } });
    }
  };
};

export const fetchUserProfile = () => {
  return (dispatch) => {
    axios
      .get(API.users.profile)
      .then((response) =>
        dispatch({ type: SET_PROFILE, payload: response.data })
      )
      .catch((err) => err);
  };
};

/* INITAL DATA LOAD */
export const loadInitialData = () => {
  return async (dispatch) => {
    dispatch(fetchUsers());
		dispatch(fetchChats());
    dispatch(fetchAlerts());
  };
};

export const login = (username, password, remember) => {
  return async (dispatch) => {
    const response = await axios
      .post(API.auth.login, { username, password })
      .then((response) => {
        if (response && response.data) {
          const { access_token } = response.data || {};
          rememberLogin(username, password, remember);
          dispatch({
            type: AUTH,
            payload: { auth: true, token: access_token },
          });
          dispatch({ type: SET_PROFILE, payload: response.data.resUser });
          dispatch({
            type: SET_CURRENT_ROUTE,
            payload: routes["home"],
          });
        }
        return response;
      })
      .catch((err) => err);
    return response;
  };
};

export const check2FA = (data) => {
  return async (dispatch) => {
    const response = await axios
      .post(API.auth.check2FA, data)
      .then((response) => {
        if (response && response.data) {
          const { access_token } = response.data || {};
          rememberLogin(data.username, data.password, data.remember);
          dispatch({
            type: AUTH,
            payload: { auth: true, token: access_token },
          });
          dispatch({ type: SET_PROFILE, payload: response.data.resUser });
          dispatch({
            type: SET_CURRENT_ROUTE,
            payload: routes["home"],
          });
        }
        return response;
      })
      .catch((err) => err);
    return response;
  };
};
