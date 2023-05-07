import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  useLocation,
  useParams,
  useOutletContext,
  useNavigate,
  Link,
} from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { getErrors, showError, catchErrors } from "../../common/Error";
import { resetPasswordModalValidator } from "../../common/Validation";
import { toast } from "react-toastify";
import { TOAST_MESSAGE, PAGE_SIZE } from "../../common/Variable";
import { configToast } from "../../config/ConfigUI";
import * as moment from "moment";
import UploadService from "../../services/upload.service";
import UserService from "../../services/user.service";
import Breadcrumb from "../shared/Breadcrumb";

import "./User.scss";

const TITLE = "Đặt Lại Mật Khẩu";
const ResetPassword = () => {
  const { id, token } = useParams();

  const { customer, setCustomer, cartNumber, setCartNumber } =
    useOutletContext();
  let navigate = useNavigate();

  const initData = {
    newPassword: "",
    newPasswordConfirm: "",
  };

  const [profile, setProfile] = useState(initData);
  const [isLoading, setIsLoading] = useState(false);

  // validate
  let [errors, setErrors] = useState([]);
  const [labelInputs, setLabelInputs] = useState([]);

  const handleInput = (e, label) => {
    // check input tag or select tag
    const { name, value } = e.target ? e.target : { name: label, value: e };

    const state = { [name]: value };

    // setLabelInputs(
    //   name == "newPassword" ? [name, "newPasswordConfirm"] : [name]
    // );
    setLabelInputs([name]);
    setProfile({ ...profile, ...state });
  };

  const resetPassword = (newPassword, newPasswordConfirm) => {
    UserService.resetPassword({
      newPassword: newPassword,
      newPasswordConfirm: newPasswordConfirm,
      id: id,
      token: token,
    })
      .then((res) => {
        setIsLoading(false);
        toast.success("Đặt lại mật khẩu thành công", configToast);

        setTimeout(() => {
          localStorage.removeItem("TOKEN");
          localStorage.removeItem("ROLE");
          localStorage.removeItem("CUSTOMER");
          setCartNumber(0);
          setCustomer(null);
          // navigate("/login");
        }, 1000);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message, configToast);
      });
  };

  const onSave = async () => {
    const validate = resetPasswordModalValidator(profile);

    if (validate.error) {
      const errors = getErrors(validate);
      setErrors(errors);
      setIsLoading(false);
    }

    if (!validate.error) {
      setIsLoading(true);

      resetPassword(profile.newPassword, profile.newPasswordConfirm);
    }
  };

  useEffect(() => {
    const validate = resetPasswordModalValidator(profile);
    setErrors(catchErrors(labelInputs, validate, errors));
  }, [profile]);

  return (
    <>
      <div>
        <Breadcrumb currentPage="Đặt Lại Mật Khẩu" />

        <div className="container">
          <div className="row flex justify-center">
            <div className="col-lg-6 col-md-8">
              <div className="user-container">
                <div className="flex items-center justify-between ">
                  <h1 className="title font-bold text-center mb-3">
                    Đặt Lại Mật Khẩu
                  </h1>
                </div>
                <span className="font-bold">Bạn chưa có tài khoản ? </span>
                <Link
                  to="/register"
                  className="text-black font-bold m-0 cursor-pointer"
                >
                  Đăng Ký
                </Link>
                {/* <div className="social-container">
                  <a href="#" className="social">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social">
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                  <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
                </div> */}
                {/* <span>or use your account</span> */}
                <div className="row mt-[45px]">
                  <div className="col-lg-6 col-md-8">
                    <input
                      type="password"
                      name="newPassword"
                      className={
                        "form-control " +
                        (showError(errors, "newPassword")
                          ? "border-[#FF0000] focusError"
                          : "")
                      }
                      placeholder="Mật khẩu mới"
                      onChange={handleInput}
                      value={profile.newPassword}
                    />
                    <small className="text-red-600 font-bold">
                      {showError(errors, "newPassword") &&
                        showError(errors, "newPassword").messages.map(
                          (message, index) => (
                            <div key={index}>&bull; {message}</div>
                          )
                        )}
                    </small>
                  </div>
                  <div className="col-lg-6 col-md-8">
                    <input
                      type="password"
                      name="newPasswordConfirm"
                      className={
                        "form-control " +
                        (showError(errors, "newPasswordConfirm")
                          ? "border-[#FF0000] focusError"
                          : "")
                      }
                      placeholder="Nhập lại mật khẩu mới"
                      onChange={handleInput}
                      value={profile.newPasswordConfirm}
                    />
                    <small className="text-red-600 font-bold">
                      {showError(errors, "newPasswordConfirm") &&
                        showError(errors, "newPasswordConfirm").messages.map(
                          (message, index) => (
                            <div key={index}>&bull; {message}</div>
                          )
                        )}
                    </small>
                  </div>
                </div>
                {/* <a href="#">Quên mật khẩu?</a> */}
                <div>
                  <button
                    onClick={onSave}
                    className={
                      isLoading
                        ? "button button-contactForm btn-block bg-[#5869da] button__loading loading capitalize"
                        : "button button-contactForm btn-block bg-[#5869da] button__loading capitalize"
                    }
                    disabled={isLoading}
                  >
                    Đặt Lại Mật Khẩu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
