import { CSSTransition } from "react-transition-group";

import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { TOAST_MESSAGE, PAGE_SIZE } from "../../common/Variable";
import { configToast } from "../../config/ConfigUI";
import CartService from "../../services/cart.service";
import ConfirmDialog from "../shared/ConfirmDialog";
import CartDetailService from "../../services/cartDetail.service";

const CartDropdown = ({
  showCartDropdown,
  setShowCartDropdown,
  customer,
  setCartNumber,
}) => {
  const [cart, setCart] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showType, setShowType] = useState([0]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemDelete, setItemDelete] = useState();

  const nodeRef = React.useRef(null);

  const handleCalcTotalPrice = () => {
    if (cart) {
      let result = 0;
      cart.cartDetails.forEach((item) => {
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
        setCartNumber(cart.cartDetails.length);
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
  }, [showCartDropdown]);

  useEffect(() => {
    handleCalcTotalPrice();
  }, [cart]);

  return ReactDOM.createPortal(
    <CSSTransition
      in={showCartDropdown}
      timeout={{ enter: 0, exit: 300 }}
      nodeRef={nodeRef}
      // classNames="cart-dropdown-wrap"
      unmountOnExit
    >
      <>
        <ConfirmDialog
          onSave={showType.includes(0) || !showType ? deleteCartDetail : null}
          showConfirm={showConfirm}
          title={"Xác nhận xóa?"}
          onClose={() => setShowConfirm(false)}
          isLoading={isLoading}
          setIsLoading={(state) => setIsLoading(state)}
        />

        <div className="cart-dropdown-wrap" ref={nodeRef}>
          <div className="cart-dropdown open" id="cart-dropdown">
            <div className="cart-content-wrap">
              {cart && !isLoading && (
                <>
                  <div className="cart-header">
                    <h2 className="header-title font-bold">Giỏ Hàng</h2>
                    <button
                      className="cart-close sidebar-close"
                      onClick={() => setShowCartDropdown(false)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <div className="cart-body overflow-y-scroll">
                    <ul className="cart-item-list">
                      {cart.cartDetails.map((item, index) => (
                        <li className="cart-item" key={index}>
                          <div className="item-img">
                            <Link
                              to={"/" + item.product.path}
                              onClick={() => setShowCartDropdown(false)}
                            >
                              <img src={item.color.images[0].picture} />
                            </Link>
                            <button
                              className="close-btn"
                              onClick={() => deleteCartDetail(item._id)}
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                          <div className="item-content">
                            <h3 className="item-title">
                              <Link
                                to={"/" + item.product.path}
                                onClick={() => setShowCartDropdown(false)}
                                className="font-bold"
                              >
                                {item.product.productName}
                              </Link>
                            </h3>
                            <div
                              className="item-price italic font-bold"
                              style={{ color: "grey" }}
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
                            {/* <div className="pro-qty item-quantity">
                              <input
                                type="number"
                                className="quantity-input"
                              />
                            </div> */}
                          </div>
                        </li>
                      ))}
                      {/* <li className="cart-item">
                  <div className="item-img">
                    <a href="single-product-2.html">
                      <img
                        src="template/images/product/electric/product-02.png"
                        alt="Commodo Blown Lamp"
                      />
                    </a>
                    <button className="close-btn">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <div className="item-content">
                    <div className="product-rating">
                      <span className="icon">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </span>
                      <span className="rating-number">(4)</span>
                    </div>
                    <h3 className="item-title">
                      <a href="single-product-2.html">
                        Gradient Light Keyboard
                      </a>
                    </h3>
                    <div className="item-price">
                      <span className="currency-symbol">$</span>255.00
                    </div>
                    <div className="pro-qty item-quantity">
                      <input
                        type="number"
                        className="quantity-input"
                        // value="5"
                      />
                    </div>
                  </div>
                </li>
                <li className="cart-item">
                  <div className="item-img">
                    <a href="single-product-3.html">
                      <img
                        src="template/images/product/electric/product-03.png"
                        alt="Commodo Blown Lamp"
                      />
                    </a>
                    <button className="close-btn">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <div className="item-content">
                    <div className="product-rating">
                      <span className="icon">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </span>
                      <span className="rating-number">(6)</span>
                    </div>
                    <h3 className="item-title">
                      <a href="single-product.html">HD CC Camera</a>
                    </h3>
                    <div className="item-price">
                      <span className="currency-symbol">$</span>200.00
                    </div>
                    <div className="pro-qty item-quantity">
                      <input
                        type="number"
                        className="quantity-input"
                        // value="100"
                      />
                    </div>
                  </div>
                </li> */}
                    </ul>
                  </div>
                  <div className="cart-footer">
                    {/* <h3 className="cart-subtotal">
                      <span
                        className="subtotal-title font-bold"
                        style={{ fontSize: "16px" }}
                      >
                        Tổng Tiền:
                      </span>
                      <span
                        className="subtotal-amount"
                        style={{ fontSize: "16px" }}
                      >
                        {totalPrice && totalPrice.toLocaleString()} VND cho{" "}
                        {cart?.cartDetails.length} sản phẩm
                      </span>
                    </h3> */}
                    <div className="group-btn">
                      <Link
                        to="/cart"
                        onClick={() => setShowCartDropdown(false)}
                        className="axil-btn btn-bg-primary viewcart-btn"
                      >
                        Xem Giỏ Hàng
                      </Link>
                      <Link
                        to="/checkout"
                        onClick={() => setShowCartDropdown(false)}
                        className="axil-btn btn-bg-secondary checkout-btn"
                      >
                        Thanh Toán
                      </Link>
                    </div>
                  </div>
                </>
              )}

              {!customer && (
                <span className="font-bold">Đăng nhập để xem giỏ hàng</span>
              )}
            </div>
          </div>
          <div
            className="closeMask"
            onClick={() => setShowCartDropdown(false)}
          ></div>
        </div>
      </>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default CartDropdown;
