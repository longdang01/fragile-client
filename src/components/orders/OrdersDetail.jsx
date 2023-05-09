import {
  useLocation,
  useParams,
  useOutletContext,
  Link,
} from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { TOAST_MESSAGE, PAGE_SIZE } from "../../common/Variable";
import { configToast } from "../../config/ConfigUI";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Breadcrumb from "../shared/Breadcrumb";
import OrdersService from "../../services/orders.service";
import { regions } from "../../common/Region";
import {
  ORDERS_STATUSES,
  ORDERS_FILTER_STATUSES,
  ORDERS_PAYMENTS,
  ORDERS_PAIDS,
} from "../../common/Variable";
import "./OrdersDetail.scss";
const TITLE = "Chi Tiết Đơn Hàng";

const OrdersDetail = () => {
  const { customer, setCustomer, cartNumber, setCartNumber } =
    useOutletContext();
  const { ordersCode } = useParams();
  const [orders, setOrders] = useState();

  const getInfoDeliveryAddress = (id, type) => {
    if (type == 1) {
      const province = regions.find((item) => item.Id == id);
      return province;
    }

    if (type == 2) {
      const districts = regions.map((item) => item.Districts).flat(1);
      const district = districts.find((item) => item.Id == id);
      return district;
    }

    if (type == 3) {
      const districts = regions.map((item) => item.Districts).flat(1);
      const wards = districts.map((item) => item.Wards).flat(1);
      const ward = wards.find((item) => item.Id == id);
      return ward;
    }
  };

  const getOrders = () => {
    OrdersService.search({
      searchData: ordersCode,
      // page: page,
      // pageSize: pageSize,
    })
      .then((res) => {
        setOrders(res.data.orderses[0]);
        // setOrderses(res.data.orderses);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOrders();
  }, [ordersCode]);

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

      <Breadcrumb currentPage="Chi Tiết Đơn Hàng" />

      {orders && (
        <div className="orders__detail-page">
          <div className="axil-single-product-area bg-color-white">
            <div className="single-product-thumb axil-section-gap pb--30">
              <div className="container">
                <div className="row row--50">
                  <div className="col-lg-12 mb--40">
                    <div className="single-product-content">
                      <div className="inner">
                        <h2 className="product-title mb--40">
                          {"# " + orders.ordersCode}
                        </h2>
                        <div className="price-amount">
                          {(
                            Number(orders.total) + Number(orders.transportFee)
                          ).toLocaleString() + " VND"}
                        </div>
                        <p className="description mb--40">
                          {orders.note && "Note: " + orders.note}
                        </p>
                        <div className="product-action-wrapper d-flex-center">
                          {/* <ul className="product-action action-style-two d-flex-center mb--0">
                            <li className="add-to-cart"> */}

                          {ORDERS_FILTER_STATUSES.map(
                            (status, index) =>
                              status.value == orders.status && (
                                <a
                                  href={undefined}
                                  className="axil-btn btn-bg-primary orders-status"
                                  key={index}
                                  style={{
                                    color: "#fff",
                                    backgroundColor: status.backgroundColor,
                                  }}
                                >
                                  {status.label}
                                </a>
                              )
                          )}
                          {/* </li>
                          </ul> */}
                        </div>
                        <ul className="orders-info">
                          <li>
                            Thông Tin Người Nhận:{" "}
                            {orders.deliveryAddress.consigneeName},
                            {" " + orders.deliveryAddress.consigneePhone},{" "}
                            {orders.deliveryAddress.country == 1
                              ? `${
                                  orders.deliveryAddress.deliveryAddressName
                                }, ${
                                  getInfoDeliveryAddress(
                                    orders.deliveryAddress.province,
                                    1
                                  )?.Name
                                }, 
                          ${
                            getInfoDeliveryAddress(
                              orders.deliveryAddress.district,
                              2
                            )?.Name
                          }, 
                          ${
                            getInfoDeliveryAddress(
                              orders.deliveryAddress.ward,
                              3
                            )?.Name
                          }`
                              : orders.deliveryAddress.deliveryAddressName}
                          </li>
                          <li>
                            Phương Thức Thanh Toán:{" "}
                            {ORDERS_PAYMENTS.map(
                              (item, index) =>
                                orders.payment == item.value && (
                                  <span key={index}>{item.label}</span>
                                )
                            )}
                          </li>
                          <li>
                            Trạng Thái Thanh Toán:{" "}
                            {ORDERS_PAIDS.map(
                              (item, index) =>
                                orders.paid == item.value && (
                                  <span
                                    key={index}
                                    style={{
                                      color: orders.paid == 1 ? "green" : "red",
                                    }}
                                  >
                                    {item.label}
                                  </span>
                                )
                            )}
                          </li>
                          <li>
                            Tổng Tiền Hàng:{" "}
                            {Number(orders.total).toLocaleString() + " VND"}
                          </li>
                          <li>
                            Phí Vận Chuyển:{" "}
                            {Number(orders.transportFee).toLocaleString() +
                              " VND"}
                          </li>
                        </ul>

                        <div className="product-features">
                          <ul className="cart-item-list">
                            {orders.ordersDetails &&
                              orders.ordersDetails.length > 0 &&
                              orders.ordersDetails.map((item, index) => (
                                <li
                                  className="cart-item orders-detail-item"
                                  key={index}
                                >
                                  <div className="item-img">
                                    <Link to={"/" + item.product.path}>
                                      <img
                                        src={item.color.images[0].picture}
                                        className="orders-image"
                                      />
                                    </Link>
                                  </div>
                                  <div className="item-content orders-content">
                                    <h3 className="item-title">
                                      <Link
                                        to={"/" + item.product.path}
                                        className="font-bold"
                                      >
                                        {item.product.productName}
                                      </Link>
                                    </h3>
                                    <div
                                      className="item-price italic font-bold"
                                      style={{ color: "grey" }}
                                    >
                                      {item.color.colorName}/
                                      {item.size.sizeName}
                                      /x
                                      {item.quantity}/
                                      {Number(item.price).toLocaleString()}{" "}
                                    </div>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End .single-product-thumb */}
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersDetail;
