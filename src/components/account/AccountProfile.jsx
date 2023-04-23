import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation, useParams, useOutletContext } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { getErrors, showError, catchErrors } from "../../common/Error";
import { profileModalValidator } from "../../common/Validation";
import { toast } from "react-toastify";
import { TOAST_MESSAGE, PAGE_SIZE } from "../../common/Variable";
import { configToast } from "../../config/ConfigUI";
import * as moment from "moment";
import UploadService from "../../services/upload.service";
import CustomerService from "../../services/customer.service";

import "./Account.scss";
import fragile_brand from "../../assets/images/fragile-brand.jpg";
import avt from "../../assets/images/avt.jpg";
const TITLE = "Thông Tin Cá Nhân";

const AccountProfile = (props) => {
  const [customer, setCustomer] = useOutletContext();

  const initData = {
    _id: "",
    user: "",
    customerName: "",
    picture: "",
    dob: "",
    address: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    role: 5,
  };

  const initImage = { preview: "", raw: "" };
  const [profile, setProfile] = useState(initData);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(initImage);
  const ref = useRef();

  // validate
  let [errors, setErrors] = useState([]);
  const [labelInputs, setLabelInputs] = useState([]);

  const handleInput = (e, label) => {
    // check input tag or select tag
    const { name, value } = e.target ? e.target : { name: label, value: e };

    const state = { [name]: value };

    setLabelInputs([name]);
    setProfile({ ...profile, ...state });
  };

  const handleImage = (e) => {
    if (e.target.files.length > 0) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleImageRemove = (isReset) => {
    if (!isReset && ref.current) {
      let confirm = window.confirm("Bạn có chắc chắn xóa ảnh không?");
      if (confirm) {
        ref.current.value = "";
        setImage(initImage);
        setProfile({ ...profile, ["picture"]: "" });
      }
    }

    // remove input file value
    if (isReset && ref.current) {
      ref.current.value = "";
      setImage(initImage);
      setProfile(initData);
    }
  };

  const updateProfile = (id, profile) => {
    document
      .querySelector(".header-top-link > .quick-link")
      .classList.add("hidden");

    CustomerService.update(id, profile)
      .then((res) => {
        customer.customer.customerName = res.data.customerName;
        setCustomer(null);
        // if (res.data) setCustomer(res.data);
        res.data.username = res.data.user?.username;
        res.data.password = res.data.user?.password;
        res.data.email = res.data.user?.email;
        res.data.role = res.data.user?.role;
        setProfile(res.data);
        if (ref.current) ref.current.value = "";
        setImage(initImage);
        setIsLoading(false);
        setTimeout(() => {
          document
            .querySelector(".header-top-link > .quick-link")
            .classList.remove("hidden");
        }, 1000);
        toast.success(TOAST_MESSAGE.success.update, configToast);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message, configToast);
      });
  };

  const onSave = async () => {
    const validate = profileModalValidator(profile);

    if (validate.error) {
      const errors = getErrors(validate);
      setErrors(errors);
      setIsLoading(false);
    }

    if (!validate.error) {
      setIsLoading(true);

      let uploaded;
      if (image.raw) {
        uploaded = await UploadService.upload(image.raw);
      }

      profile.picture =
        uploaded && uploaded.data.data
          ? uploaded.data.data.url
          : profile.picture;

      updateProfile(profile._id, profile);
    }
  };

  useEffect(() => {
    if (profile._id && customer) {
      customer.customer.customerName = profile.customerName;
      setCustomer(customer);
    }
  }, [isLoading]);
  // catch error when change input
  useEffect(() => {
    const validate = profileModalValidator(profile);
    setErrors(catchErrors(labelInputs, validate, errors));
  }, [profile]);

  useEffect(() => {
    handleImageRemove(true);
    setLabelInputs([]);
    setErrors([]);
    if (customer) {
      customer.customer.username = customer.customer.user?.username;
      customer.customer.password = customer.customer.user?.password;
      customer.customer.email = customer.customer.user?.email;
      customer.customer.role = customer.customer.user?.role;

      setProfile(customer.customer);
      // setImage({ ...image, preview: customer.customer.picture, raw: "" });
    }
  }, [profile._id]);
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

      {profile._id && (
        <div className="axil-dashboard-overview">
          <div className="welcome-text">Thông Tin Cá Nhân,</div>
          <div className="flex justify-start">
            <div className="">
              <div className="axil-dashboard-account">
                <form className="account-details-form">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        {/* {profile.picture && ( */}
                        <img
                          src={profile.picture ? profile.picture : avt}
                          className="profile-image"
                        />
                        {/* )} */}
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label className="form-label italic">
                          Họ và tên(*)
                        </label>
                        <input
                          type="text"
                          name="customerName"
                          className={
                            "form-control shadow-lg " +
                            (showError(errors, "customerName")
                              ? "border-[#FF0000] focusError"
                              : "border-[#cccccc]")
                          }
                          required
                          value={profile.customerName || ""}
                          onChange={handleInput}
                        />
                        <small className="text-red-600">
                          {showError(errors, "customerName") &&
                            showError(errors, "customerName").messages.map(
                              (message, index) => (
                                <div key={index}>&bull; {message}</div>
                              )
                            )}
                        </small>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label className="form-label italic">
                          Số điện thoại (*)
                        </label>
                        <input
                          type="text"
                          name="phone"
                          className={
                            "form-control shadow-lg " +
                            (showError(errors, "phone")
                              ? "border-[#FF0000] focusError"
                              : "border-[#cccccc]")
                          }
                          placeholder="Thể thao, Việc làm"
                          required
                          value={profile.phone}
                          onChange={handleInput}
                        />
                        <small className="text-red-600">
                          {showError(errors, "phone") &&
                            showError(errors, "phone").messages.map(
                              (message, index) => (
                                <div key={index}>&bull; {message}</div>
                              )
                            )}
                        </small>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label className="form-label italic">
                          Ngày sinh (*)
                        </label>
                        <input
                          type="date"
                          name="dob"
                          className={
                            "form-control shadow-lg " +
                            (showError(errors, "dob")
                              ? "border-[#FF0000] focusError"
                              : "border-[#cccccc]")
                          }
                          required
                          value={moment(profile.dob).format("YYYY-MM-DD")}
                          onChange={handleInput}
                        />
                        <small className="text-red-600">
                          {showError(errors, "dob") &&
                            showError(errors, "dob").messages.map(
                              (message, index) => (
                                <div key={index}>&bull; {message}</div>
                              )
                            )}
                        </small>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group mb--40">
                        <label className="form-label italic">
                          Username (*)
                        </label>
                        <input
                          type="text"
                          name="username"
                          className={
                            "form-control shadow-lg " +
                            (showError(errors, "username")
                              ? "border-[#FF0000] focusError"
                              : "border-[#cccccc]")
                          }
                          placeholder="Thể thao, Việc làm"
                          required
                          value={profile.username || ""}
                          onChange={handleInput}
                          disabled={true}
                        />
                        <small className="text-red-600">
                          {showError(errors, "username") &&
                            showError(errors, "username").messages.map(
                              (message, index) => (
                                <div key={index}>&bull; {message}</div>
                              )
                            )}
                        </small>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group mb--40">
                        <label className="form-label italic">Email (*)</label>
                        <input
                          type="text"
                          name="email"
                          className={
                            "form-control shadow-lg " +
                            (showError(errors, "email")
                              ? "border-[#FF0000] focusError"
                              : "border-[#cccccc]")
                          }
                          placeholder="Thể thao, Việc làm"
                          required
                          value={profile.email || ""}
                          onChange={handleInput}
                        />
                        <small className="text-red-600">
                          {showError(errors, "email") &&
                            showError(errors, "email").messages.map(
                              (message, index) => (
                                <div key={index}>&bull; {message}</div>
                              )
                            )}
                        </small>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mb--40">
                        <label className="form-label italic">Địa chỉ</label>
                        <input
                          type="text"
                          name="address"
                          className={
                            "form-control shadow-lg " +
                            (showError(errors, "address")
                              ? "border-[#FF0000] focusError"
                              : "border-[#cccccc]")
                          }
                          required
                          value={profile.address}
                          onChange={handleInput}
                        />
                        <small className="text-red-600">
                          {showError(errors, "address") &&
                            showError(errors, "address").messages.map(
                              (message, index) => (
                                <div key={index}>&bull; {message}</div>
                              )
                            )}
                        </small>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mb--40">
                        <label>Ảnh Đại Diện</label>
                        <input
                          type="text"
                          name="picture"
                          className="form-control border-[#cccccc] shadow-lg mb-[8px]"
                          required
                          value={profile.picture || "Chưa có hình ảnh"}
                          readOnly
                        />
                        <input
                          type="file"
                          accept="image/*"
                          className="form-control form-image border-[#cccccc] shadow-lg mb-[8px]"
                          onChange={handleImage}
                          ref={ref}
                          style={{
                            lineHeight: "36px",
                          }}
                        />
                        {image.preview && (
                          <div>
                            <img
                              src={image.preview}
                              alt="Thumb"
                              className="mb-[8px] image-preview"
                            />
                          </div>
                        )}
                        <input
                          type="button"
                          onClick={(e) => handleImageRemove(false)}
                          className="axil-btn axil-btn-remove-image"
                          value="Xóa hình ảnh"
                        />
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
                          {!isLoading ? "Cập nhật thông tin" : ""}
                        </button>
                        {/* <input
                        type="button"
                        // className="axil-btn"
                        value="Cập nhật thông tin"
                        style={{
                          background: "var(--color-primary)",
                          color: "#fff",
                        }}
                        className={
                          isLoading
                            ? !props.actionSub
                              ? "axil-btn button__loading loading"
                              : props.actionSub != -1
                              ? "axil-btn button__loading loading"
                              : "axil-btn button__loading"
                            : "axil-btn button__loading"
                        }
                        disabled={isLoading}
                        onClick={onSave}
                      /> */}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountProfile;
