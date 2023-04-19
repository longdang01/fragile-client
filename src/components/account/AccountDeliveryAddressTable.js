import { useState, useMemo } from "react";
import { PAGE_SIZE } from "../../common/Variable";
import Pagination from "../../utils/pagination/Pagination";

const AccountDeliveryAddressTable = (props) => {
  const {
    deliveryAddresses,
    handleShow,
    deleteDeliveryAddress,
    // page,
    // pageSize,
    // count,
    // onSetPage,
  } = props;

  return (
    <>
      <div>
        <table className="table axil-product-table axil-cart-table mb--40">
          <thead>
            <tr>
              <th scope="col" className="product-title">
                Địa Chỉ
              </th>
              <th scope="col" className="product-remove w-[200px]">
                Trạng Thái
              </th>
              <th scope="col" className="product-remove w-[200px]">
                Tác Vụ
              </th>
            </tr>
          </thead>
          <tbody>
            {deliveryAddresses.length > 0 &&
              deliveryAddresses.map((deliveryAddress, index) => (
                <tr key={index}>
                  <td>{deliveryAddress.deliveryAddressName}</td>
                  <td>
                    {deliveryAddress.active == 1 ? (
                      <span style={{ color: "green" }}>Mặc Định</span>
                    ) : (
                      "Phụ"
                    )}
                  </td>
                  <td>
                    <div className="flex justify-end">
                      <a
                        href={undefined}
                        className="remove-wishlist updateCart-dropdown-btn"
                        onClick={() => handleShow(1, true, deliveryAddress._id)}
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </a>
                      <a
                        href={undefined}
                        className="remove-wishlist"
                        onClick={() =>
                          deleteDeliveryAddress(deliveryAddress._id)
                        }
                      >
                        <i className="uil uil-trash"></i>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AccountDeliveryAddressTable;
