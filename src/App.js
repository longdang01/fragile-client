import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/home/Home";
import Cart from "./components/cart/Cart";
import Product from "./components/product/Product";
import ProductDetail from "./components/product/ProductDetail";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import AccountDashboard from "./components/account/AccountDashboard";
import AccountProfile from "./components/account/AccountProfile";
import AccountChangePassword from "./components/account/AccountChangePassword";
import AccountDeliveryAddress from "./components/account/AccountDeliveryAddress";
import Account from "./components/account/Account";

import AuthGuard from "./guard/AuthGuard";

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
          </Route>

          {/* <Route path="not-found" element={<NotFound />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
