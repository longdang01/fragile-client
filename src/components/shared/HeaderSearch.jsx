import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";
import React, { useEffect } from "react";

const HeaderSearch = ({ showHeaderSearch, setShowHeaderSearch }) => {
  const nodeRef = React.useRef(null);

  return ReactDOM.createPortal(
    <CSSTransition
      in={showHeaderSearch}
      timeout={{ enter: 0, exit: 0 }}
      // timeout={300}
      nodeRef={nodeRef}
      unmountOnExit
    >
      <div className="header-search-modal-wrap" ref={nodeRef}>
        <div className="header-search-modal" id="header-search-modal">
          <button
            className="card-close sidebar-close"
            onClick={() => setShowHeaderSearch(false)}
          >
            <i className="fas fa-times"></i>
          </button>
          <div className="header-search-wrap">
            <div className="card-header">
              <form action="#">
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control"
                    name="prod-search"
                    id="prod-search"
                    placeholder="Nhập từ khóa tìm kiếm...."
                  />
                  <button
                    type="submit"
                    className="axil-btn btn-bg-primary"
                    style={{ marginTop: "9px", fontSize: "20px" }}
                  >
                    <i className="flaticon-magnifying-glass"></i>
                  </button>
                </div>
              </form>
            </div>
            <div className="card-body">
              <div className="search-result-header">
                <h6 className="title">24 Result Found</h6>
                <a href="shop.html" className="view-all">
                  View All
                </a>
              </div>
              <div className="psearch-results">
                <div className="axil-product-list">
                  <div className="thumbnail">
                    <a href="single-product.html">
                      <img
                        src="./assets/images/product/electric/product-09.png"
                        alt="Yantiti Leather Bags"
                      />
                    </a>
                  </div>
                  <div className="product-content">
                    <div className="product-rating">
                      <span className="rating-icon">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fal fa-star"></i>
                      </span>
                      <span className="rating-number">
                        <span>100+</span> Reviews
                      </span>
                    </div>
                    <h6 className="product-title">
                      <a href="single-product.html">Media Remote</a>
                    </h6>
                    <div className="product-price-variant">
                      <span className="price current-price">$29.99</span>
                      <span className="price old-price">$49.99</span>
                    </div>
                    <div className="product-cart">
                      <a href="cart.html" className="cart-btn">
                        <i className="fal fa-shopping-cart"></i>
                      </a>
                      <a href="wishlist.html" className="cart-btn">
                        <i className="fal fa-heart"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="axil-product-list">
                  <div className="thumbnail">
                    <a href="single-product.html">
                      <img
                        src="./assets/images/product/electric/product-09.png"
                        alt="Yantiti Leather Bags"
                      />
                    </a>
                  </div>
                  <div className="product-content">
                    <div className="product-rating">
                      <span className="rating-icon">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fal fa-star"></i>
                      </span>
                      <span className="rating-number">
                        <span>100+</span> Reviews
                      </span>
                    </div>
                    <h6 className="product-title">
                      <a href="single-product.html">Media Remote</a>
                    </h6>
                    <div className="product-price-variant">
                      <span className="price current-price">$29.99</span>
                      <span className="price old-price">$49.99</span>
                    </div>
                    <div className="product-cart">
                      <a href="cart.html" className="cart-btn">
                        <i className="fal fa-shopping-cart"></i>
                      </a>
                      <a href="wishlist.html" className="cart-btn">
                        <i className="fal fa-heart"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="closeMask"
          onClick={() => setShowHeaderSearch(false)}
        ></div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default HeaderSearch;
