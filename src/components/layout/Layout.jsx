import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserService from "../../services/user.service";
import { useEffect, useState } from "react";
import Header from "../shared/Header";
import CartDropdown from "../shared/CartDropdown";
import HeaderSearch from "../shared/HeaderSearch";
import Footer from "../shared/Footer";
import CategoryService from "../../services/category.service";
import CartService from "../../services/cart.service";
import LoadingSpinner from "../../utils/loading-spinner/LoadingSpinner";

const Layout = () => {
  const { pathname } = useLocation();

  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showHeaderSearch, setShowHeaderSearch] = useState(false);
  const [categories, setCategories] = useState([]);
  const [customer, setCustomer] = useState();
  const [cartNumber, setCartNumber] = useState();

  const hasToken = localStorage.getItem("TOKEN");
  let [loading, setLoading] = useState(true);
  const getCustomer = async () => {
    const data = hasToken && (await UserService.getMe());
    setCustomer(data && data.data);
  };

  const getCategories = () => {
    CategoryService.search({
      searchData: "",
      // page: page,
      // pageSize: pageSize,
    })
      .then((res) => {
        // console.log(res.data);
        setCategories(res.data);
        // setCategories(res.data.categories);
        // setCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCart = () => {
    CartService.search({
      customer: customer.customer?._id,
    })
      .then((res) => {
        setCartNumber(res.data.cartDetails.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategories();
    getCustomer();
  }, [hasToken, customer?.customer?.customerName]);

  useEffect(() => {
    if (customer) getCart();
    // else setCartNumber(0);
  }, [customer, cartNumber]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }, [pathname]);

  return (
    <>
      {loading ? (
        <LoadingSpinner loading={loading} />
      ) : (
        <>
          {/* <p className="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p> */}
          {/* <a href="#top" className="back-to-top" id="backto-top"><i className="fal fa-arrow-up"></i></a> */}
          {/* Start Header */}
          <Header
            setShowCartDropdown={(state) => setShowCartDropdown(state)}
            setShowHeaderSearch={(state) => setShowHeaderSearch(state)}
            setCustomer={(customer) => setCustomer(customer)}
            setCartNumber={(num) => setCartNumber(num)}
            categories={categories}
            cartNumber={cartNumber}
            loading={loading}
            setLoading={(state) => setLoading(state)}
            customer={customer}
          />
          {/*  End Header */}
          <main className="main-wrapper">
            <Outlet
              context={[
                customer,
                setCustomer,
                cartNumber,
                setCartNumber,
                loading,
                setLoading,
              ]}
              // setLoading={(loading) => setLoading(loading)}
              // loading={loading}
            />
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
            customer={customer}
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
      )}
    </>
  );
};

export default Layout;
