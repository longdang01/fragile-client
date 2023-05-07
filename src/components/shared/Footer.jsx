import logo_white from "../../assets/images/logo-white.jpg";
import { Link } from "react-router-dom";
const Footer = ({ customer }) => {
  return (
    <>
      <footer className="axil-footer-area footer-style-1 footer-dark">
        {/* Start Footer Top Area  */}
        <div className="footer-top">
          <div className="container">
            <div className="row">
              {/* Start Single Widget  */}
              <div className="col-md-3 col-sm-12">
                <div className="axil-footer-widget">
                  <h5 className="widget-title">SUPPORT</h5>
                  <div className="inner">
                    <ul>
                      <li>
                        <a href={undefined}>
                          <i className="fa-brands fa-facebook mr-3"></i>Facebook
                        </a>
                      </li>
                      <li>
                        <a href={undefined}>
                          <i className="fa-brands fa-instagram mr-3"></i>
                          Instagram
                        </a>
                      </li>
                      <li>
                        <a href={undefined}>
                          <i className="fa-brands fa-tiktok mr-3"></i>
                          Tiktok
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* End Single Widget  */}
              {/* Start Single Widget  */}
              <div className="col-md-3 col-sm-4">
                <div className="axil-footer-widget">
                  <h5 className="widget-title">ABOUT</h5>
                  <div className="inner">
                    <ul>
                      <li>
                        <a href={undefined}>Giới Thiệu</a>
                      </li>

                      <li>
                        <a href={undefined}>Liên Hệ</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* End Single Widget  */}
              {/* Start Single Widget  */}
              <div className="col-md-3 col-sm-4">
                <div className="axil-footer-widget">
                  <h5 className="widget-title">ACCOUNT</h5>
                  <div className="inner">
                    <ul>
                      {customer ? (
                        <>
                          <li>
                            <Link to="/account/profile">Tài Khoản Của Bạn</Link>
                          </li>
                          <li>
                            <Link to="/account/orders">Theo Dõi Đơn Hàng</Link>
                          </li>
                          <li>
                            <Link to="/account/delivery-address">
                              Địa Chỉ Nhận Hàng
                            </Link>
                          </li>
                          <li>
                            <Link to="/account/change-password">
                              Đổi Mật Khẩu
                            </Link>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link to="/login">Đăng Nhập</Link>
                          </li>
                          <li>
                            <Link to="/register">Đăng Ký</Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              {/* End Single Widget  */}
              {/* Start Single Widget  */}
              <div className="col-md-3 col-sm-4">
                <div className="axil-footer-widget">
                  <h5 className="widget-title">POLICY</h5>
                  <div className="inner">
                    <ul>
                      <li>
                        <a href={undefined}>Hỗ Trợ Mua Hàng</a>
                      </li>
                      <li>
                        <a href={undefined}>Chính Sách Bảo Mật</a>
                      </li>
                      <li>
                        <a href={undefined}>Chính Sách Sử Dụng</a>
                      </li>
                      <li>
                        <a href={undefined}>Câu Hỏi Thường Gặp</a>
                      </li>
                      {/* <!-- <li><a href="contact.html">Contact</a></li> --> */}
                    </ul>
                  </div>
                </div>
              </div>
              {/* End Single Widget  */}
            </div>
          </div>
        </div>
        {/* End Footer Top Area  */}
        {/* Start Copyright Area  */}
        <div className="copyright-area copyright-default separator-top">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-7 col-lg-12">
                <div className="copyright-left d-flex flex-wrap justify-content-xl-start justify-content-center">
                  <ul className="quick-link">
                    <li>
                      <a href="privacy-policy.html">Chính sách bảo mật</a>
                    </li>
                    <li>
                      <a href="terms-of-service.html">Chính Sách Sử Dụng</a>
                    </li>
                  </ul>
                  <ul className="quick-link">
                    <li style={{ fontWeight: "bold" }}>
                      © {new Date().getFullYear()}. Bản quyền thuộc về{" "}
                      <a target="_blank" href="https://axilthemes.com/">
                        FRAGILE
                      </a>
                      .
                    </li>
                  </ul>
                </div>
              </div>
              {/* <div className="col-xl-5 col-lg-12">
                <div className="copyright-right d-flex flex-wrap justify-content-xl-end justify-content-center align-items-center">
                  <span className="card-text">Accept For</span>
                  <ul className="payment-icons-bottom quick-link">
                    <li>
                      <img
                        src="template/images/icons/cart/cart-1.png"
                        alt="paypal cart"
                      />
                    </li>
                    <li>
                      <img
                        src="template/images/icons/cart/cart-2.png"
                        alt="paypal cart"
                      />
                    </li>
                    <li>
                      <img
                        src="template/images/icons/cart/cart-3.png"
                        alt="paypal cart"
                      />
                    </li>
                    <li>
                      <img
                        src="template/images/icons/cart/cart-6.png"
                        alt="paypal cart"
                      />
                    </li>
                    <li>
                      <img
                        src="template/images/icons/cart/cart-5.png"
                        alt="paypal cart"
                      />
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        {/* End Copyright Area  */}
      </footer>
    </>
  );
};

export default Footer;
