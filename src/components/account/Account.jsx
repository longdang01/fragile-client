import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  useLocation,
  useParams,
  Outlet,
  useOutletContext,
} from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import Breadcrumb from "../shared/Breadcrumb";
import SideBar from "./SideBar";

const Account = () => {
  const {
    customer,
    setCustomer,
    cartNumber,
    setCartNumber,
    customerName,
    setCustomerName,
  } = useOutletContext();

  useEffect(() => {
    // setCustomer(null);
  });
  return (
    <>
      <Breadcrumb currentPage="Tài Khoản" />
      <div className="axil-dashboard-area axil-section-gap">
        <div className="container">
          <div className="axil-dashboard-warp">
            <div className="axil-dashboard-author">
              <div className="media">
                {/* <!-- <div className="thumbnail">
            <img src="./assets/images/product/author1.png" alt="Hello Annie" />
          </div> --> */}
                <div className="media-body">
                  {/* <!-- <h5 className="title mb-0"></h5> -->
            <!-- <span className="joining-date">Zeus Studio Member Since Sep 2020</span> --> */}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-3 col-md-4">
                {/* <app-sidebar></app-sidebar> */}
                <SideBar />
              </div>
              <div className="col-xl-9 col-md-8">
                <Outlet
                  context={{
                    customer,
                    setCustomer,
                    cartNumber,
                    setCartNumber,
                    customerName,
                    setCustomerName,
                  }}
                />
                {/* <router-outlet></router-outlet> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
