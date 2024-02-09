import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { deleteAlerts } from "../../actions/alertsActions";
import { SET_CURRENT_ROUTE, SET_SIDE_MENU_STATE } from "../../constants";
import { AlertCross, AlertListWrapper, AlertListInnerWrapper, AlertText, AlertWrapper } from './style';
import { FlexSpace } from "./../../styles";
import { useNavigate } from "react-router";

const AlertList = ({ alerts }) => {
  const history = useNavigate();

  const dispatch = useDispatch();

  const alertsSort = (nA, nB) => (nB.createdAt < nA.createdAt ? -1 : 1);

  const deleteAlert = (id) => {
    dispatch(deleteAlerts([id]));
  };

  if (!alerts || Object.keys(alerts).length === 0) {
    return null;
  }

  const deleteAllAlert = () => {
    dispatch(deleteAlerts(Object.values(alerts).map((alert) => alert._id)));
  };

  const getObjectByName = async (name, id) => {
    switch (name) {
      // case "holidayRequest":
      //   const holidayRequests = await dispatch(fetchHolidayRequests());
      //   return holidayRequests.data[id];
      default:
        return null;
    }
  };

  const AlertClick = async (alert) => {
    deleteAlert(alert._id);
    switch (alert.goTo) {
      default:
        break;
    }
    const splits = alert.goTo.split("/");
    if (alert.goTo) {
      history(alert.goTo);
      dispatch({
        type: SET_CURRENT_ROUTE,
        payload: splits[splits.length - 1],
      });
      dispatch({ type: SET_SIDE_MENU_STATE, payload: true });
      dispatch({
        type: alert.typeDispatch,
        payload: await getObjectByName(
          splits[splits.length - 1],
          alert.objectId
        ),
      });
    }
  };

  return (
    <AlertListWrapper>
      <AlertListInnerWrapper>
        {alerts &&
          Object.values(alerts)
            .sort(alertsSort)
            .map((alert, key) => (
              <AlertWrapper key={key} >
                <FlexSpace>
                  <AlertText onClick={() => AlertClick(alert)}>
                    <strong>{alert.title}</strong >
                    <div>{alert.description}</div >
                  </AlertText >
                </FlexSpace >
                <AlertCross className='fas fa-times' onClick={() => deleteAlert(alert._id)}></AlertCross >
              </AlertWrapper >
            ))}
      </AlertListInnerWrapper >
      <Button style={{ color: 'white', margin: '5px 10px' }} type='ghost' onClick={deleteAllAlert} >
        Borrar todo
      </Button>
    </AlertListWrapper>
  );
};

export default AlertList;
