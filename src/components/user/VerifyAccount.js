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
  const [status, setStatus] = useState(false);

  // catch error when change input
  useEffect(() => {
    UserService.verifyAccount({
      id: id,
      token: token,
    })
      .then((res) => {
        // toast.success("Xác minh thành công", configToast);
        setTimeout(() => {
          setStatus(true);
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
          {status ? (
            <h1 className="font-bold italic">Xác Minh Tài Khoản Thành Công!</h1>
          ) : (
            <h1 className="font-bold italic">Xác Minh Tài Khoản Thất Bại!</h1>
          )}
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
