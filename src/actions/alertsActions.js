import { axios } from "../connection/ConnectionHandler";
import { API } from "../constants/api";
import { keyBy } from "lodash";
import {
  ADD_NEW_ALERT,
  DELETE_ALERT,
  ALERT_FORM_TOOGLE_LOADING,
  SET_ALERT_LIST,
  SHOW_NOTIFICATION,
  UPDATE_ALERT,
} from "../constants";
import { formatAlerts } from "./settingsActionsUtils";

/* ALERT LIST */
export const fetchAlerts = () => {
  return async (dispatch) => {
    const response = await axios
      .get(API.alerts.list)
      .then((response) => {
        const alerts = formatAlerts(response.data);
        dispatch({ type: SET_ALERT_LIST, payload: keyBy(alerts, "_id") });
        return response.status;
      })
      .catch((err) => err);
    return response;
  };
};

// ALERTS
export const createAlert = (newAlert) => {
  return async (dispatch) => {
    dispatch({ type: ALERT_FORM_TOOGLE_LOADING });
    const response = await axios
      .post(API.alerts.create, newAlert)
      .then((response) => {
        const { _id } = response.data;
        const alert = formatAlerts({ ...newAlert, _id });
        dispatch({ type: ADD_NEW_ALERT, payload: alert });
        dispatch({ type: ALERT_FORM_TOOGLE_LOADING });
        dispatch({
          type: SHOW_NOTIFICATION,
          payload: {
            show: true,
            status: "success",
            message: "Alerta creada con éxito.",
          },
        });
        return response.status;
      })
      .catch((err) => {
        dispatch({ type: ALERT_FORM_TOOGLE_LOADING });
        return err;
      });
    return response;
  };
};

export const updateAlert = (updatedAlert) => {
  return async (dispatch) => {
    dispatch({ type: ALERT_FORM_TOOGLE_LOADING });
    const response = await axios
      .put(`${API.alerts.edit}${updatedAlert._id}`, updatedAlert)
      .then((response) => {
        const alert = formatAlerts(response.data);
        dispatch({ type: UPDATE_ALERT, payload: alert });
        dispatch({ type: ALERT_FORM_TOOGLE_LOADING });
        dispatch({
          type: SHOW_NOTIFICATION,
          payload: {
            show: true,
            status: "info",
            message: "Alerta actualizada.",
          },
        });
        return response.status;
      })
      .catch((err) => {
        dispatch({ type: ALERT_FORM_TOOGLE_LOADING });
        return err;
      });
    return response;
  };
};

export const deleteAlerts = (Ids) => {
  return async (dispatch) => {
    dispatch({ type: ALERT_FORM_TOOGLE_LOADING });
    const response = await axios
      .delete(`${API.alerts.delete}`, { data: Ids })
      .then((response) => {
        dispatch({ type: DELETE_ALERT, payload: Ids });
        dispatch({ type: ALERT_FORM_TOOGLE_LOADING });
        dispatch({
          type: SHOW_NOTIFICATION,
          payload: {
            show: true,
            status: "info",
            message: "Alertas eliminadas. ",
          },
        });
        return response.status;
      })
      .catch((err) => {
        dispatch({ type: ALERT_FORM_TOOGLE_LOADING });
        return err;
      });
    return response;
  };
};
