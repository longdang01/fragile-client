import { useLocation, useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { TOAST_MESSAGE, PAGE_SIZE } from "../../common/Variable";
import { configToast } from "../../config/ConfigUI";
import ProductService from "../../services/product.service";
import CartDetailService from "../../services/cartDetail.service";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import "./Product.scss";

const TITLE = "Chi Tiết Sản Phẩm";

const ProductDetail = () => {
  const { customer, setCustomer, cartNumber, setCartNumber } =
    useOutletContext();
  // const { cartNumber, setCartNumber } = useOutletContext();

  const { path } = useParams();
  const swiperRef = useRef(null);

  const [tab, setTab] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState();
  const [isLoading, setIsLoading] = useState(false);
  //set default

  const [variant, setVariant] = useState();
  const [product, setProduct] = useState();
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityPicker = (e, action) => {
    if (!e && action == -1 && quantity > 1) setQuantity(Number(quantity) - 1);
    if (!e && action == 1) {
      if (!variant) {
        if (quantity < size.quantity) {
          setQuantity(Number(quantity) + 1);
        } else {
          toast.error(`Chọn tối đa ${size.quantity} sản phẩm`, configToast);
        }
      }

      if (variant) {
        if (quantity < size.quantity - variant.quantity) {
          setQuantity(Number(quantity) + 1);
        } else {
          toast.error(
            `Trong giỏ đã có ${variant.quantity} sản phẩm, chọn tối đa ${
              size.quantity - variant.quantity
            } sản phẩm`,
            configToast
          );
        }
      }
    }

    if (e && action == 0) {
      if (!variant) {
        if (Number(e.target.value) > size.quantity) {
          setQuantity(size.quantity);
          toast.error(`Chọn tối đa ${size.quantity} sản phẩm`, configToast);
        } else {
          setQuantity(Number(e.target.value) == 0 ? 1 : e.target.value);
        }
      }

      if (variant) {
        if (Number(e.target.value) > size.quantity - variant.quantity) {
          const qty = size.quantity - variant.quantity;
          setQuantity(qty == 0 ? 1 : qty);
          toast.error(
            `Trong giỏ đã có ${variant.quantity} sản phẩm, chọn tối đa ${
              size.quantity - variant.quantity
            } sản phẩm`,
            configToast
          );
        } else {
          setQuantity(Number(e.target.value) == 0 ? 1 : e.target.value);
        }
      }
    }
  };

  const getByPath = () => {
    ProductService.getByPath({
      path: path,
    })
      .then((res) => {
        setProduct(res.data);
        setColor(res.data.colors[0]);
        setSize(res.data.colors[0].sizes[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getByVariant = async () => {
    if (customer && customer.customer && product && color && size) {
      CartDetailService.getByVariant({
        customer: customer?.customer?._id,
        product: product?._id,
        color: color?._id,
        size: size?._id,
      })
        .then((res) => {
          setVariant(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const addToCart = () => {
    // cart_id, product, color, size, quantity, maxquantity?

    if (!variant && quantity > size.quantity) {
      toast.error(`Chọn tối đa ${size.quantity} sản phẩm`, configToast);
      return;
    }

    if (variant && quantity > size.quantity - variant.quantity) {
      toast.error(
        `Trong giỏ đã có ${variant.quantity} sản phẩm, chọn tối đa ${
          size.quantity - variant.quantity
        } sản phẩm`,
        configToast
      );
      return;
    }

    if (customer && customer.customer) {
      setIsLoading(true);
      CartDetailService.create({
        customer: customer.customer?._id,
        product: product?._id,
        color: color?._id,
        size: size?._id,
        quantity: quantity,
      })
        .then((res) => {
          setIsLoading(false);
          if (!variant) setCartNumber(cartNumber + 1);
          toast.success("Đã thêm vào giỏ hàng", configToast);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          toast.error("Thêm thất bại", configToast);
        });
    } else {
      toast.error("Đăng nhập để thêm sản phẩm vào giỏ hàng", configToast);
    }
  };

  useEffect(() => {
    if (path) getByPath();
  }, [path]);

  useEffect(() => {
    getByVariant();
  }, [customer, product, color, size, isLoading]);

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
      {product && color && (
        <div className="axil-single-product-area axil-section-gap pb--0 bg-color-white product-detail-wrap">
          <div className="single-product-thumb mb--40">
            <div className="container">
              <div className="row">
                <div className="col-lg-7 mb--40">
                  <div className="row">
                    <div className="col-lg-10 order-lg-2">
                      <div className="single-product-thumbnail-wrap zoom-gallery">
                        <div className="single-product-thumbnail product-large-thumbnail-3 axil-product">
                          {/* Start swiper */}
                          {/* <div className="thumbnail">
                          <a className="popup-zoom">
                            <img src="" alt="Product Images" />
                          </a>
                        </div> */}
                          {/* End swiper */}
                          <Swiper
                            style={{
                              "--swiper-navigation-color": "#fff",
                              "--swiper-pagination-color": "#fff",
                            }}
                            // loop={true}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{
                              swiper:
                                thumbsSwiper && !thumbsSwiper.destroyed
                                  ? thumbsSwiper
                                  : null,
                            }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2"
                          >
                            {color.images.map((image, index) => (
                              <SwiperSlide key={index}>
                                <img src={image.picture} />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
                        {color.discount && (
                          <div className="label-block" style={{ zIndex: "4" }}>
                            <div className="product-badget">
                              SALE
                              {" " +
                                color.discount.value +
                                (color.discount.symbol == 1 ? "%" : "K")}
                            </div>
                          </div>
                        )}
                        <div className="product-quick-view position-view">
                          <a className="popup-zoom">
                            {/* <i className="far fa-search-plus"></i> */}
                            <i className="uil uil-search-plus"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 order-lg-1">
                      <div className="product-small-thumb-3 small-thumb-wrapper">
                        {/* Start swiper */}
                        <Swiper
                          ref={swiperRef}
                          onSwiper={setThumbsSwiper}
                          // loop={true}
                          allowTouchMove={false}
                          spaceBetween={10}
                          slidesPerView={5}
                          direction="vertical"
                          freeMode={true}
                          watchSlidesProgress={true}
                          modules={[FreeMode, Navigation, Thumbs]}
                          // onSlideChange={(swiper) => console.log("1", swiper)}
                          className="mySwiper"
                        >
                          {color.images.map((image, index) => (
                            <SwiperSlide
                              onClick={() => {
                                swiperRef.current.swiper.slideTo(index - 1);
                                // swiperRef.current.swiper.slideTo(
                                //   swiperRef.current.swiper.activeIndex
                                // );
                              }}
                              key={index}
                            >
                              <img src={image.picture} />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 mb--40">
                  <div className="single-product-content">
                    <div className="inner">
                      <h2 className="product-title font-bold text-[20px]">
                        {product.productName}
                      </h2>
                      <span className="price-amount">
                        {/* 1: %, 2: K */}
                        <span className="price current-price italic">
                          {color.discount &&
                            (color.discount.symbol == 1
                              ? Math.round(
                                  Number(color.price) *
                                    ((100 - Number(color.discount.value)) / 100)
                                ).toLocaleString()
                              : Math.round(
                                  Number(color.price) -
                                    Number(color.discount.value)
                                ).toLocaleString())}
                        </span>

                        {!color.discount && (
                          <span className="price current-price italic">
                            {color.price.toLocaleString()} VND
                          </span>
                        )}

                        {color.discount && (
                          <span className="price old-price italic">
                            {color.price.toLocaleString()}
                            VND
                          </span>
                        )}
                      </span>

                      <ul className="product-meta">
                        <li>Nguồn gốc: {product.origin}</li>
                        <li>Chất liệu: {product.material}</li>
                        <li>Phong cách: {product.style}</li>
                      </ul>
                      <p className="description"></p>

                      <div className="product-variations-wrapper">
                        <div className="product-variation">
                          <h6 className="title">Màu sắc:</h6>
                          <div className="color-variant-wrapper">
                            <ul className="color-variant">
                              {product.colors.map((item, index) => (
                                <li key={index}>
                                  <span
                                    style={{
                                      borderColor:
                                        color?._id == item?._id
                                          ? "black"
                                          : item.hex,
                                    }}
                                    onClick={() => {
                                      setColor(item);
                                      setSize(item.sizes[0]);
                                      setQuantity(1);
                                    }}
                                  >
                                    <span
                                      className="color"
                                      style={{ backgroundColor: item.hex }}
                                    ></span>
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        {/* {/* End Product Variation  */}

                        {/* Start Product Variation  */}
                        <div className="product-variation product-size-variation">
                          <h6 className="title">Kích cỡ:</h6>
                          <ul className="range-variant">
                            {color &&
                              color.sizes.map((item, index) => (
                                <li
                                  key={index}
                                  style={{
                                    borderColor:
                                      size?._id == item?._id
                                        ? "black"
                                        : "#656973",
                                  }}
                                  onClick={() => {
                                    setSize(item);
                                    setQuantity(1);
                                  }}
                                >
                                  {item.sizeName}
                                </li>
                              ))}
                          </ul>
                        </div>
                        {/* End Product Variation  */}
                      </div>

                      <div className="product-rating">
                        {/* star-rating */}
                        <div className="">
                          <h6 className="product-rating__title">Tình trạng:</h6>
                          <span
                            className={
                              size?.quantity > 0 ? "available" : "sold"
                            }
                          >
                            {size &&
                              (size?.quantity > 0
                                ? "Còn " + size?.quantity + " sản phẩm"
                                : "Hết hàng")}
                          </span>
                        </div>
                        <div className="review-link">
                          {/* <a href="#">(<span>2</span> customer reviews)</a> */}
                        </div>
                      </div>

                      {/* Start Product Action Wrapper  */}
                      <div className="product-action-wrapper d-flex-center">
                        {/* Start Quentity Action  */}
                        <div className="pro-qty mr--20">
                          <span
                            className="dec qtybtn"
                            onClick={() => handleQuantityPicker(null, -1)}
                          >
                            -
                          </span>
                          <input
                            type="number"
                            style={{ width: "40px" }}
                            value={quantity}
                            onChange={(e) => handleQuantityPicker(e, 0)}
                          />
                          <span
                            className="inc qtybtn"
                            onClick={() => handleQuantityPicker(null, 1)}
                          >
                            +
                          </span>
                        </div>
                        {/* End Quentity Action  */}

                        {/* Start Product Action  */}
                        <ul className="product-action d-flex-center mb--0">
                          <li className="add-to-cart">
                            <a
                              href={undefined}
                              // className="axil-btn btn-bg-primary cursor-pointer"
                              // (click)="addCart(product)"
                              onClick={addToCart}
                              className={
                                isLoading
                                  ? "axil-btn btn-bg-primary h-[60px] cursor-pointer button button-contactForm btn-block bg-[#5869da] button__loading loading capitalize"
                                  : "axil-btn btn-bg-primary h-[60px] cursor-pointer button button-contactForm btn-block bg-[#5869da] button__loading capitalize"
                              }
                              disabled={isLoading}
                            >
                              {!isLoading && "Thêm vào giỏ hàng"}
                            </a>
                          </li>
                          {/* <li className="wishlist">
                    <a href="wishlist.html" className="axil-btn wishlist-btn"
                      ><i className="far fa-heart"></i
                    ></a>
                  </li> */}
                        </ul>
                        {/* End Product Action  */}
                      </div>
                      {/* End Product Action Wrapper  */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End .single-product-thumb */}

          <div className="woocommerce-tabs wc-tabs-wrapper bg-vista-white">
            <div className="container">
              <ul className="nav tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <a
                    className={
                      "italic cursor-pointer " + (tab == 1 ? "active" : "")
                    }
                    id="description-tab"
                    href={undefined}
                    onClick={() => setTab(1)}
                  >
                    Mô tả
                  </a>
                </li>

                <li className="nav-item" role="presentation">
                  <a
                    id="reviews-tab"
                    href={undefined}
                    className={
                      "italic cursor-pointer " + (tab == 2 ? "active" : "")
                    }
                    onClick={() => setTab(2)}
                  >
                    Bảng kích cỡ
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className={"tab-pane fade " + (tab == 1 ? "show active" : "")}
                  id="description"
                >
                  <div className="reviews-wrapper tab-content-wrap">
                    {!product.description ? (
                      "(Chưa cập nhật mô tả, vui lòng chờ hoặc liên hệ với shop qua các nền tảng socials)"
                    ) : (
                      <div
                        className=""
                        dangerouslySetInnerHTML={{
                          __html: product.description || "",
                        }}
                      ></div>
                    )}
                  </div>
                  <div className="product-desc-wrapper__inner"></div>
                </div>

                <div
                  className={"tab-pane fade " + (tab == 2 ? "show active" : "")}
                  id="reviews"
                >
                  <div className="reviews-wrapper tab-content-wrap">
                    {!product.sizeGuide ? (
                      "(Chưa cập nhật bảng size, vui lòng chờ hoặc liên hệ với shop qua các nền tảng socials)"
                    ) : (
                      <div className="">
                        <img
                          src="data:image/jpeg;base64,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"
                          className="product-sizeGuide"
                        />
                      </div>
                    )}
                  </div>
                  <div className="reviews-wrapper">
                    <img src="" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* woocommerce-tabs */}
        </div>
      )}
    </>
  );
};

export default ProductDetail;
