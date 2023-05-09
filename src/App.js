import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/home/Home";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import Product from "./components/product/Product";
import ProductDetail from "./components/product/ProductDetail";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import VerifyAccount from "./components/user/VerifyAccount";
import AccountDashboard from "./components/account/AccountDashboard";
import AccountProfile from "./components/account/AccountProfile";
import AccountChangePassword from "./components/account/AccountChangePassword";
import AccountDeliveryAddress from "./components/account/AccountDeliveryAddress";
import Account from "./components/account/Account";
import PolicySupport from "./components/policy-support/PolicySupport";
import OrdersDetail from "./components/orders/OrdersDetail";
import Collection from "./components/collection/Collection";
import CollectionDetail from "./components/collection/CollectionDetail";
import Introduce from "./components/about/Introduce";
import Contact from "./components/about/Contact";
import AuthGuard from "./guard/AuthGuard";
import AccountOrders from "./components/account/AccountOrders";
import SupportPurchase from "./components/policy-support/SupportPurchase";
import SupportFaq from "./components/policy-support/SupportFaq";
import PolicyPrivacy from "./components/policy-support/PolicyPrivacy";
import PolicyUsage from "./components/policy-support/PolicyUsage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              // <AuthGuard>
              <Layout />
              // </AuthGuard>
            }
          >
            <Route path="/" element={<Navigate to="/home" />}></Route>
            {/* <Route index element={<Dashboard />}></Route> */}
            <Route path="home" element={<Home />}></Route>
            <Route path="cart" element={<Cart />}></Route>
            <Route path="checkout" element={<Checkout />}></Route>
            <Route path="about/introduce" element={<Introduce />}></Route>
            <Route path="about/contact" element={<Contact />}></Route>
            <Route path="orders/:ordersCode" element={<OrdersDetail />}></Route>
            <Route path="collection/all" element={<Collection />}></Route>
            <Route
              path="collection/:path"
              element={<CollectionDetail />}
            ></Route>

            <Route
              path="account"
              element={
                <AuthGuard>
                  <Account />
                </AuthGuard>
              }
            >
              {/* <Route
                path=""
                element={<Navigate to="/account/dashboard" />}
              ></Route> */}
              <Route path="dashboard" element={<AccountDashboard />}></Route>
              <Route path="profile" element={<AccountProfile />}></Route>
              <Route
                path="change-password"
                element={<AccountChangePassword />}
              ></Route>
              <Route
                path="delivery-address"
                element={<AccountDeliveryAddress />}
              ></Route>
              <Route path="orders" element={<AccountOrders />}></Route>
            </Route>

            <Route path="support" element={<PolicySupport />}>
              <Route path="purchase" element={<SupportPurchase />}></Route>
              <Route path="faq" element={<SupportFaq />}></Route>
            </Route>

            <Route path="policy" element={<PolicySupport />}>
              <Route path="privacy" element={<PolicyPrivacy />}></Route>
              <Route path="usage" element={<PolicyUsage />}></Route>
            </Route>

            {/* routes search, get by category, subcategory */}
            <Route
              path="/:previous/:parent/:child"
              element={<Product />}
            ></Route>
            <Route path="/:previous/:parent" element={<Product />}></Route>
            <Route
              path="search"
              // path="/search?searchTerm=:searchData"
              element={<Product />}
            ></Route>

            <Route path="/:path" element={<ProductDetail />}></Route>

            {/* routes auth login/register */}
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="forgot-password" element={<ForgotPassword />}></Route>
            <Route
              path="reset-password/:id/:token"
              element={<ResetPassword />}
            ></Route>
            <Route path="verify/:id/:token" element={<VerifyAccount />}></Route>
          </Route>

          {/* <Route path="not-found" element={<NotFound />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
