import React from 'react';
import { lazy, Suspense, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isUserAuthorized, getCurrentTheme } from "./store/selectors";
import {
  checkToken,
  fetchUserProfile,
  loadInitialData,
} from "./actions/authActions";
import { Loading } from "./layout/utils/AppLoading";
import withClearCache from "./ClearCache";
import { ConfigProvider, theme } from 'antd';
import { THEME } from "./constants";
import es_ES from "antd/es/locale/es_ES";
import { getCookie } from './utils';

const MainContainer = lazy(() => import("./containers/MainContainer"));
const AuthContainer = lazy(() => import("./containers/AuthContainer"));

const App = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(getCurrentTheme);

  const ClearCacheComponent = withClearCache(() => {
    return <></>;
  });

  const { auth } = useSelector(isUserAuthorized) || {};

  const fetchInitialData = useCallback(() => {
    dispatch(fetchUserProfile());
    dispatch(loadInitialData());
  }, [dispatch]);

  const checkPersistency = useCallback(() => {
    dispatch(checkToken());
  }, [dispatch]);

  useEffect(() => {
    auth ? fetchInitialData() : checkPersistency();
  }, [auth, fetchInitialData, checkPersistency]);


  useEffect(() => {
    const refreshTheme = async () => {
      await dispatch({ type: THEME, payload: await getCookie(THEME) })
    }
    refreshTheme()
  }, [dispatch])

  return (
    <Suspense fallback={<Loading centered />}>
      <ConfigProvider
        locale={es_ES}
        theme={{
          token: {
            borderRadius: 3,
            colorPrimary: "#00a67d",
            colorBgBase: currentTheme ? "#fff" : "#38393F",
            colorTextDisabled: currentTheme ? "rgba(0, 0, 0, 0.50)" : "rgba(255, 255, 255, 0.50)",
          },
          components: {
            Switch: {
              colorPrimary: '#4CAF50',
              colorPrimaryHover: "#4CAF50",
            }
          },
          algorithm: currentTheme ? theme.defaultAlgorithm : theme.darkAlgorithm,
        }}
      >
        <ClearCacheComponent />
        {auth ? <MainContainer /> : <AuthContainer />}
      </ConfigProvider>
    </Suspense>
  );
};

export default App;
