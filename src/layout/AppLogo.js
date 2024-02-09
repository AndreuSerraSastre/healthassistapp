import React from "react";
import { AppLogoWrapper } from "./Styles";
import logoW from "../assets/app/logo.png";

const AppLogo = ({ width = 250 }) => {
  return (
    <AppLogoWrapper>
      <img
        style={{}}
        src={logoW}
        width={`${width}`}
        alt="Logo truck"
      />
    </AppLogoWrapper>
  );
};

export default AppLogo;
