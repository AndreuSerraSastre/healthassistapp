import { LoginOutlined, LogoutOutlined, UserOutlined, WechatOutlined } from '@ant-design/icons';
import React from 'react';
import { ROLES } from "./permissions";

export const routes = {
  home: {
    key: "home",
    slug: "home",
    to: "/home",
    title: "Nuevo chat",
    icon: <WechatOutlined />,
    showInMenu: true,
    showHeader: true,
    showSearch: true,
    action: null,
    role: [ROLES.admin.role, ROLES.user.role],
  },

  profile: {
    key: "profile",
    slug: "profile",
    to: "/profile",
    title: "Perfil",
    icon: <UserOutlined />,
    showInMenu: false,
    showHeader: true,
    showSearch: true,
    action: null,
    role: [ROLES.admin.role, ROLES.user.role],
  },

  users: {
    key: "users",
    slug: "users",
    to: "/users",
    title: "Usuarios",
    icon: <UserOutlined />,
    showInMenu: true,
    showHeader: true,
    showSearch: true,
    action: null,
    role: [ROLES.admin.role, ROLES.user.role],
  },

  login: {
    key: "login",
    slug: "login",
    to: "/login",
    title: "LOGIN",
    icon: <LoginOutlined />,
    showInMenu: false,
    showHeader: false,
    showSearch: false,
    action: null,
    role: [ROLES.admin.role, ROLES.user.role],
  },

  logout: {
    key: "logout",
    slug: "logout",
    to: "/logout",
    title: "Cerrar Sesión",
    icon: <LogoutOutlined />,
    showInMenu: false,
    showHeader: false,
    showSearch: false,
    action: null,
    role: [ROLES.admin.role, ROLES.user.role],
  },
};
