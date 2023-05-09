import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  useLocation,
  useParams,
  useOutletContext,
  Link,
} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { TOAST_MESSAGE, PAGE_SIZE } from "../../common/Variable";
import { configToast } from "../../config/ConfigUI";
import CartService from "../../services/cart.service";
import ConfirmDialog from "../shared/ConfirmDialog";
import CartModal from "./CartModal";
import CartDetailService from "../../services/cartDetail.service";
import ProductService from "../../services/product.service";
import Breadcrumb from "../shared/Breadcrumb";

import "./Cart.scss";

const TITLE = "Giỏ Hàng";
const TITLE_NAME = "Giỏ Hàng";
const Cart = () => {
  const { customer, setCustomer, cartNumber, setCartNumber } =
    useOutletContext();
  // const [cartNumber, setCartNumber] = useOutletContext();
  const [cart, setCart] = useState();
  const [cartItem, setCartItem] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [totalItem, setTotalItem] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showType, setShowType] = useState([0]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [itemDelete, setItemDelete] = useState();

  const handleCalcTotalPrice = () => {
    if (cart) {
      let result = 0;
      cart.cartDetails.forEach((item) => {
        if (item.active == 1) {
          if (item.color.discount) {
            if (item.color.discount.symbol == 1) {
              result +=
                Math.round(
                  Number(item.color.price) *
                    ((100 - Number(item.color.discount.value)) / 100)
                ) * item.quantity;
            } else {
              result +=
                Math.round(
                  Number(item.color.price) - Number(item.color.discount.value)
                ) * item.quantity;
            }
          } else {
            result += item.color.price * item.quantity;
          }
        }
      });
      setTotalPrice(result);
    }
  };

  const getCart = () => {
    if (customer) {
      CartService.search({
        customer: customer.customer?._id,
      })
        .then((res) => {
          setCart(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const updateCartDetail = (id, cartItem) => {
    CartDetailService.update(id, cartItem)
      .then((res) => {
        cart.cartDetails = cart.cartDetails.map((item) =>
          item._id == res.data._id ? res.data : item
        );
        setCart(cart);

        setIsLoading(false);
        setShowCartModal(false);
        toast.success(TOAST_MESSAGE.success.update, configToast);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message, configToast);
      });
  };

  const deleteCartDetail = (id) => {
    // let confirm = window.confirm("Bạn có chắc chắn xóa không?");
    // if (confirm) {
    if (!showConfirm) {
      setItemDelete(id);
      setShowConfirm(true);
      return;
    }

    CartDetailService.remove(itemDelete)
      .then((res) => {
        cart.cartDetails = cart.cartDetails.filter(
          (item) => item._id !== itemDelete
        );
        setCart(cart);
        setCartNumber(cartNumber - 1);
        setShowConfirm(false);
        toast.success(TOAST_MESSAGE.success.delete, configToast);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message, configToast);
      });
    // }
  };

  useEffect(() => {
    setIsLoading(true);
    getCart();
  }, []);

  useEffect(() => {
    handleCalcTotalPrice();
    setTotalItem(cart?.cartDetails.filter((item) => item.active == 1).length);
  }, [cart?.cartDetails]);

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
      {/* Start Cart Area  */}
      <Breadcrumb currentPage="Giỏ Hàng" />

      <ConfirmDialog
        onSave={showType.includes(0) || !showType ? deleteCartDetail : null}
        showConfirm={showConfirm}
        title={"Xác nhận xóa?"}
        onClose={() => setShowConfirm(false)}
        isLoading={isLoading}
        setIsLoading={(state) => setIsLoading(state)}
      />

      <CartModal
        showCartModal={showCartModal}
        cartItem={cartItem}
        updateCartDetail={updateCartDetail}
        title={"Cập Nhật Hàng"}
        onClose={() => setShowCartModal(false)}
        isLoading={isLoading}
        setIsLoading={(state) => setIsLoading(state)}
      />

      {cart && customer && (
        <div className="axil-product-cart-area axil-section-gap">
          <div className="container">
            <div className="axil-product-cart-wrap">
              <div className="table-responsive">
                <table className="table axil-product-table axil-cart-table mb--40">
                  <thead>
                    <tr>
                      <th scope="col" className="product-thumbnail"></th>
                      <th scope="col" className="product-title">
                        Sản Phẩm
                      </th>
                      <th scope="col" className="product-subtotal">
                        Thành tiền (VND)
                      </th>
                      <th scope="col" className="product-remove">
                        Trạng Thái
                      </th>
                      <th scope="col" className="product-remove">
                        Tác Vụ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.cartDetails.map((item, index) => (
                      <tr key={index}>
                        <td className="product-thumbnail">
                          <Link to={"/" + item.product.path}>
                            <img src={item.color.images[0].picture} />
                          </Link>
                        </td>
                        <td className="product-title">
                          <Link to={"/" + item.product.path}>
                            {item.product.productName}
                          </Link>
                          <div
                            style={{
                              fontStyle: "italic",
                              color: "grey",
                              fontSize: "14px",
                            }}
                          >
                            {item.color.colorName}/{item.size.sizeName}/x
                            {item.quantity}/
                            {item.color.discount
                              ? item.color.discount.symbol == 1
                                ? Math.round(
                                    Number(item.color.price) *
                                      ((100 -
                                        Number(item.color.discount.value)) /
                                        100)
                                  ).toLocaleString()
                                : Math.round(
                                    Number(item.color.price) -
                                      Number(item.color.discount.value)
                                  ).toLocaleString()
                              : item.color.price.toLocaleString()}{" "}
                          </div>
                        </td>
                        <td>
                          {item.color.discount
                            ? item.color.discount.symbol == 1
                              ? (
                                  Math.round(
                                    Number(item.color.price) *
                                      ((100 -
                                        Number(item.color.discount.value)) /
                                        100)
                                  ) * item.quantity
                                ).toLocaleString()
                              : (
                                  Math.round(
                                    Number(item.color.price) -
                                      Number(item.color.discount.value)
                                  ) * item.quantity
                                ).toLocaleString()
                            : (
                                item.color.price * item.quantity
                              ).toLocaleString()}
                        </td>
                        <td className="product-remove product-remove-status italic">
                          {item.active == 1 ? (
                            <div style={{ color: "green" }}>Đang Chọn Mua</div>
                          ) : (
                            <div style={{ color: "red" }}>Chưa Chọn Mua</div>
                          )}
                        </td>
                        <td className="product-remove ">
                          <div className="flex justify-end">
                            <a
                              href={undefined}
                              className="remove-wishlist updateCart-dropdown-btn"
                              onClick={() => {
                                setCartItem(item);
                                setShowCartModal(true);
                              }}
                            >
                              <i className="fa-regular fa-pen-to-square"></i>
                            </a>
                            <a
                              href={undefined}
                              className="remove-wishlist"
                              onClick={() => deleteCartDetail(item._id)}
                            >
                              <i className="uil uil-trash"></i>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="row">
                <div className="col-xl-5 col-lg-7 offset-xl-7 offset-lg-5">
                  <div className="axil-order-summery mt--80">
                    <h5 className="title mb--20 font-bold text-capitalize">
                      Trong giỏ hàng
                    </h5>
                    <div className="summery-table-wrap">
                      <table className="table summery-table mb--30">
                        <tbody>
                          <tr className="order-subtotal font-bold text-capitalize">
                            <td className="italic">Đang Mua</td>
                            <td className="italic text-right">
                              {totalItem} Sản Phẩm
                            </td>
                          </tr>
                          <tr className="order-total italic text-capitalize">
                            <td className="italic">Thành tiền</td>
                            <td className="order-total-amount italic text-right">
                              {totalPrice && totalPrice.toLocaleString()} VND
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <Link
                      to={"/checkout"}
                      className="axil-btn btn-bg-primary checkout-btn cursor-pointer"
                    >
                      Tiến hành thanh toán
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
