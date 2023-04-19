import { useEffect, useState, useMemo, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { TOAST_MESSAGE, PAGE_SIZE } from "../../common/Variable";
import { configToast } from "../../config/ConfigUI";
import { Helmet, HelmetProvider } from "react-helmet-async";
import DeliveryAddressService from "../../services/deliveryAddress.service";
import ConfirmDialog from "../shared/ConfirmDialog";

import AccountDeliveryAddressModal from "./AccountDeliveryAddressModal";
import AccountDeliveryAddressTable from "./AccountDeliveryAddressTable";
import "./Account.scss";

const TITLE = "Địa Chỉ Nhận Hàng";
const AccountDeliveryAddress = () => {
  const [customer] = useOutletContext();

  const [deliveryAddresses, setDeliveryAddresses] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemDelete, setItemDelete] = useState();
  const [action, setAction] = useState(0);
  const [searchData, setSearchData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    setSearchData(e);
  };

  const handleShow = async (action, show, id) => {
    const data = id ? await getDeliveryAddress(id) : {};
    setDeliveryAddress(data);
    setAction(action);
    setShow(show);
  };

  const getDeliveryAddresses = () => {
    DeliveryAddressService.search({
      searchData: searchData,
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
        console.log(res);
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

  const deleteDeliveryAddress = (id) => {
    // let confirm = window.confirm("Bạn có chắc chắn xóa không?");
    // if (confirm) {
    if (!showConfirm) {
      setItemDelete(id);
      setShowConfirm(true);
      return;
    }
    setIsLoading(true);
    DeliveryAddressService.remove(itemDelete)
      .then((res) => {
        setDeliveryAddresses(
          deliveryAddresses.filter(
            (deliveryAddress) => deliveryAddress._id !== itemDelete
          )
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
    getDeliveryAddresses();
  }, [
    searchData,
    // , page, pageSize, count
  ]);

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

      <ConfirmDialog
        onSave={deleteDeliveryAddress}
        showConfirm={showConfirm}
        title={"Xác nhận xóa?"}
        onClose={() => setShowConfirm(false)}
        isLoading={isLoading}
        setIsLoading={(state) => setIsLoading(state)}
      />

      <div className="axil-dashboard-overview">
        <div className="welcome-text">Địa Chỉ Nhận Hàng,</div>
        <div className="flex justify-end">
          <button
            className={"btn btn-add-address"}
            onClick={() => handleShow(0, true, "")}
          >
            Thêm Địa Chỉ
          </button>
        </div>
        <div>
          <AccountDeliveryAddressTable
            deliveryAddresses={deliveryAddresses}
            deleteDeliveryAddress={deleteDeliveryAddress}
            handleShow={handleShow}
          />
        </div>
      </div>
    </>
  );
};

export default AccountDeliveryAddress;
