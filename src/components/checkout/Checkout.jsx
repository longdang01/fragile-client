import { useEffect, useState, useMemo, useCallback } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { TOAST_MESSAGE, PAGE_SIZE } from "../../common/Variable";
import { configToast, configSelectStyle } from "../../config/ConfigUI";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { getOptions } from "../../common/Functions";
import { ORDERS_PAYMENTS } from "../../common/Variable";
import Select, { createFilter } from "react-select";
import CheckoutDeliveryAddress from "./CheckoutDeliveryAddress";
import CheckoutOrders from "./CheckoutOrders";
import Breadcrumb from "../shared/Breadcrumb";
import OrdersService from "../../services/orders.service";
import CartService from "../../services/cart.service";
import VnPayService from "../../services/vnPay.service";

const NEW_ORDERS_PAYMENTS = ORDERS_PAYMENTS.filter((item) => item.value != 1);
const TITLE = "Thanh Toán";
const TITLE_NAME = "Thanh Toán";

const Checkout = () => {
  const initData = {
    _id: "",
    customer: "",
    deliveryAddress: "",
    ordersCode: "",
    note: "",
    transportFee: "",
    total: "",
    status: "",
    payment: "",
    paid: "",
  };
  const [orders, setOrders] = useState(initData);
  const [isLoading, setIsLoading] = useState(false);
  const { customer, cartNumber, setCartNumber, loading } = useOutletContext();
  const [cart, setCart] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [totalItem, setTotalItem] = useState(0);

  const handleInput = (e, label, type) => {
    // type: 1: orders, 2: ordersDetail
    // check input tag or select tag
    const { name, value } = e.target ? e.target : { name: label, value: e };

    const state = { [name]: value };

    setOrders({ ...orders, ...state });
  };

  const handleCalcTotalPrice = () => {
    if (cart) {
      let result = 0;
      cart.cartDetails.forEach((item) => {
        if (item.active == 1) {
          if (item.color.discount) {
            if (item.color.discount.symbol == 1) {
              result +=
                Math.round(
                  Number(item.color.price) *
                    ((100 - Number(item.color.discount.value)) / 100)
                ) * item.quantity;
            } else {
              result +=
                Math.round(
                  Number(item.color.price) - Number(item.color.discount.value)
                ) * item.quantity;
            }
          } else {
            result += item.color.price * item.quantity;
          }
        }
      });
      setTotalPrice(result);
    }
  };

  const getCart = () => {
    if (customer) {
      CartService.search({
        customer: customer.customer?._id,
      })
        .then((res) => {
          setCart(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const createOrders = (orders) => {
    setIsLoading(true);

    orders.customer = customer && customer.customer?._id;
    // orders.deliveryAddress = ;
    orders.status = 2;
    orders.transportFee = 0;
    orders.paid = 2;
    orders.total = totalPrice;
    orders.details =
      cart && cart.cartDetails.filter((item) => item.active == 1);
    if (!orders.payment) {
      setIsLoading(false);
      toast.error("Chọn phương thức thanh toán", configToast);
      return;
    }

    if (orders.details?.length == 0) {
      setIsLoading(false);
      toast.error(
        "Danh sách mua đang trống, vui lòng mua hàng trước khi thanh toán",
        configToast
      );
      return;
    }
    console.log(orders);

    // if (!orders.deliveryAddress) {
    //   setIsLoading(false);
    //   toast.error("Vui lòng thêm thông tin địa chỉ nhận hàng", configToast);
    //   return;
    // }

    // if (orders.payment == 4) {
    //   console.log(orders);

    //   VnPayService.createPaymentUrl(orders)
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }\

    OrdersService.createClient(orders)
      .then((res) => {
        console.log(res);
        setCartNumber((prev) => prev - orders.details.length);
        setIsLoading(false);
        toast.success("Đặt hàng thành công!", configToast);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message, configToast);
      });
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    handleCalcTotalPrice();
    setTotalItem(cart?.cartDetails.filter((item) => item.active == 1).length);
  }, [cart?.cartDetails]);

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
      {/* Start Cart Area  */}
      <Breadcrumb currentPage="Thanh Toán" />

      {/* Start Checkout Area  */}
      <div className="axil-checkout-area axil-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <CheckoutDeliveryAddress />
              <div className="form-group" style={{ marginTop: "100px" }}>
                <label>Lời nhắn cho người bán hàng (tùy chọn)</label>
                <textarea
                  id="note"
                  rows="2"
                  name="note"
                  placeholder="Ghi chú về đơn đặt hàng của bạn."
                  onChange={handleInput}
                ></textarea>
              </div>
            </div>
            <div className="col-lg-6">
              <CheckoutOrders cart={cart} totalPrice={totalPrice} />

              <div className="axil-order-summery order-checkout-summery mt-5">
                <h5 className="title mb--20" style={{ fontWeight: "600" }}>
                  Đơn hàng của bạn
                </h5>
                <div>
                  <div className="order-payment-method">
                    <div className="form-group mt-5">
                      <label className="form-label italic">
                        Phương thức thanh toán (*)
                      </label>
                      <div className="single-payment">
                        <Select
                          styles={configSelectStyle}
                          name="payment"
                          className={"shadow-lg border-[2px] "}
                          onChange={(item) =>
                            handleInput(item ? item.value : "", "payment")
                          }
                          value={
                            orders.payment
                              ? NEW_ORDERS_PAYMENTS.find(
                                  (item) => item.value == orders.payment
                                )
                              : null
                          }
                          options={NEW_ORDERS_PAYMENTS}
                          placeholder="Chọn phương thức thanh toán"
                          filterOption={createFilter({
                            matchFrom: "any",
                            stringify: (option) => `${option.label}`,
                          })}
                          isSearchable={true}
                          isClearable={true}
                        />
                        {orders.payment == 3 && (
                          <div
                            style={{
                              textAlign: "justify",
                              color: "grey",
                              border: "2px solid #c2c2c2",
                              borderRadius: "5px",
                              padding: "20px",
                              marginTop: "20px",
                            }}
                            className="italic font-bold"
                          >
                            HƯỚNG DẪN THANH TOÁN CHUYỂN KHOẢN : * SỐ TÀI KHOẢN :
                            1030112475 * CHỦ TÀI KHOẢN : CÔNG TY TNHH MAVERIK
                            STUDIO * NGÂN HÀNG VIETCOMBANK ĐỂ ĐẢM BẢO VIỆC HOÀN
                            TẤT ĐƠN HÀNG NHANH CHÓNG, KHÁCH HÀNG VUI LÒNG CHUYỂN
                            KHOẢN NHANH 24/7. - KHI CHUYỂN KHOẢN BẮT BUỘC PHẢI
                            ĐỂ NỘI DUNG CHUYỂN KHOẢN : " MÃ ĐƠN HÀNG " ( Ví Dụ :
                            100305 ) - MỖI KHÁCH HÀNG CÓ TỐI ĐA 02 GIỜ ĐỂ HOÀN
                            TẤT VIỆC THANH TOÁN CHUYỂN KHOẢN. - CÁC ĐƠN HÀNG SAU
                            02 GIỜ KHÔNG CHUYỂN KHOẢN SẼ BỊ HUỶ ĐƠN HÀNG MÀ
                            KHÔNG CẦN BÁO TRƯỚC.
                          </div>
                        )}
                        <p className="payment__description">
                          {/* <div [innerHTML]="payment?.description"></div> */}

                          {/* Make your payment directly into our bank account. Please use
                  your Order ID as the payment reference. Your order will not be
                  shipped until the funds have cleared in our account. */}
                        </p>
                      </div>
                    </div>
                    {/* <div className="single-payment">
                <div className="input-group">
                  <input type="radio" id="radio5" name="payment" />
                  <label htmlFor="radio5">Cash on delivery</label>
                </div>
                <p>Pay with cash upon delivery.</p>
              </div> */}

                    {/* <div className="single-payment">
                <div
                  className="input-group justify-content-between align-items-center"
                >
                  <input type="radio" id="radio6" name="payment" checked />
                  <label htmlFor="radio6">Paypal</label> */}

                    {/* <img
                    src="./assets/images/others/payment.png"
                    alt="Paypal payment"
                  /> */}

                    {/* </div>
                <p>
                  Pay via PayPal; you can pay with your credit card if you don’t
                  have a PayPal account.
                </p>
              </div> */}
                  </div>

                  <button
                    onClick={() => createOrders(orders)}
                    className={
                      isLoading
                        ? "axil-btn btn-bg-primary checkout-btn button__loading loading capitalize"
                        : "axil-btn btn-bg-primary checkout-btn button__loading capitalize"
                    }
                    style={{ height: "60px" }}
                  >
                    {!isLoading && "Tiến hành thanh toán"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Checkout Area  */}
    </>
  );
};

export default Checkout;
