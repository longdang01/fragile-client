import { useEffect, useMemo, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { getErrors, showError, catchErrors } from "../../common/Error";
import { deliveryAddressModalValidator } from "../../common/Validation";
import { COUNTRY_LIST, DELIVERYADDRESS_STATUS } from "../../common/Variable";
import { regions } from "../../common/Region";
import { getOptions } from "../../common/Functions";

import {
  configSelectStyle,
  configSlugify,
  configFullOptionSunEditor,
} from "../../config/ConfigUI";
import Select, { createFilter } from "react-select";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SunEditor from "suneditor-react";

import Modal from "../../utils/modal/Modal";
import UploadService from "../../services/upload.service";
import "./Account.scss";
var slugify = require("slugify");

const AccountDeliveryAddressModal = (props) => {
  const initData = {
    _id: "",
    customer: props.customer?.customer?._id,
    deliveryAddressName: "",
    consigneeName: "",
    consigneePhone: "",
    country: "",
    province: "",
    district: "",
    ward: "",
    active: "",
  };

  const {
    createDeliveryAddress,
    updateDeliveryAddress,
    action,
    show,
    setIsLoading,
  } = props;
  const [deliveryAddress, setDeliveryAddress] = useState(initData);
  const [title, setTitle] = useState("");
  const ref = useRef();

  const [provinces, setProvinces] = useState();
  const [districts, setDistricts] = useState();
  const [ward, setWard] = useState();
  const [optionsProvince, setOptionsProvince] = useState([]);
  const [optionsDistrict, setOptionsDistrict] = useState([]);
  const [optionsWard, setOptionsWard] = useState([]);

  // validate
  let [errors, setErrors] = useState([]);
  const [labelInputs, setLabelInputs] = useState([]);

  const handleInput = (e, label) => {
    // check input tag or select tag
    const { name, value } = e.target ? e.target : { name: label, value: e };
    const state = { [name]: value };

    if (name == "province") {
      if (value) {
        const province = regions.find((item) => item.Id == value);
        const optionsDistrict = getOptions(province.Districts, "Name");
        setDistricts(province.Districts);
        setOptionsDistrict(optionsDistrict);
      } else {
        setOptionsDistrict([]);
        setOptionsWard([]);
      }
    }

    if (name == "district") {
      if (value) {
        const district = districts.find((item) => item.Id == value);

        const optionsWard = getOptions(district.Wards, "Name");
        setOptionsWard(optionsWard);
      } else {
        setOptionsWard([]);
      }
    }

    setLabelInputs([name]);
    setDeliveryAddress({ ...deliveryAddress, ...state });
  };

  const handleImageRemove = (isReset) => {
    // remove input file value
    if (isReset) {
      setDeliveryAddress(initData);
    }
  };

  const onSave = async () => {
    const validate = deliveryAddressModalValidator(deliveryAddress);

    if (validate.error) {
      const errors = getErrors(validate);
      setErrors(errors);
      setIsLoading(false);
    }

    if (!validate.error) {
      setIsLoading(true);

      if (action == 0) createDeliveryAddress(deliveryAddress);
      if (action == 1)
        updateDeliveryAddress(deliveryAddress._id, deliveryAddress);
    }
  };

  useEffect(() => {
    if (!deliveryAddress.province) {
      setDeliveryAddress({ ...deliveryAddress, district: "", ward: "" });
    }
  }, [deliveryAddress.province]);

  useEffect(() => {
    if (!deliveryAddress.district) {
      setDeliveryAddress({ ...deliveryAddress, ward: "" });
    }
  }, [deliveryAddress.district]);

  // catch error when change input
  useEffect(() => {
    const validate = deliveryAddressModalValidator(deliveryAddress);
    setErrors(catchErrors(labelInputs, validate, errors));
  }, [deliveryAddress]);

  useEffect(() => {
    // set options
    const optionsProvince = getOptions(regions, "Name");
    setOptionsProvince(optionsProvince);

    handleImageRemove(true);
    setLabelInputs([]);
    setErrors([]);

    if (action == 1 && props.deliveryAddress._id) {
      setDeliveryAddress(props.deliveryAddress);

      if (props.deliveryAddress.country == 1) {
        const province = regions.find(
          (item) => item.Id == props.deliveryAddress.province
        );

        const optionsDistrict = getOptions(province.Districts, "Name");
        setOptionsDistrict(optionsDistrict);

        const district = province.Districts.find(
          (item) => item.Id == props.deliveryAddress.district
        );
        const optionsWard = getOptions(district.Wards, "Name");
        setOptionsWard(optionsWard);
      }
      setTitle("Cập Nhật Địa Chỉ Nhận Hàng");
    }

    if (action == 0 && !props.deliveryAddress._id) {
      setDeliveryAddress(initData);
      // handleImageRemove(true);
      setTitle("Thêm Địa Chỉ Nhận Hàng");
    }
  }, [show, action, deliveryAddress._id]);

  return (
    <>
      <Modal
        onSave={onSave}
        title={title}
        onClose={props.onClose}
        show={props.show}
        isLoading={props.isLoading}
      >
        <div>
          <div className="grid grid-cols-2 gap-x-5">
            <div className="g-col-12 form-group">
              <label className="form-label italic">Họ Tên (*)</label>
              <input
                type="text"
                name="consigneeName"
                className={
                  "form-control shadow-lg " +
                  (showError(errors, "consigneeName")
                    ? "border-[#FF0000] focusError"
                    : "border-[#cccccc]")
                }
                required
                placeholder="Nguyen Van A"
                value={deliveryAddress.consigneeName}
                onChange={handleInput}
              />
              <small className="text-red-600">
                {showError(errors, "consigneeName") &&
                  showError(errors, "consigneeName").messages.map(
                    (message, index) => <div key={index}>&bull; {message}</div>
                  )}
              </small>
            </div>
            <div className="g-col-12 form-group">
              <label className="form-label italic">Điện Thoại (*)</label>
              <input
                type="text"
                name="consigneePhone"
                className={
                  "form-control shadow-lg " +
                  (showError(errors, "consigneePhone")
                    ? "border-[#FF0000] focusError"
                    : "border-[#cccccc]")
                }
                placeholder="0123457xxx"
                required
                value={deliveryAddress.consigneePhone}
                onChange={handleInput}
              />
              <small className="text-red-600">
                {showError(errors, "consigneePhone") &&
                  showError(errors, "consigneePhone").messages.map(
                    (message, index) => <div key={index}>&bull; {message}</div>
                  )}
              </small>
            </div>
            <div className="g-col-12 form-group">
              <label className="form-label italic">Khu Vực (*)</label>
              <Select
                styles={configSelectStyle}
                name="country"
                className={
                  "shadow-lg border-[2px] " +
                  (showError(errors, "country")
                    ? "border-[#FF0000] focusError"
                    : "border-[#cccccc]")
                }
                onChange={(item) =>
                  handleInput(item ? item.value : "", "country")
                }
                value={
                  deliveryAddress.country && COUNTRY_LIST
                    ? COUNTRY_LIST.find(
                        (item) =>
                          item.value == deliveryAddress.country ||
                          item.value == deliveryAddress.country._id
                      )
                    : null
                }
                options={COUNTRY_LIST}
                placeholder="Chọn Khu Vực"
                filterOption={createFilter({
                  matchFrom: "any",
                  stringify: (option) => `${option.label}`,
                })}
                isSearchable={false}
                isClearable={true}
              />
              <small className="text-red-600">
                {showError(errors, "country") &&
                  showError(errors, "country").messages.map(
                    (message, index) => <div key={index}>&bull; {message}</div>
                  )}
              </small>
            </div>
            <div className="g-col-12 form-group">
              <label className="form-label italic">Trạng Thái (*)</label>
              <Select
                styles={configSelectStyle}
                name="active"
                className={
                  "shadow-lg border-[2px] " +
                  (showError(errors, "active")
                    ? "border-[#FF0000] focusError"
                    : "border-[#cccccc]")
                }
                onChange={(item) =>
                  handleInput(item ? item.value : "", "active")
                }
                value={
                  deliveryAddress.active && DELIVERYADDRESS_STATUS
                    ? DELIVERYADDRESS_STATUS.find(
                        (item) =>
                          item.value == deliveryAddress.active ||
                          item.value == deliveryAddress.active._id
                      )
                    : null
                }
                options={DELIVERYADDRESS_STATUS}
                placeholder="Chọn Trạng Thái"
                filterOption={createFilter({
                  matchFrom: "any",
                  stringify: (option) => `${option.label}`,
                })}
                isSearchable={false}
                isClearable={false}
                isDisabled={props.deliveryAddress.active == 1}
              />
              <small className="text-red-600">
                {showError(errors, "active") &&
                  showError(errors, "active").messages.map((message, index) => (
                    <div key={index}>&bull; {message}</div>
                  ))}
              </small>
            </div>
          </div>
          <div className="g-col-12 form-group">
            <label className="form-label italic">Địa Chỉ (*)</label>
            <input
              type="text"
              name="deliveryAddressName"
              className={
                "form-control shadow-lg " +
                (showError(errors, "deliveryAddressName")
                  ? "border-[#FF0000] focusError"
                  : "border-[#cccccc]")
              }
              placeholder={
                deliveryAddress.country == 1
                  ? "Số Nhà, Xóm, Thôn"
                  : "Ghi Rõ Địa Điểm"
              }
              required
              value={deliveryAddress.deliveryAddressName}
              onChange={handleInput}
            />
            <small className="text-red-600">
              {showError(errors, "deliveryAddressName") &&
                showError(errors, "deliveryAddressName").messages.map(
                  (message, index) => <div key={index}>&bull; {message}</div>
                )}
            </small>
          </div>

          {deliveryAddress.country == 1 && (
            <>
              <div className="g-col-12 form-group">
                <label className="form-label italic">Tỉnh (*)</label>
                <Select
                  styles={configSelectStyle}
                  name="province"
                  className={
                    "shadow-lg border-[2px] " +
                    (showError(errors, "province")
                      ? "border-[#FF0000] focusError"
                      : "border-[#cccccc]")
                  }
                  onChange={(item) => {
                    handleInput(item ? item.value : "", "province");
                  }}
                  value={
                    deliveryAddress.province && optionsProvince
                      ? optionsProvince.find(
                          (item) =>
                            item.value == deliveryAddress.province ||
                            item.value == deliveryAddress.province._id
                        )
                      : null
                  }
                  options={optionsProvince}
                  placeholder="Chọn Tỉnh"
                  filterOption={createFilter({
                    matchFrom: "any",
                    stringify: (option) => `${option.label}`,
                  })}
                  isSearchable={false}
                  isClearable={true}
                />
                <small className="text-red-600">
                  {showError(errors, "province") &&
                    showError(errors, "province").messages.map(
                      (message, index) => (
                        <div key={index}>&bull; {message}</div>
                      )
                    )}
                </small>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="g-col-12 form-group">
                  <label className="form-label italic">Huyện (*)</label>
                  <Select
                    styles={configSelectStyle}
                    name="district"
                    className={
                      "shadow-lg border-[2px] " +
                      (showError(errors, "district")
                        ? "border-[#FF0000] focusError"
                        : "border-[#cccccc]")
                    }
                    onChange={(item) => {
                      handleInput(item ? item.value : "", "district");
                    }}
                    value={
                      deliveryAddress.district && optionsDistrict
                        ? optionsDistrict.find(
                            (item) =>
                              item.value == deliveryAddress.district ||
                              item.value == deliveryAddress.district._id
                          )
                        : null
                    }
                    options={optionsDistrict}
                    placeholder="Chọn Huyện"
                    filterOption={createFilter({
                      matchFrom: "any",
                      stringify: (option) => `${option.label}`,
                    })}
                    isSearchable={false}
                    isClearable={true}
                  />
                  <small className="text-red-600">
                    {showError(errors, "district") &&
                      showError(errors, "district").messages.map(
                        (message, index) => (
                          <div key={index}>&bull; {message}</div>
                        )
                      )}
                  </small>
                </div>
                <div className="g-col-12 form-group">
                  <label className="form-label italic">Xã (*)</label>
                  <Select
                    styles={configSelectStyle}
                    name="ward"
                    className={
                      "shadow-lg border-[2px] " +
                      (showError(errors, "ward")
                        ? "border-[#FF0000] focusError"
                        : "border-[#cccccc]")
                    }
                    onChange={(item) => {
                      handleInput(item ? item.value : "", "ward");
                    }}
                    value={
                      deliveryAddress.ward && optionsWard
                        ? optionsWard.find(
                            (item) =>
                              item.value == deliveryAddress.ward ||
                              item.value == deliveryAddress.ward._id
                          )
                        : null
                    }
                    options={optionsWard}
                    placeholder="Chọn Xã"
                    filterOption={createFilter({
                      matchFrom: "any",
                      stringify: (option) => `${option.label}`,
                    })}
                    isSearchable={false}
                    isClearable={true}
                  />
                  <small className="text-red-600">
                    {showError(errors, "ward") &&
                      showError(errors, "ward").messages.map(
                        (message, index) => (
                          <div key={index}>&bull; {message}</div>
                        )
                      )}
                  </small>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default AccountDeliveryAddressModal;
