import { handleActions, handleAction } from "redux-actions";
import {
  AUTH,
  SET_PROFILE,
  SET_CURRENT_ROUTE,
  LOGOUT,
  SHOW_NOTIFICATION,
  CLOSE_NOTIFICATION,
  SET_SIDE_MENU_STATE,
  OPEN_USERS_FORM,
  CLOSE_USERS_FORM,
  EDIT_SELECTED_USER,
  USERS_FORM_TOOGLE_LOADING,
  SET_USER_LIST,
  ADD_NEW_USER,
  UPDATE_USER,
  DELETE_USER,
  OPEN_ALERT_FORM,
  CLOSE_ALERT_FORM,
  EDIT_SELECTED_ALERT,
  ALERT_FORM_TOOGLE_LOADING,
  SET_ALERT_LIST,
  ADD_NEW_ALERT,
  UPDATE_ALERT,
  DELETE_ALERT,
  THEME,
  ADD_NEW_CHAT,
  SET_CHAT_LIST,
  UPDATE_CHAT,
  DELETE_CHAT,
  OPEN_CHAT_FORM,
  CLOSE_CHAT_FORM,
  EDIT_SELECTED_CHAT,
  CHAT_FORM_TOOGLE_LOADING,
} from "./../../constants";

/* BASIC */
export const authorization = handleActions(
  {
    [AUTH]: (state, action) => action.payload,
    [LOGOUT]: () => ({ auth: false }),
  },
  null
);

/* PROFILE */
export const profile = handleActions(
  {
    [SET_PROFILE]: (state, action) => action.payload,
  },
  null
);

/* APP */
export const currentRoute = handleAction(
  SET_CURRENT_ROUTE,
  (state, action) => action.payload,
  {}
);

export const notifications = handleActions(
  {
    [SHOW_NOTIFICATION]: (state, action) => action.payload,
    [CLOSE_NOTIFICATION]: (state, action) => ({
      show: false,
      status: null,
      message: null,
    }),
  },
  { show: false, status: null, message: null }
);

/* APP */
export const app = handleActions(
  {
    [SET_SIDE_MENU_STATE]: (state, action) => {
      return { ...state, isCollapsedSideMenu: action.payload };
    },
  },
  { isCollapsedSideMenu: true }
);

export const currentTheme = handleAction(
  THEME,
  (state, action) => action.payload,
  false
);

export const users = handleActions(
  {
    [SET_USER_LIST]: (state, action) => action.payload,
    [ADD_NEW_USER]: (state, action) => {
      const newState = {
        ...state,
        [action.payload.value]: action.payload,
      };
      return newState;
    },
    [UPDATE_USER]: (state, action) => {
      const newState = {
        ...state,
        [action.payload.value]: action.payload,
      };
      return newState;
    },
    [DELETE_USER]: (state, action) => {
      action.payload.forEach((number) => {
        delete state[number];
      });
      return { ...state };
    },
  },
  null
);

export const usersForm = handleActions(
  {
    [OPEN_USERS_FORM]: (state) => ({
      show: !state.show,
      data: null,
      loading: false,
    }),
    [CLOSE_USERS_FORM]: () => ({ show: false, data: null, loading: false }),
    [EDIT_SELECTED_USER]: (s, action) => ({
      show: true,
      data: action.payload,
      loading: false,
    }),
    [USERS_FORM_TOOGLE_LOADING]: (state) => ({
      ...state,
      loading: !state.loading,
    }),
  },
  { show: false, data: null, loading: false }
);

export const alerts = handleActions(
  {
    [SET_ALERT_LIST]: (state, action) => action.payload,
    [ADD_NEW_ALERT]: (state, action) => {
      const newState = {
        ...state,
        [action.payload.value]: action.payload,
      };
      return newState;
    },
    [UPDATE_ALERT]: (state, action) => {
      const newState = {
        ...state,
        [action.payload.value]: action.payload,
      };
      return newState;
    },
    [DELETE_ALERT]: (state, action) => {
      action.payload.forEach((number) => {
        delete state[number];
      });
      return { ...state };
    },
  },
  null
);

export const alertsForm = handleActions(
  {
    [OPEN_ALERT_FORM]: (state) => ({
      show: !state.show,
      data: null,
      loading: false,
    }),
    [CLOSE_ALERT_FORM]: () => ({ show: false, data: null, loading: false }),
    [EDIT_SELECTED_ALERT]: (s, action) => ({
      show: true,
      data: action.payload,
      loading: false,
    }),
    [ALERT_FORM_TOOGLE_LOADING]: (state) => ({
      ...state,
      loading: !state.loading,
    }),
  },
  { show: false, data: null, loading: false }
);

// CHATS
export const Chats = handleActions(
    {
        [SET_CHAT_LIST]: (state, action) => action.payload,
        [ADD_NEW_CHAT]: (state, action) => {
            const newState = {
                ...state,
                [action.payload.value]: action.payload,
            };
            return newState;
        },
        [UPDATE_CHAT]: (state, action) => {
            const newState = {
                ...state,
                [action.payload.value]: action.payload,
            };
            return newState;
        },
        [DELETE_CHAT]: (state, action) => {
            action.payload.forEach((number) => {
                delete state[number];
            });
            return { ...state };
        },
    },
    null
);

export const ChatsForm = handleActions(
    {
        [OPEN_CHAT_FORM]: (state) => ({
            show: !state.show,
            data: null,
            loading: false,
        }),
        [CLOSE_CHAT_FORM]: () => ({
            show: false,
            data: null,
            loading: false,
        }),
        [EDIT_SELECTED_CHAT]: (s, action) => ({
            show: true,
            data: action.payload,
            loading: false,
        }),
        [CHAT_FORM_TOOGLE_LOADING]: (state) => ({
            ...state,
            loading: !state.loading,
        }),
    },
    { show: false, data: null, loading: false }
);
