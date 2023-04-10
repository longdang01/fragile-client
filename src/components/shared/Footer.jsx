import logo_white from "../../assets/images/logo-white.jpg";

const Footer = () => {
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
                  {/* <div className="logo mb--30">
                    <a
                      href="index.html"
                      style={{ fontSize: "30px", lineHeight: "100%" }}
                      className="font-bold text-[#fff]"
                    >
                    
                      Fragile
                    </a>
                  </div> */}
                  <h5 className="widget-title">Fragile</h5>

                  <div className="inner">
                    <ul>
                      <li>
                        <a href={undefined}>Facebook</a>
                      </li>
                      <li>
                        <a href={undefined}>Instagram</a>
                      </li>
                      {/* <li>
                        <a href={undefined}>Tin Tức</a>
                      </li>
                      <li>
                        <a href={undefined}>Lookbook</a>
                      </li>
                      <li>
                        <a href={undefined}>Liên Hệ</a>
                      </li> */}
                    </ul>
                  </div>
                  {/* <div className="inner">
                    <p className="mb-5">
                      Thị trấn Yên Mỹ <br />
                      Huyện Yên Mỹ, <br />
                      Tỉnh Hưng Yên.
                    </p>
                    <div className="social-share">
                      <a href="#">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-discord"></i>
                      </a>
                    </div>
                  </div> */}
                </div>
              </div>
              {/* End Single Widget  */}
              {/* Start Single Widget  */}
              <div className="col-md-3 col-sm-4">
                <div className="axil-footer-widget">
                  <h5 className="widget-title">Về chúng tôi</h5>
                  <div className="inner">
                    <ul>
                      <li>
                        <a href={undefined}>Giới Thiệu</a>
                      </li>
                      <li>
                        <a href={undefined}>Cửa Hàng</a>
                      </li>
                      <li>
                        <a href={undefined}>Tin Tức</a>
                      </li>
                      <li>
                        <a href={undefined}>Lookbook</a>
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
                  <h5 className="widget-title">Tài Khoản</h5>
                  <div className="inner">
                    <ul>
                      <li>
                        <a href={undefined}>Giúp Đỡ</a>
                      </li>
                      <li>
                        <a href={undefined}>Giỏ Hàng</a>
                      </li>
                      <li>
                        <a href={undefined}>Đăng Nhập</a>
                      </li>
                      <li>
                        <a href={undefined}>Đăng Ký</a>
                      </li>
                      {/* <!-- <li><a href="shop.html">Shop</a></li> --> */}
                    </ul>
                  </div>
                </div>
              </div>
              {/* End Single Widget  */}
              {/* Start Single Widget  */}
              <div className="col-md-3 col-sm-4">
                <div className="axil-footer-widget">
                  <h5 className="widget-title">Hỗ Trợ</h5>
                  <div className="inner">
                    <ul>
                      <li>
                        <a href={undefined}>Chính Sách Bảo Mật</a>
                      </li>
                      <li>
                        <a href={undefined}>Điều Khoản Sử Dụng</a>
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
                      <a href="terms-of-service.html">Điều khoản dịch vụ</a>
                    </li>
                  </ul>
                  <ul className="quick-link">
                    <li>
                      © {new Date().getFullYear()}. Bản quyền thuộc về{" "}
                      <a target="_blank" href="https://axilthemes.com/">
                        Fragile
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
