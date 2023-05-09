import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useParams, useOutletContext } from "react-router-dom";
import { getErrors, showError, catchErrors } from "../../common/Error";
import { cartDetailModalValidator } from "../../common/Validation";
import {
  configToast,
  configSelectStyle,
  configSlugify,
  configFullOptionSunEditor,
} from "../../config/ConfigUI";
import { CARTDETAIL_STATUS } from "../../common/Variable";
import { toast } from "react-toastify";
import { getOptions } from "../../common/Functions";
import Select, { createFilter } from "react-select";
import Modal from "../../utils/modal/Modal";
import ProductService from "../../services/product.service";
import ColorService from "../../services/color.service";
import SizeService from "../../services/size.service";
import CartDetailService from "../../services/cartDetail.service";

const CartModal = (props) => {
  const { customer } = useOutletContext();

  const { updateCartDetail, setIsLoading } = props;
  const [cartItem, setCartItem] = useState();
  const [variant, setVariant] = useState();

  // validate
  let [errors, setErrors] = useState([]);
  const [labelInputs, setLabelInputs] = useState([]);

  const [optionsColor, setOptionsColor] = useState([]);
  const [optionsSize, setOptionsSize] = useState([]);

  const handleInput = (e, label, type) => {
    // type: 1: invoice, 2: cartItem
    // check input tag or select tag
    const { name, value } = e.target ? e.target : { name: label, value: e };

    const state =
      name == "quantity" && value == 0
        ? { [name]: 1 }
        : name == "quantity" && value > cartItem?.size.quantity
        ? { [name]: cartItem?.size.quantity }
        : { [name]: value };

    setLabelInputs([name]);
    setCartItem({ ...cartItem, ...state });
  };

  const handleSearch = async (data, obj) => {
    // 1: color, 2: size
    if (obj == 1) {
      const color = data ? await getColor(data) : "";
      setCartItem({
        ...cartItem,
        color: color,
        size: color.sizes[0],
        price: color.discount
          ? color.discount.symbol == 1
            ? Math.round(
                Number(color.price) *
                  ((100 - Number(color.discount.value)) / 100)
              )
            : Math.round(Number(color.price) - Number(color.discount.value))
          : Number(color.price),
      });
      setLabelInputs(["color"]);
    }

    if (obj == 2) {
      const size = data ? await getSize(data) : "";
      setCartItem({ ...cartItem, size: size });
      setLabelInputs(["size"]);
    }
  };

  const getColor = async (id) => {
    const data = await ColorService.getById(id);
    return data.data;
  };

  const getSize = async (id) => {
    const data = await SizeService.getById(id);
    return data.data;
  };

  const getByVariant = async () => {
    if (customer && customer.customer && cartItem) {
      CartDetailService.getByVariant({
        customer: customer?.customer?._id,
        product: cartItem.product?._id,
        color: cartItem.color?._id,
        size: cartItem.size?._id,
      })
        .then((res) => {
          setVariant(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const onSave = () => {
    setIsLoading(true);

    if (
      variant &&
      (variant.color != props.cartItem.color._id ||
        variant.size != props.cartItem.size._id)
    ) {
      toast.error("Phân loại hàng đã có trong giỏ hàng", configToast);
      setIsLoading(false);
      return;
    }
    updateCartDetail(cartItem._id, cartItem);
  };

  useEffect(() => {
    const optionsSize = getOptions(cartItem?.color?.sizes, "sizeName");
    setOptionsSize(optionsSize);
  }, [cartItem?.color]);

  useEffect(() => {
    if (props.cartItem)
      setCartItem({
        ...props.cartItem,
        price: props.cartItem?.color.discount
          ? props.cartItem?.color.discount.symbol == 1
            ? Math.round(
                Number(props.cartItem?.color.price) *
                  ((100 - Number(props.cartItem?.color.discount.value)) / 100)
              )
            : Math.round(
                Number(props.cartItem?.color.price) -
                  Number(props.cartItem?.color.discount.value)
              )
          : Number(props.cartItem?.color.price),
      });
    // setCartItem(props.cartItem);

    const optionsColor = getOptions(
      props.cartItem?.product.colors,
      "colorName"
    );
    setOptionsColor(optionsColor);
  }, [props.showCartModal, props.cartItem]);

  useEffect(() => {
    if (customer) {
      getByVariant();
    }
  }, [customer, cartItem?.color, cartItem?.size]);

  return (
    <>
      <Modal
        onSave={onSave}
        onClose={props.onClose}
        title={props.title}
        show={props.showCartModal}
        isLoading={props.isLoading}
      >
        <div style={{ fontSize: "14px" }}>
          {cartItem && (
            <div>
              <div className="g-col-12 form-group ">
                <label className="form-label italic font-bold">Thông tin</label>
                <input
                  type="text"
                  name="productName"
                  className="form-control border-[black] shadow-lg mb-[8px] font-bold"
                  required
                  value={cartItem.product?.productName}
                  readOnly
                />
                <small></small>
              </div>
              <div className="g-col-12 form-group">
                <label className="form-label italic">Trạng Thái (*)</label>
                <div>
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
                      cartItem.active && CARTDETAIL_STATUS
                        ? CARTDETAIL_STATUS.find(
                            (item) => item.value == cartItem.active
                          )
                        : null
                    }
                    options={CARTDETAIL_STATUS}
                    placeholder="Chọn màu sắc"
                    filterOption={createFilter({
                      matchFrom: "any",
                      stringify: (option) => `${option.label}`,
                    })}
                    isSearchable={false}
                    isClearable={false}
                  />
                </div>
                <small className="text-red-600">
                  {showError(errors, "active") &&
                    showError(errors, "active").messages.map(
                      (message, index) => (
                        <div key={index}>&bull; {message}</div>
                      )
                    )}
                </small>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="g-col-12 form-group">
                  <label className="form-label italic">Màu sắc (*)</label>
                  <div className="flex items-center justify-between">
                    <div style={{ width: "242px" }}>
                      <Select
                        styles={configSelectStyle}
                        name="color"
                        className={
                          "shadow-lg border-[2px] " +
                          (showError(errors, "color")
                            ? "border-[#FF0000] focusError"
                            : "border-[#cccccc]")
                        }
                        onChange={(item) =>
                          handleSearch(item ? item.value : "", 1)
                        }
                        value={
                          cartItem.color && optionsColor
                            ? optionsColor.find(
                                (item) =>
                                  item.value == cartItem.color ||
                                  item.value == cartItem.color._id
                              )
                            : null
                        }
                        options={optionsColor}
                        placeholder="Chọn màu sắc"
                        filterOption={createFilter({
                          matchFrom: "any",
                          stringify: (option) => `${option.label}`,
                        })}
                        isSearchable={false}
                        isClearable={false}
                      />
                    </div>
                    <div
                      className="color-group__item ml-2"
                      style={{
                        background: cartItem.color?.hex
                          ? cartItem.color?.hex
                          : "transparent",
                      }}
                    ></div>
                  </div>
                  <small className="text-red-600">
                    {showError(errors, "color") &&
                      showError(errors, "color").messages.map(
                        (message, index) => (
                          <div key={index}>&bull; {message}</div>
                        )
                      )}
                  </small>
                </div>
                <div className="g-col-12 form-group">
                  <label className="form-label italic">Kích cỡ (*)</label>
                  <Select
                    styles={configSelectStyle}
                    name="size"
                    className={
                      "shadow-lg border-[2px] " +
                      (showError(errors, "size")
                        ? "border-[#FF0000] focusError"
                        : "border-[#cccccc]")
                    }
                    onChange={(item) => handleSearch(item ? item.value : "", 2)}
                    value={
                      cartItem.size && optionsSize
                        ? optionsSize.find(
                            (item) =>
                              item.value == cartItem.size ||
                              item.value == cartItem.size._id
                          )
                        : null
                    }
                    options={optionsSize}
                    placeholder="Chọn kích cỡ"
                    filterOption={createFilter({
                      matchFrom: "any",
                      stringify: (option) => `${option.label}`,
                    })}
                    isSearchable={false}
                    isClearable={false}
                  />
                  <small className="text-red-600">
                    {showError(errors, "size") &&
                      showError(errors, "size").messages.map(
                        (message, index) => (
                          <div key={index}>&bull; {message}</div>
                        )
                      )}
                  </small>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="g-col-12 form-group">
                  <label className="form-label italic">
                    Số Lượng (*)
                    {cartItem.size && " (còn " + cartItem.size.quantity}
                  </label>
                  <input
                    type="number"
                    min="1"
                    name="quantity"
                    className={
                      "form-control shadow-lg " +
                      (showError(errors, "quantity")
                        ? "border-[#FF0000] focusError"
                        : "border-[#cccccc]")
                    }
                    placeholder="/the-thao, /viec-lam"
                    required
                    value={cartItem.quantity}
                    onChange={(e) => handleInput(e, "", 2)}
                  />
                  <small className="text-red-600">
                    {showError(errors, "quantity") &&
                      showError(errors, "quantity").messages.map(
                        (message, index) => (
                          <div key={index}>&bull; {message}</div>
                        )
                      )}
                  </small>
                </div>
                <div className="g-col-12 form-group">
                  <label className="form-label italic">
                    Giá Bán (*)
                    {cartItem.color?.discount &&
                      ` (giảm giá ${
                        cartItem.color?.discount.value +
                        (cartItem.color?.discount.symbol == 1 ? "%" : "K")
                      })`}
                  </label>
                  <input
                    type="text"
                    name="price"
                    className={
                      "form-control shadow-lg " +
                      (showError(errors, "price")
                        ? "border-[#FF0000] focusError"
                        : "border-[#cccccc]")
                    }
                    placeholder="/the-thao, /viec-lam"
                    required
                    value={cartItem.price ? cartItem.price : ""}
                    onChange={(e) => handleInput(e, "", 2)}
                    readOnly
                  />
                  <small className="text-red-600">
                    {showError(errors, "price") &&
                      showError(errors, "price").messages.map(
                        (message, index) => (
                          <div key={index}>&bull; {message}</div>
                        )
                      )}
                  </small>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default CartModal;
