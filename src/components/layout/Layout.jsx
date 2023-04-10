import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserService from "../../services/user.service";
import { useEffect, useState } from "react";
import Header from "../shared/Header";
import CartDropdown from "../shared/CartDropdown";
import HeaderSearch from "../shared/HeaderSearch";
import Footer from "../shared/Footer";

const Layout = () => {
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showHeaderSearch, setShowHeaderSearch] = useState(false);

  return (
    <>
      {/* <p className="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p> */}
      {/* <a href="#top" className="back-to-top" id="backto-top"><i className="fal fa-arrow-up"></i></a> */}
      {/* Start Header */}
      <Header
        setShowCartDropdown={(state) => setShowCartDropdown(state)}
        setShowHeaderSearch={(state) => setShowHeaderSearch(state)}
      />
      {/*  End Header */}
      <main className="main-wrapper">
        <Outlet />
      </main>

      {/* Start Footer Area  */}
      <Footer />
      {/* End Footer Area  */}

      {/* Product Quick View Modal Start  */}
      {/* Product Quick View Modal End  */}

      {/* Header Search Modal Start */}

      {/* Header Search Modal End */}
      <HeaderSearch
        showHeaderSearch={showHeaderSearch}
        setShowHeaderSearch={(state) => setShowHeaderSearch(state)}
      />

      {/* Cart Dropdown Modal Start */}
      <CartDropdown
        showCartDropdown={showCartDropdown}
        setShowCartDropdown={(state) => setShowCartDropdown(state)}
      />
      {/* Cart Dropdown Modal End */}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Layout;
