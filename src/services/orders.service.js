import http from "../http-common";

const get = () => {
  return http.get(`/orderses`);
};

const search = (data) => {
  return http.post(`/orderses/search`, data);
};

const searchByClient = (data) => {
  return http.post(`/orderses/search-client`, data);
};

const getById = (id) => {
  return http.get(`/orderses/${id}`);
};

const create = (data) => {
  return http.post(`/orderses`, data);
};

const update = (id, data) => {
  return http.put(`/orderses/${id}`, data);
};

const createClient = (data) => {
  return http.post(`/orderses/create-client`, data);
};

const updateClient = (id, data) => {
  return http.put(`/orderses/update-client/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/orderses/${id}`);
};

const OrdersService = {
  get,
  search,
  searchByClient,
  getById,
  create,
  update,
  remove,
  createClient,
  updateClient,
};

export default OrdersService;
