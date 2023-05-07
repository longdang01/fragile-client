import { useEffect, useState, useMemo, useCallback } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { TOAST_MESSAGE, PAGE_SIZE } from "../../common/Variable";
import { configToast } from "../../config/ConfigUI";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { regions } from "../../common/Region";
import DeliveryAddressService from "../../services/deliveryAddress.service";
import AccountDeliveryAddressModal from "../account/AccountDeliveryAddressModal";

const CheckoutDeliveryAddress = () => {
  const [deliveryAddresses, setDeliveryAddresses] = useState([]);
  const [searchData, setSearchData] = useState("");

  const { customer } = useOutletContext();

  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemDelete, setItemDelete] = useState();
  const [action, setAction] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleShow = async (action, show, id) => {
    const data = id ? await getDeliveryAddress(id) : {};
    setDeliveryAddress(data);
    setAction(action);
    setShow(show);
  };

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

  const getDeliveryAddresses = () => {
    DeliveryAddressService.search({
      searchData: searchData,
      customer: customer?.customer?._id,

      // page: page,
      // pageSize: pageSize,
    })
      .then((res) => {
        // console.log(res.data);
        setDeliveryAddresses(res.data);
        // setDeliveryAddresses(res.data.deliveryAddresses);
        // setCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDeliveryAddress = async (id) => {
    const data = await DeliveryAddressService.getById(id);
    return data.data;
  };

  const createDeliveryAddress = (deliveryAddress) => {
    DeliveryAddressService.create(deliveryAddress)
      .then((res) => {
        setDeliveryAddresses(res.data.deliveryAddresses);

        // setDeliveryAddresses([...deliveryAddresses, res.data]);

        // setCount(count + 1);
        setIsLoading(false);
        setShow(false);
        toast.success(TOAST_MESSAGE.success.create, configToast);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message, configToast);
      });
  };

  const updateDeliveryAddress = (id, deliveryAddress) => {
    deliveryAddress.active = 1;

    DeliveryAddressService.update(id, deliveryAddress)
      .then((res) => {
        setDeliveryAddresses(res.data.deliveryAddresses);

        // setDeliveryAddresses(
        //   deliveryAddresses.map((item) =>
        //     item._id == res.data._id ? res.data : item
        //   )
        // );
        setIsLoading(false);
        setShow(false);
        toast.success(TOAST_MESSAGE.success.update, configToast);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message, configToast);
      });
  };

  useEffect(() => {
    getDeliveryAddresses();
  }, [
    searchData,
    // , page, pageSize, count
  ]);

  return (
    <>
      <AccountDeliveryAddressModal
        customer={customer}
        show={show}
        onClose={() => setShow(false)}
        action={action}
        deliveryAddress={deliveryAddress}
        createDeliveryAddress={createDeliveryAddress}
        updateDeliveryAddress={updateDeliveryAddress}
        isLoading={isLoading}
        setIsLoading={(state) => setIsLoading(state)}
      />

      <div className="axil-checkout-billing">
        <div className="summery-table-wrap axil-order-summery">
          <div className="mb--40">
            <h4
              className="title"
              style={{ marginBottom: "10px", fontWeight: "600" }}
            >
              Danh sách địa chỉ nhận hàng
            </h4>
            <Link
              to="/account/delivery-address"
              className="italic"
              style={{ color: "var(--color-primary)" }}
            >
              Đi đến trang tài khoản của bạn để quản lý thông tin
            </Link>
          </div>
          <div className="delivery-wrap">
            <button
              className="btn btn-primary btn-setDefault w-full"
              style={{
                width: "100%",
                fontSize: "14px",
                margin: "20px 0",
              }}
              onClick={() => handleShow(0, true, "")}
            >
              Thêm địa chỉ khác
            </button>
            <table className="table summery-table table-delivery">
              <thead>
                <tr>
                  <th style={{ padding: 0 }}>Địa Chỉ</th>
                  <th style={{ padding: 0 }}>Trạng Thái</th>
                </tr>
              </thead>
              <tbody>
                {deliveryAddresses.length > 0 &&
                  deliveryAddresses.map((deliveryAddress, index) => (
                    <tr className="order-product" key={index}>
                      <td
                        style={{
                          width: "70%",
                          fontSize: "14px",
                          paddingRight: "70px",
                        }}
                      >
                        {deliveryAddress.consigneeName},
                        {" " + deliveryAddress.consigneePhone},{" "}
                        {deliveryAddress.country == 1
                          ? `${deliveryAddress.deliveryAddressName}, ${
                              getInfoDeliveryAddress(
                                deliveryAddress.province,
                                1
                              )?.Name
                            }, 
                          ${
                            getInfoDeliveryAddress(deliveryAddress.district, 2)
                              ?.Name
                          }, 
                          ${
                            getInfoDeliveryAddress(deliveryAddress.ward, 3)
                              ?.Name
                          }`
                          : deliveryAddress.deliveryAddressName}
                      </td>
                      <td style={{ width: "30%", fontSize: "14px" }}>
                        {deliveryAddress.active == 1 && (
                          <p
                            style={{
                              fontWeight: "bold",
                              color: "var(--color-primary)",
                              width: "100%",
                              fontSize: "14px",
                            }}
                            className="w-full"
                          >
                            Mặc Định
                          </p>
                        )}
                        {deliveryAddress.active == 2 && (
                          <button
                            className="btn btn-primary btn-setDefault w-full"
                            style={{
                              width: "100%",
                              fontSize: "14px",
                            }}
                            onClick={() =>
                              updateDeliveryAddress(
                                deliveryAddress._id,
                                deliveryAddress
                              )
                            }
                          >
                            Thiết Lập Mặc Định
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutDeliveryAddress;
