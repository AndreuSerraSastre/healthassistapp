import React from "react";
import { AppLogoWrapper } from "./Styles";
import logoW from "../assets/app/logo.png";

const AppLogoIso = ({
  width = 64,
  padding = 0,
  margin = "0px 10px 0px -15px",
}) => {
  return (
    <AppLogoWrapper style={{ padding, margin, }}>
      <img
        src={logoW}
        width={`${width}%`}
        style={{ maxWidth: 200 }}
        alt="Logo truck"
      />
    </AppLogoWrapper>
  );
};

export default AppLogoIso;
