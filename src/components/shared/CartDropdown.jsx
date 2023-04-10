import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";
import React, { useEffect } from "react";

const CartDropdown = ({ showCartDropdown, setShowCartDropdown }) => {
  const nodeRef = React.useRef(null);

  return ReactDOM.createPortal(
    <CSSTransition
      in={showCartDropdown}
      timeout={{ enter: 0, exit: 300 }}
      nodeRef={nodeRef}
      // classNames="cart-dropdown-wrap"
      unmountOnExit
    >
      <div className="cart-dropdown-wrap" ref={nodeRef}>
        <div className="cart-dropdown open" id="cart-dropdown">
          <div className="cart-content-wrap">
            <div className="cart-header">
              <h2 className="header-title">Cart review</h2>
              <button
                className="cart-close sidebar-close"
                onClick={() => setShowCartDropdown(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="cart-body">
              <ul className="cart-item-list">
                <li className="cart-item">
                  <div className="item-img">
                    <a href="single-product.html">
                      <img
                        src="template/images/product/electric/product-01.png"
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
                      <span className="rating-number">(64)</span>
                    </div>
                    <h3 className="item-title">
                      <a href="single-product-3.html">Wireless PS Handler</a>
                    </h3>
                    <div className="item-price">
                      <span className="currency-symbol">$</span>155.00
                    </div>
                    <div className="pro-qty item-quantity">
                      <input
                        type="number"
                        className="quantity-input"
                        // value="15"
                      />
                    </div>
                  </div>
                </li>
                <li className="cart-item">
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
                </li>
              </ul>
            </div>
            <div className="cart-footer">
              <h3 className="cart-subtotal">
                <span className="subtotal-title">Subtotal:</span>
                <span className="subtotal-amount">$610.00</span>
              </h3>
              <div className="group-btn">
                <a
                  href="cart.html"
                  className="axil-btn btn-bg-primary viewcart-btn"
                >
                  View Cart
                </a>
                <a
                  href="checkout.html"
                  className="axil-btn btn-bg-secondary checkout-btn"
                >
                  Checkout
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className="closeMask"
          onClick={() => setShowCartDropdown(false)}
        ></div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default CartDropdown;
