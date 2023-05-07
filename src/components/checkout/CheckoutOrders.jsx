import { useEffect, useState, useMemo, useCallback } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { TOAST_MESSAGE, PAGE_SIZE } from "../../common/Variable";
import { configToast, configSelectStyle } from "../../config/ConfigUI";
import { getOptions } from "../../common/Functions";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ORDERS_PAYMENTS } from "../../common/Variable";
import Select, { createFilter } from "react-select";

const CheckoutOrders = ({ cart, totalPrice }) => {
  // const [cart, setCart] = useState();
  // const [totalPrice, setTotalPrice] = useState();
  const [totalItem, setTotalItem] = useState(0);

  // const getCart = () => {
  //   if (customer) {
  //     CartService.search({
  //       customer: customer.customer?._id,
  //     })
  //       .then((res) => {
  //         setCart(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };

  // useEffect(() => {
  //   getCart();
  // }, []);

  // useEffect(() => {
  //   handleCalcTotalPrice();
  //   setTotalItem(cart?.cartDetails.filter((item) => item.active == 1).length);
  // }, [cart?.cartDetails]);

  return (
    <>
      <div className="axil-order-summery order-checkout-summery">
        <h5 className="title mb--20" style={{ fontWeight: "600" }}>
          Đơn hàng của bạn
        </h5>
        <div className="summery-table-wrap">
          <table className="table summery-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {cart &&
                cart.cartDetails.map(
                  (item, index) =>
                    item.active == 1 && (
                      <tr className="order-product" key={index}>
                        <td>
                          <div style={{ fontSize: "14px", fontWeight: "600" }}>
                            {item.product.productName}
                          </div>
                          <div style={{ color: "grey", fontSize: "13px" }}>
                            {item.color.colorName}/{item.size.sizeName}/x
                            {item.quantity}/
                            {item.color.discount
                              ? item.color.discount.symbol == 1
                                ? Math.round(
                                    Number(item.color.price) *
                                      ((100 -
                                        Number(item.color.discount.value)) /
                                        100)
                                  ).toLocaleString()
                                : Math.round(
                                    Number(item.color.price) -
                                      Number(item.color.discount.value)
                                  ).toLocaleString()
                              : item.color.price.toLocaleString()}{" "}
                          </div>
                        </td>
                        <td>
                          {item.color.discount
                            ? item.color.discount.symbol == 1
                              ? (
                                  Math.round(
                                    Number(item.color.price) *
                                      ((100 -
                                        Number(item.color.discount.value)) /
                                        100)
                                  ) * item.quantity
                                ).toLocaleString()
                              : (
                                  Math.round(
                                    Number(item.color.price) -
                                      Number(item.color.discount.value)
                                  ) * item.quantity
                                ).toLocaleString()
                            : (
                                item.color.price * item.quantity
                              ).toLocaleString()}
                        </td>
                      </tr>
                    )
                )}
              <tr className="order-subtotal">
                <td style={{ fontWeight: "700" }}>Thành tiền</td>
                <td style={{ fontWeight: "700" }}>
                  {totalPrice && totalPrice.toLocaleString()} VND
                  {/* cho{" "} {totalItem} Sản Phẩm */}
                </td>
              </tr>
            </tbody>
          </table>
          <div
            style={{ textAlign: "justify", color: "grey" }}
            className="italic font-bold"
          >
            Lưu ý: Tổng tiền chưa bao gồm phí vận chuyển, quý khách vui lòng
            thanh toán phí vận chuyển khi nhận hàng. Phí vận chuyển sẽ được cập
            nhật khi chúng tôi giao cho bên vận chuyển. Vui lòng kiểm tra đơn
            hàng của bạn trong mục account để xem phí vận chuyển được cập nhật
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutOrders;
