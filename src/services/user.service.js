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

const getMe = () => {
  return http.get(`/users/me`);
};

const UserService = {
  login,
  register,
  getMe,
  refreshToken,
  changePassword,
};

export default UserService;
