const LANGUAGES = [
  {
    id: 1,
    name: "Vietnamese",
  },
  // {
  //   id: 2,
  //   name: "English",
  // },
];

const CURRENCIES = [
  {
    id: 1,
    name: "VND",
  },
  // {
  //   id: 2,
  //   name: "English",
  // },
];

const PAGE_SIZE = 12;

const TOAST_MESSAGE = {
  success: {
    create: "Thêm thành công",
    update: "Cập nhật thành công",
    delete: "Xóa thành công",
  },
  error: {
    create: "Thêm thất bại",
    update: "Cập nhật thất bại",
    delete: "Xóa thất bại",
  },
};

const ORDERS_STATUSES = [
  {
    label: "Đã giao & thành công",
    value: "1",
    color: "#00a11f",
    backgroundColor: "#00a11f",
  },
  {
    label: "Chờ xác nhận",
    value: "2",
    color: "#955251",
    backgroundColor: "#955251",
  },
  {
    label: "Đã xác nhận & đang chuẩn bị hàng",
    value: "3",
    color: "#009473",
    backgroundColor: "#009473",
  },
  {
    label: "Đã chuẩn bị hàng & chờ bên vận chuyển lấy hàng",
    value: "4",
    color: "#dda11b",
    backgroundColor: "#dda11b",
  },
  {
    label: "Đã đưa cho bên vận chuyển và đang giao",
    value: "5",
    color: "#01018d",
    backgroundColor: "#01018d",
  },
  {
    label: "Hủy đơn hàng",
    value: "6",
    color: "#ff2000",
    backgroundColor: "#ff2000",
  },
];

const ORDERS_PAYMENTS = [
  {
    label: "Thanh toán trực tiếp",
    value: "1",
  },
  {
    label: "Thanh toán khi nhận hàng",
    value: "2",
  },
  {
    label: "Chuyển khoản",
    value: "3",
  },
];

const ROLES = [
  {
    label: "Quản trị viên",
    value: "1",
  },
  {
    label: "Nhân viên nhập hàng",
    value: "2",
  },
  {
    label: "Nhân viên bán hàng",
    value: "3",
  },
  {
    label: "Nhân viên media",
    value: "4",
  },
];

const ORDERS_PAIDS = [
  {
    label: "Đã thanh toán",
    value: "1",
  },
  {
    label: "Chưa thanh toán",
    value: "2",
  },
];

const INVOICE_PAIDS = [
  {
    label: "Đã thanh toán",
    value: "1",
  },
  {
    label: "Chưa thanh toán",
    value: "2",
  },
];

const CARTDETAIL_STATUS = [
  {
    label: "Chọn Mua",
    value: "1",
  },
  {
    label: "Bỏ Chọn",
    value: "2",
  },
];

const COUNTRY_LIST = [
  {
    label: "Việt Nam",
    value: "1",
  },
  {
    label: "Khác",
    value: "2",
  },
];

const DELIVERYADDRESS_STATUS = [
  {
    label: "Mặc Định",
    value: "1",
  },
  {
    label: "Không Mặc Định",
    value: "2",
  },
];

export {
  LANGUAGES,
  // CURRENCIES,
  PAGE_SIZE,
  TOAST_MESSAGE,
  ORDERS_STATUSES,
  ORDERS_PAYMENTS,
  ORDERS_PAIDS,
  INVOICE_PAIDS,
  CARTDETAIL_STATUS,
  ROLES,
  COUNTRY_LIST,
  DELIVERYADDRESS_STATUS,
};
