import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getErrors, showError, catchErrors } from "../../common/Error";
import { customerModalValidator } from "../../common/Validation";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { TOAST_MESSAGE } from "../../common/Variable";
import { configToast } from "../../config/ConfigUI";
import UserService from "../../services/user.service";
import logo_white from "../../assets/images/logo-white.jpg";
import logo_black from "../../assets/images/logo-black.jpg";
import "./User.scss";
import Breadcrumb from "../shared/Breadcrumb";

const Register = () => {
  const initData = {
    username: "",
    password: "",
    password_confirmation: "",
    email: "",
    customerName: "",
    phone: "",
    role: 5,
  };

  let navigate = useNavigate();
  const [user, setUser] = useState(initData);
  const [isLoading, setIsLoading] = useState(false);

  // validate
  let [errors, setErrors] = useState([]);
  const [labelInputs, setLabelInputs] = useState([]);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setLabelInputs([name]);
    setUser({ ...user, [name]: value });
  };

  const register = () => {
    const validate = customerModalValidator(user);

    if (validate.error) {
      const errors = getErrors(validate);
      setErrors(errors);
      setIsLoading(false);
    }

    if (!validate.error) {
      setIsLoading(true);
      UserService.register(user)
        .then((res) => {
          setIsLoading(false);
          toast.success(
            "Chúng tôi gửi email kích hoạt tài khoản trong hòm thư của bạn, vui lòng kiểm tra và kích hoạt tài khoản!",
            configToast
          );

          // navigate("/login");
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error(err.response.data.message, configToast);
        });
    }
  };

  // catch error when change input
  useEffect(() => {
    const validate = customerModalValidator(user);
    setErrors(catchErrors(labelInputs, validate, errors));
  }, [user]);

  return (
    <>
      <div>
        <Breadcrumb currentPage="Đăng Ký" />

        <div className="container">
          <div className="row flex justify-center">
            <div className="col-lg-6 col-md-8">
              <div className="user-container">
                <div className="flex items-center justify-between ">
                  <h1 className="title font-bold text-center mb-3">Đăng Ký</h1>
                </div>
                <span className="font-bold">Bạn đã có tài khoản ? </span>
                <Link
                  to="/login"
                  className="text-black font-bold m-0 cursor-pointer"
                >
                  Đăng Nhập
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
                      type="text"
                      name="customerName"
                      className={
                        "form-control " +
                        (showError(errors, "customerName")
                          ? "border-[#FF0000] focusError"
                          : "")
                      }
                      placeholder="Họ và tên"
                      onChange={handleInput}
                      value={user.customerName}
                    />
                    <small className="text-red-600 font-bold">
                      {showError(errors, "customerName") &&
                        showError(errors, "customerName").messages.map(
                          (message, index) => (
                            <div key={index}>&bull; {message}</div>
                          )
                        )}
                    </small>
                  </div>
                  <div className="col-lg-6 col-md-8">
                    <input
                      type="text"
                      name="phone"
                      className={
                        "form-control " +
                        (showError(errors, "phone")
                          ? "border-[#FF0000] focusError"
                          : "")
                      }
                      placeholder="Số điện thoại"
                      onChange={handleInput}
                      value={user.phone}
                    />
                    <small className="text-red-600 font-bold">
                      {showError(errors, "phone") &&
                        showError(errors, "phone").messages.map(
                          (message, index) => (
                            <div key={index}>&bull; {message}</div>
                          )
                        )}
                    </small>
                  </div>
                  <div className="col-lg-12 col-md-8">
                    <input
                      type="text"
                      name="email"
                      className={
                        "form-control " +
                        (showError(errors, "email")
                          ? "border-[#FF0000] focusError"
                          : "")
                      }
                      placeholder="Email"
                      onChange={handleInput}
                      value={user.email}
                    />
                    <small className="text-red-600 font-bold">
                      {showError(errors, "email") &&
                        showError(errors, "email").messages.map(
                          (message, index) => (
                            <div key={index}>&bull; {message}</div>
                          )
                        )}
                    </small>
                  </div>
                  <div className="col-lg-12 col-md-8">
                    <input
                      type="text"
                      name="username"
                      className={
                        "form-control " +
                        (showError(errors, "username")
                          ? "border-[#FF0000] focusError"
                          : "")
                      }
                      placeholder="username"
                      onChange={handleInput}
                      value={user.username}
                    />
                    <small className="text-red-600 font-bold">
                      {showError(errors, "username") &&
                        showError(errors, "username").messages.map(
                          (message, index) => (
                            <div key={index}>&bull; {message}</div>
                          )
                        )}
                    </small>
                  </div>
                  <div className="col-lg-6 col-md-8">
                    <input
                      type="password"
                      name="password"
                      className={
                        "form-control " +
                        (showError(errors, "password")
                          ? "border-[#FF0000] focusError"
                          : "")
                      }
                      placeholder="Mật khẩu"
                      onChange={handleInput}
                      value={user.password}
                    />
                    <small className="text-red-600 font-bold">
                      {showError(errors, "password") &&
                        showError(errors, "password").messages.map(
                          (message, index) => (
                            <div key={index}>&bull; {message}</div>
                          )
                        )}
                    </small>
                  </div>
                  <div className="col-lg-6 col-md-8">
                    <input
                      type="password"
                      name="password_confirmation"
                      className={
                        "form-control " +
                        (showError(errors, "password_confirmation")
                          ? "border-[#FF0000] focusError"
                          : "")
                      }
                      placeholder="Nhập lại mật khẩu"
                      onChange={handleInput}
                      value={user.password_confirmation}
                    />
                    <small className="text-red-600 font-bold">
                      {showError(errors, "password_confirmation") &&
                        showError(errors, "password_confirmation").messages.map(
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
                    onClick={register}
                    className={
                      isLoading
                        ? "button button-contactForm btn-block bg-[#5869da] button__loading loading capitalize"
                        : "button button-contactForm btn-block bg-[#5869da] button__loading capitalize"
                    }
                    disabled={isLoading}
                  >
                    Đăng Ký
                  </button>
                </div>
                {/* <div className="row flex items-center justify-between">
                  <div className="col-lg-6 col-md-8">
                    <div className="social-container">
                      <a href="#" className="social">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" className="social">
                        <i className="fab fa-google-plus-g"></i>
                      </a>
                   
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-8 text-end">
                    <a className="text-black font-bold mt-0 cursor-pointer">
                      Quên mật khẩu?
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      /> */}
    </>
  );
};

export default Register;
