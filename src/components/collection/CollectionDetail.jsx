import { useLocation, useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { TOAST_MESSAGE, PAGE_SIZE } from "../../common/Variable";
import { configToast } from "../../config/ConfigUI";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Breadcrumb from "../shared/Breadcrumb";
import CollectionService from "../../services/collection.service";
import * as moment from "moment";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { EffectCreative, EffectFade } from "swiper";
import "./Collection.scss";

const TITLE = "Chi Tiết Bộ Sưu Tập";
const TITLE_NAME = "Chi Tiết Bộ Sưu Tập";

const CollectionDetail = () => {
  const { customer, setCustomer, cartNumber, setCartNumber } =
    useOutletContext();

  const { path } = useParams();
  const swiperRef = useRef(null);

  const [lookbooks, setLookbooks] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getByPath = () => {
    CollectionService.getByPath({
      path: path,
    })
      .then((res) => {
        setLookbooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (path) getByPath();
  }, [path]);

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
      <Breadcrumb currentPage="Chi Tiết Bộ Sưu Tập" />
      <div className="collection-detail-page">
        <div>
          <div className="container">
            <div className="section-title-wrapper mb-[150px] p-0">
              <span
                className="title-highlighter highlighter-secondary"
                style={{
                  color: "black",
                  margin: "20px 0 80px",
                  fontSize: "20px",
                  textTransform: "uppercase",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                {/* <i className="uil uil-store"></i> */}
                {lookbooks && lookbooks.length > 0 && (
                  <>
                    <div className="mb-5">
                      {lookbooks[0]?.collectionInfo?.collectionName}
                    </div>
                    <div
                      style={{
                        fontStyle: "italic",
                        color: "grey",
                        fontSize: "16px",
                      }}
                    >
                      {" "}
                      {"Ngày Phát Hành: " +
                        moment(
                          lookbooks[0]?.collectionInfo?.releaseDate
                        ).format("DD/MM/YYYY")}
                    </div>
                  </>
                )}
              </span>
            </div>
          </div>
          {lookbooks &&
            lookbooks.map((lookbook, index) => (
              <div key={index} className="mb-5">
                <div className="container">
                  <div className="section-title-wrapper mb-[150px] p-0">
                    <span
                      className="title-highlighter highlighter-secondary"
                      style={{ color: "black" }}
                    >
                      {/* <i className="uil uil-store"></i> */}
                      <i className="fa-regular fa-image"></i>
                      {lookbook.lookbookName}
                    </span>
                    {lookbook.description && (
                      <p
                        className="lookbook-desc"
                        dangerouslySetInnerHTML={{
                          __html: lookbook.description || "",
                        }}
                      ></p>
                    )}
                  </div>
                </div>

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
                          slidesPerView={2}
                          navigation
                          pagination={{ clickable: true }}
                          allowTouchMove={false}
                          speed={1200}
                          // effect={"fade"}
                          onSlideChange={(swiper) => {}}
                        >
                          {lookbook.lookbookImages.map((image, index) => (
                            <SwiperSlide key={index}>
                              <div className="single-slide slick-slide w-full">
                                <div className="main-slider-thumb">
                                  <img
                                    srcSet={image.picture + " 2x"}
                                    alt="Product"
                                    className="object-cover"
                                  />
                                  <div id="overlay"></div>
                                </div>
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default CollectionDetail;
