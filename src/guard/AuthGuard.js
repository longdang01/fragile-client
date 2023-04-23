import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import UserService from "../services/user.service";
import Login from "../components/user/Login";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TOAST_MESSAGE, PAGE_SIZE } from "../common/Variable";
import { configToast } from "../config/ConfigUI";

const AuthGuard = ({ children }) => {
  let navigate = useNavigate();
  const [customer, setCustomer] = useState();
  const hasToken = localStorage.getItem("TOKEN");
  const hasCustomer = localStorage.getItem("CUSTOMER");
  const hasRole = localStorage.getItem("ROLE");

  useEffect(() => {
    async function getToken() {
      UserService.getMe()
        .then((res) => {
          setCustomer(res);
        })
        .catch((err) => {
          setCustomer(-1);
        });
      // const data = hasToken && (await UserService.getMe());
      // setCustomer(data || -1);
    }
    if (hasToken) getToken();
  }, []);

  useEffect(() => {
    if (customer == -1 || !hasToken || !hasCustomer || !hasRole) {
      navigate("/login");
    }
  }, [customer]);

  return customer && children;
};

export default AuthGuard;
