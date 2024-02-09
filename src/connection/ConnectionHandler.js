import Axios from "axios";
import { useDispatch } from "react-redux";
import { APP_COOKIE_NAME, LOGOUT, SHOW_NOTIFICATION } from "../constants";
import { deleteCookie, getCookie, setCookie } from "../utils";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://healthassist-api.app.elingenierojefe.es"
    : "http://localhost:3005";

export const axios = Axios.create({ baseURL: BASE_URL });

const setAccessToken = async (token) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${token || getCookie(APP_COOKIE_NAME)}`,
  };
  setCookie(APP_COOKIE_NAME, token, 1);
};

const chcekAccessToken = async (request) => {
  if (request.headers["Authorization"]) {
    return request;
  } else {
    const token = await getCookie(APP_COOKIE_NAME);
    if (token) {
      setAccessToken(token);
      return { ...request, headers: { Authorization: `Bearer ${token}` } };
    } else {
      return request;
    }
  }
};

const ConnectionHandler = () => {
  const dispatch = useDispatch();

  const showNotification = (message = "HA OCURRIDO UN ERROR") => {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { show: true, status: "error", message },
    });
  };

  const exitFromApp = () => {
    deleteCookie(APP_COOKIE_NAME);
    dispatch({ type: LOGOUT });
  };

  axios.interceptors.request.use(
    async (request) => {
      const config = await chcekAccessToken(request);
      return config;
    },
    (err) => {
      try {
        showNotification(err.response.message);
      } catch (error) {

      }
    }
  );

  axios.interceptors.response.use(
    (config) => {
      if (
        config.config.url === `/user/login` ||
        config.config.url === `/user/check2FA`
      ) {
        setAccessToken(config.data.access_token);
      }
      return config;
    },
    (err) => {
      const {
        status = 0,
        data: { message = "" },
        config: { url = "" },
      } = err.response || {};
      console.log("⛔️ RESPONSE ERROR (Target) => ", url);
      console.log("⛔️ RESPONSE ERROR (Message) => ", message);
      console.log("⛔️ RESPONSE ERROR (Code) => ", status);
      console.log("➕➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➕");
      switch (status) {
        case 401:
          if (message === "Invalid username or password") {
            showNotification(`Usuario o contraseña incorrectos.`);
            exitFromApp();
            return status;
          }
          if (message !== "Invalid token") showNotification(`${message}`);
          exitFromApp();
          return status;
        case 300:
          return status;
        default:
          break;
      }
      showNotification(`${message}`);
      return status;
      // showNotification(`${message} => TARGET: ${url}`);
    }
  );

  return null;
};

export default ConnectionHandler;
