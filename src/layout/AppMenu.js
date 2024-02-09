import React, { useCallback, useEffect, useState } from "react";
import AppLogoIso from "./AppLogoIso";
import { AppMenuWrapper } from "./Styles";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { SET_CURRENT_ROUTE, SET_SIDE_MENU_STATE } from "../constants";
import { getSideMenuState, getCurrentUserRole, getCurrentRoute, getChats } from "../store/selectors";
import { useIsMobile } from "../utils";
import { routes } from "../constants/routes";
import { MenuScrollWrapper } from "../pages/styles";
import { Button, Popconfirm } from "antd";
import { DeleteIcon } from "../constants/icons";
import { deleteChats } from "../actions/ChatsActions";

const AppMenu = () => {
  const history = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const collapsed = useSelector(getSideMenuState);
  const userRole = useSelector(getCurrentUserRole);
  const isMobile = useIsMobile();
  const currentRoute = useSelector(getCurrentRoute);
  const packageJson = require('../../package.json');
  const chats = useSelector(getChats)
  const [loading, setLoading] = useState()

  const handleCurrentRoute = useCallback(
    (route, parent) => {
      try {
        if (routes) {
          let newroute = null;
          newroute = routes[route ? route : "home"];
          dispatch({
            type: SET_CURRENT_ROUTE,
            payload: newroute,
          });
        }
      } catch { }
    },
    [dispatch]
  );

  const goTo = (e) => {
    const path = routes[e.key].to;
    history(path);
    handleCurrentRoute(e.key);
    !collapsed && dispatch({ type: SET_SIDE_MENU_STATE, payload: true });
  };

  const routeChecker = (route) => {
    const { showInMenu = false, role = [] } = route || {};
    return showInMenu && role.includes(userRole);
  };

  useEffect(() => {
    if (!currentRoute || !currentRoute.to) {
      let newRoute = routes["home"]
      const route = Object.values(routes).find(x => x.to === location.pathname)
      newRoute = route || routes[route ? route : "home"];
      dispatch({
        type: SET_CURRENT_ROUTE,
        payload: newRoute,
      });
    }
  }, [currentRoute, location.pathname, dispatch]);

  if (!userRole) {
    return null;
  }

  const goToChat = (id) => () => {
    history("/" + id)
    dispatch({
      type: SET_CURRENT_ROUTE,
      payload: { ...routes["home"], title: `${chats[id].title}` },
    });
  }

  const confirm = async () => {
    setLoading(true)
    await dispatch(deleteChats(Object.values(chats).map(x => x._id)))
    setLoading(false)
  }

  return (
    <AppMenuWrapper
      breakpoint="lg"
      collapsedWidth="0"
      ismobile={isMobile ? 1 : 0}
      collapsed={isMobile ? collapsed : false}
      trigger={null}
    >
      <AppLogoIso />
      {routes && chats && <MenuScrollWrapper style={{ height: "60vh", overflowY: "auto" }} theme="dark" mode="inline" items={
        Object.values(routes).filter(x => routeChecker(x)).map(
          (route) =>
          ({
            className: route.key === "users" ? "usersMenu" : "",
            key: route.key,
            onClick: goTo,
            to: route.to,
            icon: route.icon,
            label: route.title
          })
        )
          .concat({
            className: "logoutMenu",
            key: routes["logout"].key,
            onClick: goTo,
            to: routes["logout"].to,
            icon: routes["logout"].icon,
            label: routes["logout"].title
          })
          .concat(Object.values(chats).map(x => ({

            key: x._id,
            onClick: goToChat(x._id),
            icon: routes["home"].icon,
            label: x.title

          })))

      }>
      </MenuScrollWrapper>}
      <Popconfirm
        title="¿Está seguro de borrar todos los chats?"
        onConfirm={confirm}
        okText="Si"
        cancelText="No"
        loading={loading}
      >
        <Button danger loading={loading} type="text" style={{ position: "absolute", left: 12, bottom: 128 }}><DeleteIcon></DeleteIcon>Borrar chats</Button>
      </Popconfirm>
      <div style={{ color: "rgba(255, 255, 255, 0.65)", position: "absolute", bottom: 20, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>{packageJson.version + " v"}</div>
    </AppMenuWrapper>
  );
};

export default AppMenu;
