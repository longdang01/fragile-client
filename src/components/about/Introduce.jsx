import { Helmet, HelmetProvider } from "react-helmet-async";
import Breadcrumb from "../shared/Breadcrumb";
import fragile_brand from "../../assets/images/fragile-brand.jpg";
import "./About.scss";

const TITLE = "Giới Thiệu";
const TITLE_NAME = "Giới Thiệu";

const Introduce = () => {
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
      <Breadcrumb currentPage="Giới Thiệu" />

      <div className="introduce-page">
        <div className="axil-about-area about-style-1 axil-section-gap ">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-4 col-lg-6 about-content-item">
                <div className="about-thumbnail">
                  <div className="thumbnail">
                    <img src={fragile_brand} alt="About Us" />
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-lg-6 about-content-item">
                <div className="about-content content-right">
                  <span className="title-highlighter highlighter-primary2">
                    {" "}
                    <i className="fa-solid fa-house"></i>Giới Thiệu
                  </span>
                  <h3
                    className="title"
                    style={{
                      fontWeight: "bold",
                      fontStyle: "italic",
                      color: "grey",
                    }}
                  >
                    Nền tảng mua sắm trực tuyến
                  </h3>
                  <span className="text-heading">
                    <strong>FRAGILE</strong> có thể giúp bạn tạo trải nghiệm
                    thương mại kỹ thuật số thống nhất, thông minh — cả trực
                    tuyến và tại cửa hàng.
                  </span>
                  <div className="row">
                    <div className="col-xl-6">
                      <p>
                        Quản lý nhóm bán hàng bằng các giải pháp phù hợp với
                        ngành kỹ thuật số và thích ứng với việc thay đổi thị
                        trường và khách hàng nhanh hơn bằng cách mua hàng.
                      </p>
                    </div>
                    <div className="col-xl-6">
                      <p className="mb--0">
                        FRAGILE mang đến cho người mua trải nghiệm mua sắm trực
                        tuyến liền mạch, tự phục vụ với tất cả.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="about-info-area">
          <div className="container">
            <div className="row row--20">
              <div className="col-lg-4">
                <div className="about-info-box">
                  <div className="thumb">
                    <img src={fragile_brand} alt="Shape" />
                  </div>
                  <div className="content">
                    <h6 className="title">1,000+ Khách Hàng</h6>
                    <p style={{ color: "grey" }} className="font-bold">
                      FRAGILE STUDIO
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="about-info-box">
                  <div className="thumb">
                    <img src={fragile_brand} alt="Shape" />
                  </div>
                  <div className="content">
                    <h6 className="title">1 Năm Kinh Nghiệm</h6>
                    <p style={{ color: "grey" }} className="font-bold">
                      FRAGILE STUDIO
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="about-info-box">
                  <div className="thumb">
                    <img src={fragile_brand} alt="Shape" />
                  </div>
                  <div className="content">
                    <h6 className="title">1 Giải Thưởng</h6>
                    <p style={{ color: "grey" }} className="font-bold">
                      FRAGILE STUDIO
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Introduce;
