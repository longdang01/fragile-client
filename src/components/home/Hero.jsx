// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-fade";
import "swiper/css/effect-creative";
// import required modules
import { EffectCreative, EffectFade } from "swiper";
const Hero = () => {
  return (
    <>
      <div className="axil-main-slider-area main-slider-style-5 hero">
        <div className="container">
          <div className="slider-box-wrap">
            <div className="slider-activation-two axil-slick-dots">
              <Swiper
                // install Swiper modules
                modules={[
                  Navigation,
                  Pagination,
                  Scrollbar,
                  A11y,
                  Autoplay,
                  EffectCreative,
                  EffectFade,
                ]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                allowTouchMove={false}
                // effect={"creative"}
                // creativeEffect={{
                //   prev: {
                //     shadow: true,
                //     origin: "left center",
                //     translate: ["-5%", 0, -200],
                //     rotate: [0, 100, 0],
                //   },
                //   next: {
                //     origin: "right center",
                //     translate: ["5%", 0, -200],
                //     rotate: [0, -100, 0],
                //   },
                // }}
                // effect={"creative"}
                // creativeEffect={{
                //   prev: {
                //     shadow: true,
                //     translate: [0, 0, -400],
                //   },
                //   next: {
                //     translate: ["100%", 0, 0],
                //   },
                // }}
                // effect={"creative"}
                // creativeEffect={{
                //   prev: {
                //     shadow: true,
                //     translate: ["-20%", 0, -1],
                //   },
                //   next: {
                //     translate: ["100%", 0, 0],
                //   },
                // }}
                speed={1200}
                effect={"fade"}
                // loop="true"
                // scrollbar={{ draggable: true }}
                onSlideChange={(swiper) => {
                  //   const active = document.querySelector(
                  //     ".main-slider-content.active"
                  //   );
                  //   active.classList.remove("active");
                  //   const ele = document.querySelector(
                  //     ".hero .swiper-slide-active .main-slider-content"
                  //   );
                  //   console.log(ele);
                  //   document
                  //     .querySelector(
                  //       ".hero .swiper-slide-active .main-slider-content"
                  //     )
                  //     .classList.add("active");
                }}
                // onSwiper={(swiper) => console.log(swiper)}
              >
                <SwiperSlide>
                  <div className="single-slide slick-slide w-full">
                    <div className="main-slider-content active">
                      <span className="subtitle font-bold">
                        <i className="fas fa-fire"></i> FRAGILE STUDIO
                      </span>
                      <h1 className="title text-[#fff] font-bold">
                        slide name
                      </h1>
                      <div className="shop-btn cursor-pointer">
                        <a href={undefined} className="axil-btn btn-bg-white">
                          <i className="uil uil-shopping-cart-alt"></i> Mua Hàng
                        </a>
                      </div>
                    </div>
                    <div className="main-slider-thumb">
                      <img
                        src="./template/images/bg/bg-image-7.jpg"
                        alt="Product"
                        className="object-cover"
                      />
                      <div id="overlay"></div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="single-slide slick-slide w-full">
                    <div className="main-slider-content">
                      <span className="subtitle font-bold">
                        <i className="fas fa-fire"></i>
                        <span className="font-bold uppercase">
                          FRAGILE STUDIO
                        </span>
                      </span>
                      <h1 className="title text-[#fff] font-bold">
                        slide name 2
                      </h1>
                      <div className="shop-btn cursor-pointer">
                        <a href={undefined} className="axil-btn btn-bg-white">
                          <i className="uil uil-shopping-cart-alt"></i> Mua Hàng
                        </a>
                      </div>
                    </div>
                    <div className="main-slider-thumb">
                      <img
                        src="./template/images/bg/bg-image-5.jpg"
                        alt="Product"
                        className="object-cover"
                      />
                      <div id="overlay"></div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
