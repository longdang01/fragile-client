import { useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Hero from "./Hero";
import BestSeller from "./BestSeller";
import Sale from "./Sale";

const TITLE = "Trang Chủ";
const TITLE_NAME = "Trang Chủ";

const Home = () => {
  const { loading, setLoading } = useOutletContext();

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

      <Hero />
      <BestSeller />
      <Sale />
      {/* {/* <!-- Start Slider Area --> */}
      {/* <div className="axil-main-slider-area main-slider-style-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6">
              <div className="main-slider-content">
                <span className="subtitle">
                  <i className="fas fa-fire"></i>Largest NFT marketplace
                </span>
                <h1 className="title">
                  Discover, collect, and sell extraordinary NFTs
                </h1>
                <div className="shop-btn">
                  <a
                    href="shop.html"
                    className="axil-btn btn-bg-white right-icon"
                  >
                    Explore <i className="fal fa-long-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="main-slider-large-thumb">
                <div className="slider-thumb-activation-two axil-slick-dots">
                  <div className="single-slide slick-slide">
                    <div className="axil-product product-style-five">
                      <div className="thumbnail">
                        <a href="single-product-7.html">
                          <img
                            src="template/images/product/nft/product-17.png"
                            alt="Product Images"
                          />
                        </a>
                      </div>
                      <div className="product-content">
                        <div className="inner">
                          <h5 className="title">
                            <a href="single-product-7.html">Anime #001</a>
                          </h5>
                          <div className="product-price-variant">
                            <span className="price current-price">$5000</span>
                          </div>
                          <ul className="cart-action">
                            <li className="select-option">
                              <a href="single-product-7.html">Buy Product</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="single-slide slick-slide">
                    <div className="axil-product product-style-five">
                      <div className="thumbnail">
                        <a href="single-product-7.html">
                          <img
                            src="template/images/product/nft/product-16.png"
                            alt="Product Images"
                          />
                        </a>
                      </div>
                      <div className="product-content">
                        <div className="inner">
                          <h5 className="title">
                            <a href="single-product-7.html">Anime #002</a>
                          </h5>
                          <div className="product-price-variant">
                            <span className="price current-price">$5000</span>
                          </div>
                          <ul className="cart-action">
                            <li className="select-option">
                              <a href="single-product-7.html">Buy Product</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="single-slide slick-slide">
                    <div className="axil-product product-style-five">
                      <div className="thumbnail">
                        <a href="single-product-7.html">
                          <img
                            src="template/images/product/nft/product-15.png"
                            alt="Product Images"
                          />
                        </a>
                      </div>
                      <div className="product-content">
                        <div className="inner">
                          <h5 className="title">
                            <a href="single-product-7.html">Anime #003</a>
                          </h5>
                          <div className="product-price-variant">
                            <span className="price current-price">$5000</span>
                          </div>
                          <ul className="cart-action">
                            <li className="select-option">
                              <a href="single-product-7.html">Buy Product</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="single-slide slick-slide">
                    <div className="axil-product product-style-five">
                      <div className="thumbnail">
                        <a href="single-product-7.html">
                          <img
                            src="template/images/product/nft/product-1.png"
                            alt="Product Images"
                          />
                        </a>
                      </div>
                      <div className="product-content">
                        <div className="inner">
                          <h5 className="title">
                            <a href="single-product-7.html">Anime #004</a>
                          </h5>
                          <div className="product-price-variant">
                            <span className="price current-price">$5000</span>
                          </div>
                          <ul className="cart-action">
                            <li className="select-option">
                              <a href="single-product-7.html">Buy Product</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <!-- End Slider Area --> */}
    </>
  );
};

export default Home;
