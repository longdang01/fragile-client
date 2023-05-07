import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ProductService from "../../services/product.service";
import "./HeaderSearch.scss";

const HeaderSearch = ({ showHeaderSearch, setShowHeaderSearch }) => {
  const nodeRef = React.useRef(null);
  const [searchData, setSearchData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    setIsLoading(true);

    ProductService.search({
      searchData: searchData,
    })
      .then((res) => {
        setProducts(res.data.products);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    setProducts([]);
    setIsLoading(false);

    // if (searchData) {
    //   getProducts();
    // }
  }, [searchData]);

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
              {/* <form action="#"> */}
              <div className="input-group flex items-center justify-between">
                <div style={{ flex: "2" }}>
                  <input
                    type="search"
                    className="form-control"
                    name="prod-search"
                    id="prod-search"
                    placeholder="Nhập từ khóa tìm kiếm...."
                    onChange={(e) => setSearchData(e.target.value)}
                    value={searchData}
                    style={{
                      width: "100%",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  />
                  <button
                    type="submit"
                    className="axil-btn btn-bg-primary"
                    style={{ marginTop: "8px", fontSize: "20px" }}
                  >
                    <i
                      className="flaticon-magnifying-glass"
                      style={{ color: "black" }}
                    ></i>
                  </button>
                </div>
                <div>
                  <div className="product-cart">
                    <a
                      href={undefined}
                      // className="cart-btn mb-0 btn-header-search"
                      onClick={getProducts}
                      className={
                        isLoading
                          ? "cart-btn mb-0 btn-header-search button button-contactForm btn-block bg-[#5869da] button__loading loading capitalize"
                          : "cart-btn mb-0 btn-header-search button button-contactForm btn-block bg-[#5869da] button__loading capitalize"
                      }
                      disabled={isLoading}
                    >
                      {!isLoading && <i className="uil uil-search"></i>}
                    </a>
                  </div>
                </div>
              </div>
              {/* </form> */}
            </div>
            {searchData && products.length > 0 && !isLoading && (
              <div className="card-body">
                <div className="search-result-header">
                  <h6 className="title">
                    {products.length} Sản Phẩm Đã Tìm Thấy
                  </h6>
                  <Link
                    to={"/search?searchTerm=" + searchData}
                    className="view-all"
                    onClick={() => setShowHeaderSearch(false)}
                  >
                    Xem Tất Cả
                  </Link>
                </div>
                <div className="psearch-results">
                  {products &&
                    products.map((product, index) => (
                      <div key={index} className="axil-product-list">
                        <div className="thumbnail">
                          <Link
                            to={"/" + product.path}
                            onClick={() => setShowHeaderSearch(false)}
                          >
                            <img src={product.colors[0].images[0].picture} />
                          </Link>
                        </div>
                        <div className="product-content">
                          {/* <div className="product-rating">
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
                          </div> */}
                          <h6 className="product-title">
                            <Link
                              to={"/" + product.path}
                              onClick={() => setShowHeaderSearch(false)}
                            >
                              {product.productName}
                            </Link>
                          </h6>
                          <div className="product-price-variant">
                            <span className="price current-price italic">
                              {product.subCategory.subCategoryName}
                            </span>
                            {/* <span className="price old-price">$49.99</span> */}
                          </div>
                          <div className="product-cart">
                            <Link
                              to={"/" + product.path}
                              onClick={() => setShowHeaderSearch(false)}
                              className="cart-btn mb-0"
                            >
                              <i className="uil uil-shopping-bag"></i>
                              {/* <i className="fal fa-shopping-cart"></i> */}
                            </Link>
                            {/* <a href="wishlist.html" className="cart-btn">
                              <i className="fal fa-heart"></i>
                            </a> */}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
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
