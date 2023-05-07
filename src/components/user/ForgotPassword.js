import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { getErrors, showError, catchErrors } from "../../common/Error";
import { emailModalValidator } from "../../common/Validation";
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

const ForgotPassword = () => {
  const initData = { email: "" };
  const [postData, setPostData] = useState(initData);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  const { loading, setLoading } = useOutletContext();
  // validate
  let [errors, setErrors] = useState([]);
  const [labelInputs, setLabelInputs] = useState([]);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setLabelInputs([name]);
    setPostData({ ...postData, [name]: value });
  };

  const resetPassword = () => {
    const validate = emailModalValidator(postData);

    if (validate.error) {
      const errors = getErrors(validate);
      setErrors(errors);
    }

    if (!validate.error) {
      setIsLoading(true);

      UserService.forgotPassword(postData)
        .then((res) => {
          toast.success(
            "Gửi yêu cầu đặt lại mật khẩu thành công, vui lòng kiểm tra hòm thư của bạn !",
            configToast
          );
          // toast.error("loi roi ba", configToast);

          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error(err.response.data.message, configToast);
        });
      // setLoading(true);
    }
  };

  // catch error when change input
  useEffect(() => {
    const validate = emailModalValidator(postData);
    setErrors(catchErrors(labelInputs, validate, errors));
  }, [postData]);

  return (
    <>
      <div>
        <Breadcrumb currentPage="Quên Mật Khẩu" />

        <div className="container">
          <div className="row flex justify-center">
            <div className="col-lg-6 col-md-8">
              <div className="user-container">
                <div className="flex items-center justify-between ">
                  <h1 className="title font-bold text-center mb-3">
                    Quên Mật Khẩu
                  </h1>
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
                <div className="row mt-[45px]">
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
                      value={postData.email}
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
                </div>
                {/* <a href="#">Quên mật khẩu?</a> */}
                <div>
                  <button
                    onClick={resetPassword}
                    className={
                      isLoading
                        ? "button button-contactForm btn-block bg-[#5869da] button__loading loading capitalize"
                        : "button button-contactForm btn-block bg-[#5869da] button__loading capitalize"
                    }
                    disabled={isLoading}
                  >
                    Gửi Yêu Cầu
                  </button>
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
                        <i className="uil uil-postData"></i>
                      </a> */}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-8 text-end">
                    {/* <a className="text-black font-bold mt-0 cursor-pointer">
                      Quên mật khẩu?
                    </a> */}
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

export default ForgotPassword;
