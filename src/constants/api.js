// https://testing-core.deploy.kuarasoftware.es/

export const API = {
	Chats: {
    create: `/Chat`,
    edit: `/Chat/`,
    delete: `/Chat/`,
    list: `/Chat`,
  },
  auth: {
    login: `/user/login`,
    check2FA: `/user/check2FA`,
  },
  users: {
    profile: `/user/profile`,
    create: `/user/register/`,
    edit: `/user/`,
    delete: `/user/`,
    list: `/user`,
  },
  alerts: {
    create: `/alert`,
    edit: `/alert/`,
    delete: `/alert/`,
    list: `/alert`,
  },
};
