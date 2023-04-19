import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
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

const Login = () => {
  const initData = { username: "", password: "" };
  const [user, setUser] = useState(initData);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  const [loading, setLoading] = useOutletContext();
  // validate
  let [errors, setErrors] = useState([]);
  const [labelInputs, setLabelInputs] = useState([]);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setLabelInputs([name]);
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    const validate = userModalValidator(user);

    if (validate.error) {
      const errors = getErrors(validate);
      setErrors(errors);
    }

    if (!validate.error) {
      setIsLoading(true);
      // setLoading(true);

      UserService.login({ user, page: 2 })
        .then((res) => {
          const user = res.data.user;

          if (user.role == 5 && res.data.customer) {
            localStorage.setItem("TOKEN", user.token);
            localStorage.setItem("ROLE", 5);
            // localStorage.setItem("STAFF", JSON.stringify(res.data.staff));
            localStorage.setItem("CUSTOMER", JSON.stringify(res.data.customer));

            toast.success("Đăng nhập thành công !", configToast);
            navigate("/");
          }
          setIsLoading(false);

          // else {
          //   toast.error("Đăng nhập không thành công !", configToast);
          //   return;
          // }
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error(err.response.data.message, configToast);
        });
    }
  };

  // catch error when change input
  useEffect(() => {
    const validate = userModalValidator(user);
    setErrors(catchErrors(labelInputs, validate, errors));
  }, [user]);

  return (
    <>
      <div>
        <Breadcrumb currentPage="Đăng Nhập" />

        <div className="container">
          <div className="row flex justify-center">
            <div className="col-lg-6 col-md-8">
              <div className="user-container">
                <div className="flex items-center justify-between ">
                  <h1 className="title font-bold text-center mb-3">
                    Đăng Nhập
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
                </div>
                {/* <a href="#">Quên mật khẩu?</a> */}
                <div>
                  <button
                    onClick={login}
                    className={
                      isLoading
                        ? "button button-contactForm btn-block bg-[#5869da] button__loading loading capitalize"
                        : "button button-contactForm btn-block bg-[#5869da] button__loading capitalize"
                    }
                    disabled={isLoading}
                  >
                    Đăng Nhập
                  </button>
                </div>
                <div className="row flex items-center justify-between">
                  <div className="col-lg-6 col-md-8">
                    <div className="social-container">
                      <a href="#" className="social">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" className="social">
                        <i className="fab fa-google-plus-g"></i>
                      </a>
                      {/* <a href="#" className="social">
                        <i className="uil uil-user"></i>
                      </a> */}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-8 text-end">
                    <a className="text-black font-bold mt-0 cursor-pointer">
                      Quên mật khẩu?
                    </a>
                  </div>
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

export default Login;
