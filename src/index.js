import React from 'react';
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, } from "react-router-dom";
import { ConfigProvider } from "antd";
import es_ES from "antd/es/locale/es_ES";
import MobileConsoleDebug from "./utils/MobileConsoleDebug";
import ConnectionHandler from "./connection/ConnectionHandler";
import NotificationsHandler from "./components/Notifications";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import "./styles/index.css";
import "./assets/fonts/index.less";
import "react-drop-zone/dist/styles.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
	<Provider store={store}>
		<BrowserRouter>
			<ConfigProvider locale={es_ES}>
				<App />
				<ConnectionHandler />
				<NotificationsHandler />
				<MobileConsoleDebug />
			</ConfigProvider>
		</BrowserRouter>
	</Provider>
);

serviceWorkerRegistration.register();
