import React from "react";
import AppMenu from "./AppMenu";
import AppHeader from "./AppHeader";
import {
  AppContentWrapper,
  MainLayoutInnerWrapper,
  MainLayoutWrapper,
} from "./Styles";
import AppBackdrop from "./AppBackDrop";

const MainLayout = (props) => {
  return (
    <MainLayoutWrapper>
      <AppMenu />
      <MainLayoutInnerWrapper>
        <AppHeader />
        <AppContentWrapper>
          {props.children}
          <AppBackdrop />
        </AppContentWrapper>
      </MainLayoutInnerWrapper>
    </MainLayoutWrapper>
  );
};

export default MainLayout;
