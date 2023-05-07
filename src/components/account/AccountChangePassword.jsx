import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  useLocation,
  useParams,
  useOutletContext,
  useNavigate,
} from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { getErrors, showError, catchErrors } from "../../common/Error";
import { changePasswordModalValidator } from "../../common/Validation";
import { toast } from "react-toastify";
import { TOAST_MESSAGE, PAGE_SIZE } from "../../common/Variable";
import { configToast } from "../../config/ConfigUI";
import * as moment from "moment";
import UploadService from "../../services/upload.service";
import UserService from "../../services/user.service";

import "./Account.scss";

const TITLE = "Đổi Mật Khẩu";
const AccountChangePassword = () => {
  const { customer, setCustomer, cartNumber, setCartNumber } =
    useOutletContext();
  let navigate = useNavigate();

  const initData = {
    oldPassword: "",
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

  const changePassword = (oldPassword, newPassword, newPasswordConfirm) => {
    UserService.changePassword({
      oldPassword: oldPassword,
      newPassword: newPassword,
      newPasswordConfirm: newPasswordConfirm,
    })
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.message, configToast);

        setTimeout(() => {
          localStorage.removeItem("TOKEN");
          localStorage.removeItem("ROLE");
          localStorage.removeItem("CUSTOMER");
          setCartNumber(0);
          setCustomer(null);
          navigate("/login");
        }, 1000);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message, configToast);
      });
  };

  const onSave = async () => {
    const validate = changePasswordModalValidator(profile);

    if (validate.error) {
      const errors = getErrors(validate);
      setErrors(errors);
      setIsLoading(false);
    }

    if (!validate.error) {
      setIsLoading(true);

      changePassword(
        profile.oldPassword,
        profile.newPassword,
        profile.newPasswordConfirm
      );
    }
  };

  useEffect(() => {
    const validate = changePasswordModalValidator(profile);
    setErrors(catchErrors(labelInputs, validate, errors));
  }, [profile]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charset="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <title>
            {TITLE + " / Fragile - Thương Hiệu Thời Trang Việt Nam"}
          </title>
        </Helmet>
      </HelmetProvider>

      <div className="axil-dashboard-overview">
        <div className="welcome-text">Đổi Mật Khẩu,</div>
        <div className="flex justify-start">
          <div className="">
            <div className="axil-dashboard-account">
              <div className="row">
                <div className="col-12">
                  <div className="form-group mb--40">
                    <label className="form-label italic">Mật khẩu cũ (*)</label>
                    <input
                      type="password"
                      name="oldPassword"
                      className={
                        "form-control shadow-lg " +
                        (showError(errors, "oldPassword")
                          ? "border-[#FF0000] focusError"
                          : "border-[#cccccc]")
                      }
                      // placeholder="xx"
                      required
                      value={profile.oldPassword || ""}
                      onChange={handleInput}
                    />
                    <small className="text-red-600">
                      {showError(errors, "oldPassword") &&
                        showError(errors, "oldPassword").messages.map(
                          (message, index) => (
                            <div key={index}>&bull; {message}</div>
                          )
                        )}
                    </small>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group mb--40">
                    <label className="form-label italic">
                      Mật khẩu mới (*)
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      className={
                        "form-control shadow-lg " +
                        (showError(errors, "newPassword")
                          ? "border-[#FF0000] focusError"
                          : "border-[#cccccc]")
                      }
                      // placeholder="xx"
                      required
                      value={profile.newPassword || ""}
                      onChange={handleInput}
                    />
                    <small className="text-red-600">
                      {showError(errors, "newPassword") &&
                        showError(errors, "newPassword").messages.map(
                          (message, index) => (
                            <div key={index}>&bull; {message}</div>
                          )
                        )}
                    </small>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group mb--40">
                    <label className="form-label italic">
                      Nhập lại mật khẩu mới (*)
                    </label>
                    <input
                      type="password"
                      name="newPasswordConfirm"
                      className={
                        "form-control shadow-lg " +
                        (showError(errors, "newPasswordConfirm")
                          ? "border-[#FF0000] focusError"
                          : "border-[#cccccc]")
                      }
                      // placeholder="xx"
                      required
                      value={profile.newPasswordConfirm || ""}
                      onChange={handleInput}
                    />
                    <small className="text-red-600">
                      {showError(errors, "newPasswordConfirm") &&
                        showError(errors, "newPasswordConfirm").messages.map(
                          (message, index) => (
                            <div key={index}>&bull; {message}</div>
                          )
                        )}
                    </small>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group mb--0">
                    <button
                      onClick={onSave}
                      className={
                        isLoading
                          ? "axil-btn button__loading loading capitalize"
                          : "axil-btn button__loading capitalize"
                      }
                      disabled={isLoading}
                    >
                      {!isLoading ? "Đổi Mật Khẩu" : ""}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountChangePassword;
