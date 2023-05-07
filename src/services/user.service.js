import http from "../http-common";

const login = (data) => {
  return http.post(`/users/login`, data);
};

const register = (data) => {
  return http.post(`/users/register`, data);
};

const refreshToken = (data) => {
  return http.post(`/users/refresh-token`, data);
};

const changePassword = (data) => {
  return http.post(`/users/change-password`, data);
};

const forgotPassword = (data) => {
  return http.post(`/users/forgot-password`, data);
};

const resetPassword = (data) => {
  return http.post(`/users/reset-password`, data);
};

const verifyAccount = (data) => {
  return http.post(`/users/verify-account`, data);
};

const getMe = () => {
  return http.get(`/users/me`);
};

const UserService = {
  login,
  register,
  getMe,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyAccount,
};

export default UserService;
