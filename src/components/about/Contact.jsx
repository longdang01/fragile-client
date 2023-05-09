import { Helmet, HelmetProvider } from "react-helmet-async";
import Breadcrumb from "../shared/Breadcrumb";
import fragile_brand from "../../assets/images/fragile-brand.jpg";
import "./About.scss";

const TITLE = "Liên Hệ";
const TITLE_NAME = "Liên Hệ";

const Contact = () => {
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
      <Breadcrumb currentPage="Liên Hệ" />
      <div className="contact-page">
        <div className="introduce-page">
          <div className="about-info-area">
            <div className="container">
              <div className="row row--20">
                <div className="col-lg-4">
                  <div className="about-info-box">
                    <div className="thumb">
                      <img src={fragile_brand} alt="Shape" />
                    </div>
                    <div className="content">
                      <h6 className="title">Cửa Hàng</h6>
                      <p style={{ color: "grey" }} className="font-bold">
                        Đường 39A, Thị Trấn Yên Mỹ, Huyện Yên Mỹ, Tỉnh Hưng Yên
                        <br />
                        Điện Thoại: +89 971 603 963
                        <br />
                        Email: fragile-support@gmail.com
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
                      <h6 className="title">Việc Làm</h6>
                      <p style={{ color: "grey" }} className="font-bold">
                        Vui lòng theo dõi <strong>FRAGILE</strong> qua các kênh
                        social để cập nhật các bài đăng tuyển dụng
                      </p>
                      <div>
                        <ul className="contact-socials flex items-center">
                          <li>
                            <a href={undefined}>
                              <i className="fa-brands fa-facebook mr-3"></i>
                            </a>
                          </li>
                          <li>
                            <a href={undefined}>
                              <i className="fa-brands fa-instagram mr-3"></i>
                            </a>
                          </li>
                          <li>
                            <a href={undefined}>
                              <i className="fa-brands fa-tiktok mr-3"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="about-info-box">
                    <div className="thumb">
                      <img src={fragile_brand} alt="Shape" />
                    </div>
                    <div className="content">
                      <h6 className="title">Giờ Mở Cửa</h6>
                      <p style={{ color: "grey" }} className="font-bold">
                        Thứ 2 đến Thứ 7: 9am - 10pm
                        <br />
                        Chủ Nhật: 10am - 6pm
                      </p>
                    </div>
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

export default Contact;
