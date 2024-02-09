import { createSelector } from "reselect";
import moment from "moment";
import "moment/locale/es";
import { ROLES_RAW } from "../../constants/permissions";
moment().locale("es");

/* APP */
export const isUserAuthorized = createSelector(
  (state) => state.authorization,
  (authorization) => authorization
);
export const getCurrentRoute = createSelector(
  (state) => state.currentRoute,
  (currentRoute) => currentRoute
);
export const getCurrentRouteTitle = createSelector(
  getCurrentRoute,
  (route) => route.title
);
export const getSideMenuState = createSelector(
  (state) => state.app,
  (app) => app.isCollapsedSideMenu
);
export const getCurrentTheme = createSelector(
  (state) => state.currentTheme,
  (currentTheme) => currentTheme
);

/* PROFILE */
export const getUserProfile = createSelector(
  (state) => state.profile,
  (profile) => profile
);
export const currentUserId = createSelector(
  (state) => state.profile,
  (profile) => profile && profile.id
);
export const getCurrentUserRole = createSelector(getUserProfile, (profile) =>
  !profile ? null : (ROLES_RAW.includes(profile.role) ? profile.role : null)
);

/* NOTIFICATIONS STATE */
export const getNotificationsState = createSelector(
  (state) => state.notifications,
  (notifications) => notifications
);

/* USERS */
export const getUsers = createSelector(
  (state) => state.users,
  (users) => users
);
export const getUsersForm = createSelector(
  (state) => state.usersForm,
  (form) => form
);

/* ALERT */
export const getAlerts = createSelector(
  (state) => state.alerts,
  (alerts) => alerts
);
export const getAlertsForm = createSelector(
  (state) => state.alertsForm,
  (form) => form
);

/* CHATS */
export const getChats = createSelector(
  (state) => state.Chats,
  (Chats) => Chats
);
export const getChatsForm = createSelector(
  (state) => state.ChatsForm,
  (form) => form
);
