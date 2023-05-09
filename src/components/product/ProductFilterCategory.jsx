import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/css/effect-fade";
import "swiper/css/effect-creative";
// import required modules
import { EffectCreative, EffectFade } from "swiper";
import none_picture from "../../assets/images/none.png";
import fragile_brand from "../../assets/images/fragile-brand.jpg";

const ProductFilterCategory = ({ category }) => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  const { pathname } = useLocation();

  return (
    <>
      {category && (
        <div className="container">
          <div className="product-area pb--50">
            {/* <div className="section-title-wrapper">
              <span className="title-highlighter highlighter-secondary">
                <i className="uil uil-store"></i>
                {category.categoryName}
              </span>
              <h2 className="title font-bold italic">
                Lọc Theo Danh Mục:{" "}
                {document.querySelector(".category-active") &&
                  document.querySelector(".category-active").textContent}
              </h2>
            </div> */}
            <div className="categrie-product-activation-3 slick-layout-wrapper--15 axil-slick-arrow  arrow-top-slide">
              <button
                ref={navigationPrevRef}
                className="slide-arrow prev-arrow slick-arrow"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <Swiper
                spaceBetween={50}
                slidesPerView={8}
                modules={[Navigation, EffectCreative, EffectFade]}
                navigation={{
                  prevEl: navigationPrevRef.current,
                  nextEl: navigationNextRef.current,
                }}
                breakpoints={{
                  0: {
                    slidesPerView: 3,
                  },
                  576: {
                    // width: 576,
                    slidesPerView: 3,
                  },
                  768: {
                    // width: 768,
                    slidesPerView: 5,
                  },
                  992: {
                    // width: 768,
                    slidesPerView: 8,
                  },
                }}
              >
                <SwiperSlide>
                  <div className="slick-single-layout">
                    <div className="categrie-product categrie-product-3">
                      <Link
                        className={
                          pathname.slice(3) == category.path
                            ? "category-active"
                            : ""
                        }
                        to={"/c/" + category.path}
                      >
                        <img
                          className="img-fluid"
                          src={
                            category.picture ? category.picture : fragile_brand
                          }
                        />
                        <h6 className="cat-title">{category.categoryName}</h6>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
                {category.subCategories &&
                  category.subCategories.map((subCategory, index) => (
                    <SwiperSlide key={index}>
                      <div className="slick-single-layout">
                        <div
                          className="categrie-product categrie-product-3"
                          // data-sal="zoom-out"
                          // data-sal-delay="100"
                          // data-sal-duration="500"
                        >
                          <Link
                            to={"/s/" + category.path + "/" + subCategory.path}
                            className={
                              pathname.slice(3) ==
                              category.path + "/" + subCategory.path
                                ? "category-active"
                                : ""
                            }
                          >
                            <img
                              className="img-fluid"
                              src={
                                subCategory.picture
                                  ? subCategory.picture
                                  : fragile_brand
                              }
                            />
                            <h6 className="cat-title">
                              {subCategory.subCategoryName}
                            </h6>
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
              <button
                ref={navigationNextRef}
                className="slide-arrow next-arrow slick-arrow"
              >
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFilterCategory;
