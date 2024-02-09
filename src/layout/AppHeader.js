import React from "react";
import { useSelector } from "react-redux";
import { getCurrentRoute, getCurrentTheme, getSideMenuState } from "../store/selectors";
import {
  AppHeaderInner,
  AppHeaderWrapper,
  PageHeaderTitle,
  SubMenuWrapper,
} from "./Styles";
import ToogleSideMenu from "./ToogleMenu";
import { Fragment } from "react";
import { setCookie, useIsMobile } from "../utils";
import AppMenuProfile from "./AppMenuProfile";
import AlertMenu from "./AlertMenu";
import { Switch } from "antd";
import { BulbOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { THEME } from "../constants";

const AppHeader = () => {
  const isMobile = useIsMobile();
  const currentRoute = useSelector(getCurrentRoute);
  const isMenuOpen = useSelector(getSideMenuState);
  const dispatch = useDispatch();

  const theme = useSelector(getCurrentTheme);

  const handleChange = (data) => {
    dispatch({ type: THEME, payload: data });
    setCookie(THEME, data)
  }
  return (
    <AppHeaderWrapper>
      <AppHeaderInner>
        <PageHeaderTitle>
          {!isMobile && isMenuOpen && (
            <Fragment>
              {currentRoute && currentRoute.icon}
              {currentRoute && currentRoute.title ? currentRoute.title.toUpperCase() : ""}
            </Fragment>
          )}
        </PageHeaderTitle>
        <SubMenuWrapper>
          <Switch
            onChange={handleChange}
            style={{ marginRight: 15 }}
            defaultChecked={theme}
            checkedChildren={<BulbOutlined />}
            unCheckedChildren={<BulbOutlined />}
          />
          <AlertMenu></AlertMenu>
          <AppMenuProfile></AppMenuProfile>
          {isMobile && <ToogleSideMenu />}
        </SubMenuWrapper>
      </AppHeaderInner>
    </AppHeaderWrapper>
  );
};

export default AppHeader;
