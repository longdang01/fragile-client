import axios from "axios";
import jwt_decode from "jwt-decode";
import UserService from "./services/user.service";

// export default axios.create({
//   baseURL: "http://localhost:5100/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

const jwtInterceptor = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  // Authorization: "Bearer " + TOKEN,
  withCredentials: true,
});

jwtInterceptor.interceptors.request.use(async (config) => {
  let TOKEN = localStorage.getItem("TOKEN");
  let ROLE = localStorage.getItem("ROLE");
  // let ADMIN_JWT_TOKEN = localStorage.getItem("ADMIN_JWT_TOKEN");
  // let IMPORT_JWT_TOKEN = localStorage.getItem("IMPORT_JWT_TOKEN");
  // let SALES_JWT_TOKEN = localStorage.getItem("SALES_JWT_TOKEN");
  // let MEDIA_JWT_TOKEN = localStorage.getItem("MEDIA_JWT_TOKEN");

  if (ROLE == 1) {
    // config.headers["Authorization"] = `Bearer ${ADMIN_JWT_TOKEN}`;
    config.headers["Role"] = 1;
  }

  if (ROLE == 2) {
    // config.headers["Authorization"] = `Bearer ${IMPORT_JWT_TOKEN}`;
    config.headers["Role"] = 2;
  }

  if (ROLE == 3) {
    // config.headers["Authorization"] = `Bearer ${SALES_JWT_TOKEN}`;
    config.headers["Role"] = 3;
  }

  if (ROLE == 4) {
    // config.headers["Authorization"] = `Bearer ${MEDIA_JWT_TOKEN}`;
    config.headers["Role"] = 4;
  }

  if (ROLE == 5) {
    // config.headers["Authorization"] = `Bearer ${CUSTOMER_TOKEN}`;
    config.headers["Role"] = 5;
  }

  config.headers["Authorization"] = `Bearer ${TOKEN}`;

  return config;
});

// jwtInterceptor.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response.status === 401 &&
//       originalRequest.url === `http://localhost:5000/api/users/refresh-token`
//     ) {
//       return Promise.reject(error);
//     }

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const data = await UserService.refreshToken();
//       if (data?.data.token) {
//         originalRequest.headers = {
//           ...originalRequest.headers,
//           authorization: `Bearer ${data?.data.token}`,
//         };
//       }

//       return axios(originalRequest);
//     }
//   }
// );

jwtInterceptor.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;
    let TOKEN = localStorage.getItem("TOKEN");

    const decoded = TOKEN && jwt_decode(TOKEN);

    if (
      error?.response?.status === 401 &&
      !config?.sent &&
      decoded &&
      decoded.exp < Date.now() / 1000
    ) {
      config.sent = true;

      const data = await UserService.refreshToken();

      if (data?.data.token) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${data?.data.token}`,
        };
      }

      return axios(config);
    }

    return Promise.reject(error);
  }
);

export default jwtInterceptor;
