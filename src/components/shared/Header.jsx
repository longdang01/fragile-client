// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo_white from "../../assets/images/logo-white.jpg";
import logo_black from "../../assets/images/logo-black.jpg";
import mvr_logo from "../../assets/images/mvr-logo.jpg";
import { LANGUAGES } from "../../common/Variable";
import UserService from "../../services/user.service";
const Header = ({
  setShowCartDropdown,
  setShowHeaderSearch,
  categories,
  loading,
  setLoading,
  setCustomer,
  customerName,
  cartNumber,
  setCartNumber,
  customer,
}) => {
  const hasToken = localStorage.getItem("TOKEN");

  let navigate = useNavigate();
  const [toggle, setToggle] = useState({
    language: false,
    account: false,
  });

  const [language, setLanguage] = useState(LANGUAGES[0]);

  //Header sticky
  const handleHeaderSticky = () => {
    const bodyElm = document.querySelector("body");
    if (bodyElm.classList.contains("sticky-header")) {
      const stickyPlaceHolder = document.querySelector(
        "#axil-sticky-placeholder"
      );
      const menu = document.querySelector(".axil-mainmenu");
      const menuH = menu && menu.scrollHeight;

      const topHeaderItem = document.querySelector(".axil-header-top");
      const topHeaderH = topHeaderItem && (topHeaderItem.scrollHeight || 0);
      const targetScroll = topHeaderH;

      if (window.scrollY > targetScroll) {
        if (menu) menu.classList.add("axil-sticky");
        if (stickyPlaceHolder) stickyPlaceHolder.style.height = menuH;
      } else {
        if (menu) menu.classList.remove("axil-sticky");
        if (stickyPlaceHolder) stickyPlaceHolder.style.height = 0;
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("ROLE");
    localStorage.removeItem("CUSTOMER");
    setCartNumber(0);
    setCustomer(null);
    navigate("/login");
  };

  // Sticky Menu Area
  useEffect(() => {
    window.addEventListener("scroll", handleHeaderSticky);
    return () => {
      window.removeEventListener("scroll", handleHeaderSticky);
    };
  });

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
                    {customer && !loading && hasToken ? (
                      <>
                        <li className="text-sub font-bold">
                          <i className="fa-solid fa-hand"></i> Hi,{" "}
                          {customer?.customer?.customerName}
                          {/* {customerName} */}
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to="/register">Đăng Ký</Link>
                        </li>
                        <li>
                          <Link to="/login">Đăng Nhập</Link>
                        </li>
                      </>
                    )}
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
                <Link to="/" className="logo logo-dark">
                  <img
                    src={logo_black}
                    alt="Site Logo"
                    className="w-[160px] h-[40px]"
                  />
                </Link>
                <Link to="/" className="logo logo-light">
                  <img
                    src={logo_white}
                    alt="Site Logo"
                    className="w-[160px] h-[40px]"
                  />
                </Link>
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
                      <Link to="/">Trang Chủ</Link>
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
                      <a href={undefined} style={{ color: "#292930" }}>
                        Cửa Hàng
                      </a>
                      <ul className="axil-submenu">
                        {categories &&
                          categories.map((category, index) => (
                            <li key={index}>
                              <Link
                                to={"/c/" + category.path}
                                className="cursor-pointer"
                              >
                                {category.categoryName}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </li>
                    <li className="">
                      <a href="#">Bộ Sưu Tập</a>
                    </li>
                    <li>
                      <a href="about-us.html">Liên Hệ</a>
                    </li>
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
                      <span className="cart-count">{cartNumber || 0}</span>
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
                      {customer ? (
                        <>
                          <ul>
                            <li>
                              <Link to="/account/profile">
                                Tài Khoản Của Bạn
                              </Link>
                            </li>
                            <li>
                              <Link to="/account/orders">
                                Theo Dõi Đơn Hàng
                              </Link>
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
                            <li>
                              <a href="#" onClick={logout}>
                                Đăng Xuất
                              </a>
                            </li>
                          </ul>
                        </>
                      ) : (
                        <>
                          <div className="login-btn">
                            <Link
                              to="/login"
                              className="axil-btn btn-bg-primary"
                            >
                              Đăng Nhập
                            </Link>
                          </div>
                          <div className="reg-footer text-center">
                            Chưa có tài khoản?{" "}
                            <Link to="/register" className="btn-link">
                              Đăng Ký.
                            </Link>
                          </div>
                        </>
                      )}
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
