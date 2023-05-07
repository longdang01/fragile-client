import http from "../http-common";

const createPaymentUrl = (data) => {
  return http.post(`/vnPays/create-payment-url`, data);
};

const VnPayService = {
  createPaymentUrl,
};

export default VnPayService;
