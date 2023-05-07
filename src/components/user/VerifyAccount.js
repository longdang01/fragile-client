import { useState } from "react";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { getErrors, showError, catchErrors } from "../../common/Error";
import { userModalValidator } from "../../common/Validation";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { TOAST_MESSAGE } from "../../common/Variable";
import { configToast } from "../../config/ConfigUI";
import UserService from "../../services/user.service";
import logo_white from "../../assets/images/logo-white.jpg";
import logo_black from "../../assets/images/logo-black.jpg";
import fragile_brand from "../../assets/images/fragile-brand.jpg";
import "./User.scss";
import Breadcrumb from "../shared/Breadcrumb";

const VerifyAccount = () => {
  const { customer, setCustomer, cartNumber, setCartNumber } =
    useOutletContext();
  const { id, token } = useParams();

  // catch error when change input
  useEffect(() => {
    UserService.verifyAccount({
      id: id,
      token: token,
    })
      .then((res) => {
        // toast.success("Xác minh thành công", configToast);

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
        // setIsLoading(false);
        toast.error(err.response.data.message, configToast);
      });
  }, []);

  return (
    <>
      <div>
        <Breadcrumb currentPage="Xác Minh Tài Khoản" />

        <div className="container">
          <div className="row flex justify-center">
            <div className="col-lg-6 col-md-8">
              <div className="user-container">
                <div className="flex items-center justify-between ">
                  {/* <h1 className="title font-bold text-center mb-3">
                    Xác Minh Tài Khoản
                  </h1> */}
                </div>
                {/* <span className="font-bold">Bạn chưa có tài khoản ? </span>
                <Link
                  to="/register"
                  className="text-black font-bold m-0 cursor-pointer"
                >
                  Đăng Ký
                </Link> */}
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
                {/* <div className="row mt-[45px]">
                  <div className="col-lg-6 col-md-8">
                    <input
                      type="text"
                      name="username"
                      className={
                        "form-control " +
                        (showError(errors, "username")
                          ? "border-[#FF0000] focusError"
                          : "")
                      }
                      placeholder="Username"
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
                </div> */}
                {/* <a href="#">Quên mật khẩu?</a> */}
                <div>
                  <h1>Xác Minh Tài Khoản Thành Công</h1>
                  {/* <button
                    onClick={login}
                    className={
                      isLoading
                        ? "button button-contactForm btn-block bg-[#5869da] button__loading loading capitalize"
                        : "button button-contactForm btn-block bg-[#5869da] button__loading capitalize"
                    }
                    disabled={isLoading}
                  >
                    Đăng Nhập
                  </button> */}
                </div>
                <div className="row flex items-center justify-between">
                  <div className="col-lg-6 col-md-8">
                    <div className="social-container">
                      {/* <a href="#" className="social">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" className="social">
                        <i className="fab fa-google-plus-g"></i>
                      </a> */}
                      {/* <a href="#" className="social">
                        <i className="uil uil-user"></i>
                      </a> */}
                    </div>
                  </div>
                  {/* <div className="col-lg-6 col-md-8 text-end">
                    <Link
                      to="/forgot-password"
                      className="text-black font-bold mt-0 cursor-pointer"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div> */}
                </div>
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

export default VerifyAccount;
