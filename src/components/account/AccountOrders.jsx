import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  useLocation,
  useParams,
  useOutletContext,
  Link,
} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import * as moment from "moment";
import Select, { createFilter } from "react-select";
import {
  configSelectStyle,
  configSlugify,
  configFullOptionSunEditor,
} from "../../config/ConfigUI";
import { toast } from "react-toastify";
import { TOAST_MESSAGE, PAGE_SIZE } from "../../common/Variable";
import { configToast } from "../../config/ConfigUI";
import {
  ORDERS_STATUSES,
  ORDERS_FILTER_STATUSES,
  ORDERS_PAYMENTS,
  ORDERS_PAIDS,
} from "../../common/Variable";
import OrdersService from "../../services/orders.service";
import ConfirmDialog from "../shared/ConfirmDialog";

import "./Account.scss";
const TITLE = "Theo Dõi Đơn Hàng";

const AccountOrders = () => {
  const { customer } = useOutletContext();

  const [filterOrders, setFilterOrders] = useState("");
  const [orderses, setOrderses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemDelete, setItemDelete] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getOrderses = () => {
    OrdersService.searchByClient({
      status: filterOrders,
      customer: customer?.customer?._id,
      // page: page,
      // pageSize: pageSize,
    })
      .then((res) => {
        setOrderses(res.data.orderses);
        // setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteOrders = (id, ord) => {
    // let confirm = window.confirm("Bạn có chắc chắn xóa không?");
    // if (confirm) {
    if (!showConfirm) {
      setItemDelete(id);
      setOrders(ord);
      setShowConfirm(true);
      return;
    }
    setIsLoading(true);

    OrdersService.updateClient(itemDelete, { ...orders, status: 6 })
      .then((res) => {
        setOrderses(
          orderses.map((item) => (item._id == res.data._id ? res.data : item))
        );
        // setCount(count - 1);
        setIsLoading(false);
        setShowConfirm(false);

        toast.success(TOAST_MESSAGE.success.delete, configToast);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message, configToast);
      });
    // }
  };

  useEffect(() => {
    getOrderses();
  }, [filterOrders]);

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

      <ConfirmDialog
        onSave={deleteOrders}
        showConfirm={showConfirm}
        title={"Xác nhận xóa?"}
        onClose={() => setShowConfirm(false)}
        isLoading={isLoading}
        setIsLoading={(state) => setIsLoading(state)}
      />

      <div className="axil-dashboard-overview">
        <div className="welcome-text">Theo dõi đơn hàng,</div>
        <div>
          <div className="axil-dashboard-order">
            <div
              className="table-responsive"
              style={{ minHeight: "500px", padding: "20px 0" }}
            >
              <div className="form-group">
                {/* //select */}
                <label className="form-label italic">Trạng Thái (*)</label>

                <Select
                  styles={configSelectStyle}
                  name="status"
                  className={"shadow-lg border-[2px] "}
                  onChange={(item) => setFilterOrders(item ? item.value : "")}
                  value={ORDERS_FILTER_STATUSES.find(
                    (item) => item.value == filterOrders
                  )}
                  options={ORDERS_FILTER_STATUSES}
                  placeholder="Chọn trạng thái đơn bán"
                  filterOption={createFilter({
                    matchFrom: "any",
                    stringify: (option) => `${option.label}`,
                  })}
                  isSearchable={false}
                  isClearable={false}
                />
              </div>
              <div>
                <table className="table axil-product-table axil-cart-table mb--40">
                  <thead>
                    <tr>
                      <th scope="col" className="product-title fw-bold">
                        Mã Đơn Hàng
                      </th>
                      <th scope="col" className="product-title fw-bold">
                        Ngày Đặt
                      </th>
                      <th
                        scope="col"
                        className="product-remove w-[200px] fw-bold"
                      >
                        Trạng Thái
                      </th>
                      <th
                        scope="col"
                        className="product-remove w-[200px] fw-bold"
                      >
                        Tác Vụ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderses &&
                      orderses.map((orders, index) => (
                        <tr key={index}>
                          <td>{orders.ordersCode}</td>
                          <td>
                            {moment(orders.createdAt).format("DD/MM/YYYY")}
                          </td>
                          <td>
                            {ORDERS_STATUSES.map(
                              (status, index) =>
                                status.value == orders.status && (
                                  <div
                                    key={index}
                                    style={{
                                      color: status.color,
                                    }}
                                  >
                                    ({status.label})
                                  </div>
                                )
                            )}
                          </td>
                          <td style={{ paddingRight: "30px" }}>
                            <div className="flex justify-end">
                              <Link
                                to={"/orders/" + orders.ordersCode}
                                className="remove-wishlist updateCart-dropdown-btn"
                              >
                                <i className="fa-regular fa-eye"></i>
                              </Link>
                              {orders.status != 6 && (
                                <a
                                  href={undefined}
                                  className="remove-wishlist"
                                  onClick={() =>
                                    deleteOrders(orders._id, orders)
                                  }
                                >
                                  <i className="fa-regular fa-rectangle-xmark"></i>
                                </a>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountOrders;
