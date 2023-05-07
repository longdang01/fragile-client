import { useState, useEffect, useRef } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import ProductService from "../../services/product.service";
import "./Home.scss";

const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const getBestSeller = () => {
    ProductService.getBestSeller()
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeImage = (e, color) => {
    const pictureElm = e.target
      .closest(".thumbnail")
      .querySelector(".thumbnail-picture");
    pictureElm.src = color.images[0].picture;
  };

  useEffect(() => {
    getBestSeller();
  }, []);

  return (
    <>
      <div className="best-seller-page">
        <div className="axil-product-area bg-color-white axil-section-gap pb--0">
          <div className="container">
            <div className="product-area pb--20">
              <div className="axil-isotope-wrapper">
                <div className="product-isotope-heading">
                  <div className="section-title-wrapper">
                    <span className="title-highlighter highlighter-primary">
                      <i className="fa-solid fa-bag-shopping"></i> Sản phẩm Bán
                      Chạy
                    </span>
                    <h2 className="title">BEST SELLER</h2>
                  </div>
                </div>
                <div className="row row--15" style={{ height: "auto" }}>
                  {products &&
                    products.map((product, index) => (
                      <div
                        key={index}
                        current-page="currentPage"
                        className="col-xl-3 col-lg-4 col-sm-6"
                      >
                        <div className="axil-product product-style-one has-color-pick mt--40">
                          <div className="thumbnail">
                            <Link
                              to={"/" + product.path}
                              className="thumbnail-link cursor-pointer"
                            >
                              <img
                                src={product.colors[0].images[0].picture}
                                className="thumbnail-picture"
                              />
                            </Link>
                            <div className="label-block label-right">
                              {product.colors.find(
                                (color) => color.discount
                              ) && <div className="product-badget">SALE</div>}
                            </div>
                            <div className="color-wrapper">
                              {product.colors &&
                                product.colors.map((color, index) => (
                                  <div
                                    key={index}
                                    className="label-block label-left rounded"
                                    style={{
                                      backgroundColor: color.hex,
                                      width: "49px",
                                      height: "23px",
                                    }}
                                    onMouseEnter={(e) => {
                                      handleChangeImage(e, color);
                                    }}
                                    // onMouseLeave={() => setIsShown(false)}>
                                  >
                                    <div
                                      className="product-badget rounded"
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: color.hex,
                                        color:
                                          color.colorName.toLowerCase() ==
                                            "màu trắng" && "black",
                                        width: "49px",
                                        height: "23px",
                                        border: "2px solid black",
                                        cursor: "default",
                                      }}
                                    >
                                      {color.discount && "SALE"}
                                    </div>
                                  </div>
                                ))}
                              {/* <div className="label-block label-left">
                            <div className="product-badget"
                            >SALE1</div>
                          </div> */}
                            </div>
                            <div className="product-hover-action">
                              <ul className="cart-action">
                                <li className="select-option">
                                  <Link
                                    to={"/" + product.path}
                                    className="cursor-pointer"
                                  >
                                    Mua hàng
                                  </Link>
                                </li>
                                {/* <li className="quickview">
                    <a
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#quick-view-modal"
                      ><i className="far fa-eye"></i
                    ></a>
                  </li> */}
                              </ul>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="inner">
                              <h5 className="title">
                                <Link
                                  to={"/" + product.path}
                                  className="cursor-pointer"
                                >
                                  {product.productName}
                                </Link>
                              </h5>
                              <div className="product-price-variant">
                                <span className="price current-price italic">
                                  {Math.min(
                                    ...product.colors.map((color) =>
                                      color.discount
                                        ? color.discount.symbol == 2
                                          ? Math.round(
                                              Number(color.price) -
                                                Number(color.discount.value)
                                            )
                                          : Math.round(
                                              Number(color.price) *
                                                ((100 -
                                                  Number(
                                                    color.discount.value
                                                  )) /
                                                  100)
                                            )
                                        : color.price
                                    )
                                  ) ==
                                  Math.max(
                                    ...product.colors.map((color) =>
                                      color.discount
                                        ? color.discount.symbol == 2
                                          ? Math.round(
                                              Number(color.price) -
                                                Number(color.discount.value)
                                            )
                                          : Math.round(
                                              Number(color.price) *
                                                ((100 -
                                                  Number(
                                                    color.discount.value
                                                  )) /
                                                  100)
                                            )
                                        : color.price
                                    )
                                  )
                                    ? Math.max(
                                        ...product.colors.map((color) =>
                                          color.discount
                                            ? color.discount.symbol == 2
                                              ? Math.round(
                                                  Number(color.price) -
                                                    Number(color.discount.value)
                                                )
                                              : Math.round(
                                                  Number(color.price) *
                                                    ((100 -
                                                      Number(
                                                        color.discount.value
                                                      )) /
                                                      100)
                                                )
                                            : color.price
                                        )
                                      ).toLocaleString()
                                    : Math.min(
                                        ...product.colors.map((color) =>
                                          color.discount
                                            ? color.discount.symbol == 2
                                              ? Math.round(
                                                  Number(color.price) -
                                                    Number(color.discount.value)
                                                )
                                              : Math.round(
                                                  Number(color.price) *
                                                    ((100 -
                                                      Number(
                                                        color.discount.value
                                                      )) /
                                                      100)
                                                )
                                            : color.price
                                        )
                                      ).toLocaleString() +
                                      " - " +
                                      Math.max(
                                        ...product.colors.map((color) =>
                                          color.discount
                                            ? color.discount.symbol == 2
                                              ? Math.round(
                                                  Number(color.price) -
                                                    Number(color.discount.value)
                                                )
                                              : Math.round(
                                                  Number(color.price) *
                                                    ((100 -
                                                      Number(
                                                        color.discount.value
                                                      )) /
                                                      100)
                                                )
                                            : color.price
                                        )
                                      ).toLocaleString()}{" "}
                                  VND
                                  {/* 350000 - 450000 VND */}
                                </span>
                              </div>
                              {/* <div className="color-variant-wrapper">
                            <ul className="color-variant">
                              {product.colors &&
                                product.colors.map((color, index) => (
                                  <li key={index}>
                                    <span style={{ borderColor: color.hex }}>
                                      <span
                                        className="color"
                                        style={{ backgroundColor: color.hex }}
                                      ></span>
                                    </span>
                                  </li>
                                ))}
                            </ul>
                          </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestSeller;
