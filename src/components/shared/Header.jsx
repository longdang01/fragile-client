// import React from "react";
import { useState } from "react";
import logo_white from "../../assets/images/logo-white.jpg";
import logo_black from "../../assets/images/logo-black.jpg";
import { LANGUAGES } from "../../common/Variable";

const Header = ({ setShowCartDropdown, setShowHeaderSearch }) => {
  const [toggle, setToggle] = useState({
    language: false,
    account: false,
  });

  const [language, setLanguage] = useState(LANGUAGES[0]);

  return (
    <>
      <header className="header axil-header header-style-5">
        <div className="axil-header-top">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-sm-6 col-12">
                <div className="header-top-dropdown">
                  {/* <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      English
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          English
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Arabic
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Spanish
                        </a>
                      </li>
                    </ul>
                  </div> */}
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      onClick={() =>
                        setToggle({ ...toggle, language: !toggle.language })
                      }
                    >
                      {language?.name}
                    </button>
                    <ul
                      className={
                        "dropdown-menu " + (toggle.language ? "show" : "")
                      }
                    >
                      {LANGUAGES &&
                        LANGUAGES.map((language, index) => (
                          <li key={index}>
                            <a
                              className="dropdown-item cursor-pointer"
                              href={undefined}
                              onClick={() => {
                                setLanguage(language);
                                setToggle({ ...toggle, language: false });
                              }}
                            >
                              {language.name}
                            </a>
                          </li>
                        ))}
                      {/* <li>
                        <a className="dropdown-item" href="#">
                          AUD
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          EUR
                        </a>
                      </li> */}
                    </ul>
                  </div>
                  {/* <Select
                    className="btn__dropdown"
                    value={money}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select> */}
                </div>
              </div>
              <div className="col-lg-6 col-sm-6 col-12">
                <div className="header-top-link">
                  <ul className="quick-link">
                    <li>
                      <a href="#">Trợ Giúp</a>
                    </li>
                    <li>
                      <a href="sign-up.html">Đăng Ký</a>
                    </li>
                    <li>
                      <a href="sign-in.html">Đăng Nhập</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Start Mainmenu Area  --> */}
        <div id="axil-sticky-placeholder"></div>
        <div className="axil-mainmenu">
          <div className="container">
            <div className="header-navbar">
              <div className="header-brand">
                <a href="index.html" className="logo logo-dark">
                  <img
                    src={logo_black}
                    alt="Site Logo"
                    className="w-[160px] h-[40px]"
                  />
                </a>
                <a href="index.html" className="logo logo-light">
                  <img
                    src={logo_white}
                    alt="Site Logo"
                    className="w-[160px] h-[40px]"
                  />
                </a>
              </div>
              <div className="header-main-nav">
                {/* <!-- Start Mainmanu Nav --> */}
                <nav className="mainmenu-nav">
                  <button className="mobile-close-btn mobile-nav-toggler">
                    <i className="fas fa-times"></i>
                  </button>
                  <div className="mobile-nav-brand">
                    <a href="index.html" className="logo">
                      <img
                        src="template/images/logo/logo.png"
                        alt="Site Logo"
                      />
                    </a>
                  </div>
                  <ul className="mainmenu">
                    <li className="">
                      <a href="#">Trang Chủ</a>
                      {/* <ul className="axil-submenu">
                        <li>
                          <a href="index-1.html">Home - Electronics</a>
                        </li>
                        <li>
                          <a href="index-2.html">Home - NFT</a>
                        </li>
                        <li>
                          <a href="index-3.html">Home - Fashion</a>
                        </li>
                        <li>
                          <a href="index-4.html">Home - Jewellery</a>
                        </li>
                        <li>
                          <a href="index-5.html">Home - Furniture</a>
                        </li>
                        <li>
                          <a href="index-6.html">Home - Multipurpose</a>
                        </li>
                        <li>
                          <a href="https://new.axilthemes.com/demo/template/etrade-rtl/">
                            RTL Version
                          </a>
                        </li>
                      </ul> */}
                    </li>
                    {/* <li className="menu-item-has-children mega-menu">
                      <a href="#">Cửa Hàng</a>
                      <ul className="axil-submenu shadow-lg">
                        <li className="shadow-lg">
                          <div className="axil-submenu-header text-gray-400">
                            Danh Mục Áo
                          </div>
                          <ul className="">
                            <li>
                              <a className="activeCategory">Tất cả Áo</a>
                            </li>
                          </ul>
                        </li>
                        <li className="shadow-lg">
                          <div className="axil-submenu-header text-gray-400">
                            Danh Mục Quần
                          </div>
                          <ul className="">
                            <li>
                              <a className="">Tất cả Áo</a>
                            </li>
                            <li>
                              <a className="">Áo</a>
                            </li>
                          </ul>
                        </li>
                        <li className="shadow-lg">
                          <div className="axil-submenu-header text-gray-400">
                            Áo
                          </div>
                          <ul className="">
                            <li>
                              <a className="">Tất cả Áo</a>
                            </li>
                            <li>
                              <a className="">Áo</a>
                            </li>
                          </ul>
                        </li>
                        <li className="shadow-lg">
                          <div className="axil-submenu-header text-gray-400">
                            Áo
                          </div>
                          <ul className="">
                            <li>
                              <a className="">Tất cả Áo</a>
                            </li>
                            <li>
                              <a className="">Áo</a>
                            </li>
                          </ul>
                        </li>
                        <li className="shadow-lg">
                          <div className="axil-submenu-header text-gray-400">
                            Áo
                          </div>
                          <ul className="">
                            <li>
                              <a className="">Tất cả Áo</a>
                            </li>
                            <li>
                              <a className="">Áo</a>
                            </li>
                          </ul>
                        </li>
                        <li className="shadow-lg">
                          <div className="axil-submenu-header text-gray-400">
                            Áo
                          </div>
                          <ul className="">
                            <li>
                              <a className="">Tất cả Áo</a>
                            </li>
                            <li>
                              <a className="">Áo</a>
                            </li>
                          </ul>
                        </li>
                        <li className="shadow-lg">
                          <div className="axil-submenu-header text-gray-400">
                            Áo
                          </div>
                          <ul className="">
                            <li>
                              <a className="">Tất cả Áo</a>
                            </li>
                            <li>
                              <a className="">Áo</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li> */}
                    <li className="menu-item-has-children">
                      <a href="#">Cửa Hàng</a>
                      <ul className="axil-submenu">
                        <li>
                          <a href="wishlist.html">Wishlist</a>
                        </li>
                        <li>
                          <a href="cart.html">Cart</a>
                        </li>
                        <li>
                          <a href="checkout.html">Checkout</a>
                        </li>
                      </ul>
                    </li>
                    <li className="">
                      <a href="#">Bộ Sưu Tập</a>
                      {/* <ul className="axil-submenu">
                        <li>
                          <a href="wishlist.html">Wishlist</a>
                        </li>
                        <li>
                          <a href="cart.html">Cart</a>
                        </li>
                        <li>
                          <a href="checkout.html">Checkout</a>
                        </li>
                        <li>
                          <a href="my-account.html">Account</a>
                        </li>
                        <li>
                          <a href="sign-up.html">Sign Up</a>
                        </li>
                        <li>
                          <a href="sign-in.html">Sign In</a>
                        </li>
                        <li>
                          <a href="forgot-password.html">Forgot Password</a>
                        </li>
                        <li>
                          <a href="reset-password.html">Reset Password</a>
                        </li>
                        <li>
                          <a href="privacy-policy.html">Privacy Policy</a>
                        </li>
                        <li>
                          <a href="coming-soon.html">Coming Soon</a>
                        </li>
                        <li>
                          <a href="404.html">404 Error</a>
                        </li>
                        <li>
                          <a href="typography.html">Typography</a>
                        </li>
                      </ul> */}
                    </li>
                    <li>
                      <a href="about-us.html">Liên Hệ</a>
                    </li>
                    {/* <li className="menu-item-has-children">
                      <a href="#">Blog</a>
                      <ul className="axil-submenu">
                        <li>
                          <a href="blog.html">Blog List</a>
                        </li>
                        <li>
                          <a href="blog-grid.html">Blog Grid</a>
                        </li>
                        <li>
                          <a href="blog-details.html">Standard Post</a>
                        </li>
                        <li>
                          <a href="blog-gallery.html">Gallery Post</a>
                        </li>
                        <li>
                          <a href="blog-video.html">Video Post</a>
                        </li>
                        <li>
                          <a href="blog-audio.html">Audio Post</a>
                        </li>
                        <li>
                          <a href="blog-quote.html">Quote Post</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="contact.html">Contact</a>
                    </li> */}
                  </ul>
                </nav>
                {/* <!-- End Mainmanu Nav --> */}
              </div>
              <div className="header-action">
                <ul className="action-list">
                  <li
                    className="axil-search d-xl-block d-none"
                    onClick={() => setShowHeaderSearch(true)}
                  >
                    <input
                      type="search"
                      className="placeholder product-search-input cursor-pointer"
                      name="search2"
                      id="search2"
                      // value=""
                      maxLength="128"
                      placeholder="Bạn cần tìm kiếm?"
                      autoComplete="off"
                      readOnly
                    />
                    <button type="submit" className="icon wooc-btn-search">
                      <i className="flaticon-magnifying-glass"></i>
                    </button>
                  </li>
                  {/* mobile */}
                  <li
                    className="axil-search d-xl-none d-block"
                    onClick={() => setShowHeaderSearch(true)}
                  >
                    <a
                      href={undefined}
                      className="header-search-icon"
                      title="Search"
                    >
                      <i className="flaticon-magnifying-glass"></i>
                    </a>
                  </li>
                  {/* <li className="wishlist">
                    <a href="wishlist.html">
                      <i className="flaticon-heart"></i>
                    </a>
                  </li> */}
                  <li className="shopping-cart">
                    <a
                      href={undefined}
                      className="cart-dropdown-btn cursor-pointer"
                      onClick={() => setShowCartDropdown(true)}
                    >
                      <span className="cart-count">3</span>
                      <i className="flaticon-shopping-cart"></i>
                    </a>
                  </li>
                  <li className="my-account">
                    <a
                      href={undefined}
                      className={
                        "cursor-pointer " + (toggle.account ? "open" : "")
                      }
                      onClick={() =>
                        setToggle({ ...toggle, account: !toggle.account })
                      }
                    >
                      <i className="flaticon-person"></i>
                    </a>
                    <div
                      className={
                        "my-account-dropdown " + (toggle.account ? "open" : "")
                      }
                    >
                      <span className="title">Đến Trang</span>
                      <ul>
                        <li>
                          <a href="my-account.html">Tài Khoản Của Bạn</a>
                        </li>
                        <li>
                          <a href="#">Theo Dõi Đơn Hàng</a>
                        </li>
                        <li>
                          <a href="#">Địa Chỉ Nhận Hàng</a>
                        </li>
                        <li>
                          <a href="#">Đăng Xuất</a>
                        </li>
                      </ul>
                      <div className="login-btn">
                        <a
                          href="sign-in.html"
                          className="axil-btn btn-bg-primary"
                        >
                          Đăng Nhập
                        </a>
                      </div>
                      <div className="reg-footer text-center">
                        Chưa có tài khoản?{" "}
                        <a href="sign-up.html" className="btn-link">
                          Đăng Ký.
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="axil-mobile-toggle">
                    <button className="menu-btn mobile-nav-toggler">
                      <i className="flaticon-menu-2"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Mainmenu Area --> */}
      </header>
    </>
  );
};

export default Header;
