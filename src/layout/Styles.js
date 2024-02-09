import styled from "styled-components";
import { Layout } from "antd";
import { HomeOutlined } from "@ant-design/icons";

const { Sider, Header, Footer, Content } = Layout;

export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  cursor: pointer;
  backdrop-filter: blur(6px);
`;

export const MainLayoutWrapper = styled(Layout)`
  height: 100vh;
  max-height: 100vh;
  background: #e5e5e5;
  overflow: hidden;
`;

export const MainLayoutInnerWrapper = styled(Layout)`
  height: 100vh;
  max-height: 100vh;
  /* overflow: auto;w */
`;

export const AppMenuWrapper = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: ${(props) => (props.ismobile ? "fixed" : "unset")};
  left: 0;
  @media (min-width: 1024px) {
    z-index: 0;
  }
  z-index: 1091;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

export const AppHeaderWrapper = styled(Header)`
  z-index: 1000;
  line-height: initial;
  width: 100%;
  padding-inline: 0px !important;
  color: #fff !important;
  @media (min-width: 1024px) {
    z-index: 0;
  }
`;

export const AppHeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const AppHeaderWidgets = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  & > * {
    margin: 0px 10px;
  }
`;

export const AppContentWrapper = styled(Content)`
  position: relative;
  margin: 8px 8px 0px 8px;
  height: 100%;
  @media only screen and (min-width: 600px) {
    overflow: hidden scroll;
  }
`;

export const AppFooterWrapper = styled(Footer)`
  text-align: center;
  font-size: 10px;
  padding: 0px;
  margin: 10px 0px;
  & > p {
    margin-bottom: 0px;
    line-height: 1;
  }
`;

export const AppLogoWrapper = styled.div`
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageHeaderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  font-weight: 700;
  & > :first-child {
    margin-right: 15px;
  }
  & > :nth-child(2) {
    margin-right: 5px;
  }
`;

export const SubMenuWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const AppMenuProfileWrapper = styled.div`
  cursor: pointer;
  height: 64px;
  min-width: 200px;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  :hover {
    background: #ffffff47;
  }
`;

export const AlertMenuWrapper = styled.div`
  cursor: pointer;
  height: 64px;
  margin-right: 15px;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  :hover {
    background: #ffffff47;
  }
`;

export const Cuadro = styled.div`
  width: 220px;
  height: 230px;
  border-radius: 2px;
  cursor: pointer;
  background: #c5d4bb;
  color: #0c0c0b;
`;

export const TextoMenu = styled.div`
  width: 100%;
  background: rgba(34, 34, 34, 0.5);
  border-radius: 32px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-right: 10px;
  margin-left: 10px;
`;

export const Title = styled.h2`
  font-size: large;
  padding-left: 10px;
  padding-top: 10px;
  font-family: "Segoe UI", "Segoe WP", Segoe, device-segoe, Tahoma, Helvetica, Arial, sans-serif !important;
  font-weight: normal !important;
  font-style: normal !important;
  text-transform: none !important;
  height: 25px;
`;

export const Subtitle = styled.h5`
  font-size: small;
  padding-left: 10px;
  font-family: "Segoe UI", "Segoe WP", Segoe, device-segoe, Tahoma, Helvetica, Arial, sans-serif !important;
  font-weight: normal !important;
  font-style: normal !important;
  text-transform: none !important;  
  height: 45px;
`;

export const NumberText = styled.div`
  font-size: 100px;
  padding-left: 10px;
  height: 30px;
  text-align: top;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: "Segoe UI", "Segoe WP", Segoe, device-segoe, Tahoma, Helvetica, Arial, sans-serif !important;
  font-weight: 300 !important;
  font-style: normal !important;
  text-transform: none !important;  
`;

export const MenuWrapper = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  margin: 50px;
  justify-content: end;
  align-items: start;
`;

export const HomeOutlinedButton = styled(HomeOutlined)`
  font-size: xx-large;
  cursor: pointer;
  :hover {
    color: blue;
  }
`;

export const NavigationText = styled.div`
  font-size: x-large;
  cursor: pointer;
  font-weight: 500;
  :hover {
    color: blue;
  }
`;
