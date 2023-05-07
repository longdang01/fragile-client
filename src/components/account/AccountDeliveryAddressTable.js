import { useState, useEffect, useMemo } from "react";
import { PAGE_SIZE } from "../../common/Variable";
import Pagination from "../../utils/pagination/Pagination";
import { regions } from "../../common/Region";

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

  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();

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

  useEffect(() => {}, []);

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
                  <td>
                    {deliveryAddress.consigneeName},
                    {" " + deliveryAddress.consigneePhone},{" "}
                    {deliveryAddress.country == 1
                      ? `${deliveryAddress.deliveryAddressName}, ${
                          getInfoDeliveryAddress(deliveryAddress.province, 1)
                            ?.Name
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
