import React from 'react';
import { AlertMenuWrapper } from "./Styles";
import { useIsMobile } from "../utils";
import { useSelector } from "react-redux";
import { getAlerts, getUserProfile } from "../store/selectors";
import { Button, Dropdown } from "antd";
import { Fragment, useEffect } from "react";
import socket from "../utils/Socket";
import { useDispatch } from "react-redux";
import { deleteAlerts, fetchAlerts } from "../actions/alertsActions";
import { AlertCross, AlertText, AlertWrapper } from "../components/Alert/style";
import { FlexSpace } from "../styles";
import { BulbFilled, BulbOutlined } from '@ant-design/icons';

const AlertMenu = () => {
  const isMobile = useIsMobile();

  let alerts = useSelector(getAlerts);
  alerts = alerts && Object.values(alerts).filter(a => a.showed === false)
  const profile = useSelector(getUserProfile);

  const dispatch = useDispatch();

  useEffect(() => {
    let currentSocket;
    if (profile) {
      currentSocket = socket(profile._id).on("refreshAlerts", (data) => {
        dispatch(fetchAlerts());
      });
    }
    return () => {
      if (currentSocket) {
        currentSocket.off("refreshAlerts");
      }
    };
  }, [profile, dispatch]);

  const alertsSort = (nA, nB) => (nB.createdAt < nA.createdAt ? -1 : 1);


  const deleteAlert = (id) => {
    dispatch(deleteAlerts([id]));
  };

  const deleteAllAlert = () => {
    dispatch(deleteAlerts(Object.values(alerts).map((alert) => alert._id)));
  };

  const AlertClick = async (alert) => {
    deleteAlert(alert._id);
  };

  if (!alerts) return null;


  return (
    <Dropdown disabled={alerts && alerts.length === 0} menu={{
      items: [{
        key: -1,
        label: (
          <Button style={{ textAlign: "center", width: "100%" }} onClick={deleteAllAlert} >
            Borrar todo
          </Button>
        )
      }].concat(Object.values(alerts)
        .sort(alertsSort)
        .map((alert, key) => (
          {
            key: key,
            label: (
              <AlertWrapper key={key}>
                <FlexSpace>
                  <AlertText onClick={() => AlertClick(alert)}>
                    <strong>{alert.title}</strong >
                    <div>{alert.description}</div >
                  </AlertText >
                </FlexSpace >
                <AlertCross className='fas fa-times' onClick={() => deleteAlert(alert._id)}></AlertCross >
              </AlertWrapper >
            ),
          }
        ))
      )
    }} trigger={['hover', 'click']}>
      {alerts ? (
        <AlertMenuWrapper>
          {Object.values(alerts).length === 0 ? (
            <BulbOutlined style={{ marginRight: 5 }} />
          ) : (
            <BulbFilled style={{ marginRight: 5 }} />
          )}
          {!isMobile && (
            <Fragment>
              {Object.values(alerts).length === 0
                ? "No hay alertas..."
                : "Alertas nuevas..."}
            </Fragment>
          )}
        </AlertMenuWrapper>
      ) : (
        <div></div>
      )}
    </Dropdown>
  );
};

export default AlertMenu;
