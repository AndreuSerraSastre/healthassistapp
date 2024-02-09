import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSideMenuState, getUserProfile } from "../store/selectors";
import { AppMenuProfileWrapper } from "./Styles";
import { Avatar } from "antd";
import { useNavigate } from "react-router";
import { useCallback } from "react";
import { SET_CURRENT_ROUTE, SET_SIDE_MENU_STATE } from "../constants";
import { routes } from "../constants/routes";
import { useIsMobile } from "../utils";

const AppMenuProfile = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const collapsed = useSelector(getSideMenuState);
  const isMobile = useIsMobile();
  const profile = useSelector(getUserProfile)
  const open = useSelector(getSideMenuState)

  const handleCurrentRoute = useCallback(
    (route) => {
      try {
        if (routes) {
          dispatch({
            type: SET_CURRENT_ROUTE,
            payload: routes[route ? route : "home"],
          });
        }
      } catch { }
    },
    [dispatch]
  );

  const getRoute = (route) => {
    const currentRoute = Object.values(routes).find((e) => {
      return e.to === route;
    });

    return currentRoute.key;
  };

  const goTo = () => {
    history("/profile");
    handleCurrentRoute(getRoute("/profile"));
    !collapsed && dispatch({ type: SET_SIDE_MENU_STATE, payload: true });
  };

  if (!open) return;

  return (
    <AppMenuProfileWrapper
      style={isMobile ? { minWidth: "auto" } : {}}
      onClick={goTo}
    >
      <Avatar
        style={{ marginRight: "10px" }}
        size={45}
        src={
          (profile && profile.picture)
            ? profile.picture.url
            : process.env.PUBLIC_URL + "/user-profile.png"
        }
      />

      {!isMobile && profile && profile.name + " " + profile.surname}
    </AppMenuProfileWrapper>
  );
};

export default AppMenuProfile;
