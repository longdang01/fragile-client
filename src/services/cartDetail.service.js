import http from "../http-common";

const get = () => {
  return http.get(`/cartDetails`);
};

const search = (data) => {
  return http.post(`/cartDetails/search`, data);
};

const getByVariant = (data) => {
  return http.post(`/cartDetails/get-by-variant`, data);
};

const getById = (id) => {
  return http.get(`/cartDetails/${id}`);
};

const create = (data) => {
  return http.post(`/cartDetails`, data);
};

const update = (id, data) => {
  return http.put(`/cartDetails/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/cartDetails/${id}`);
};

const CartDetailService = {
  get,
  search,
  getById,
  getByVariant,
  create,
  update,
  remove,
};

export default CartDetailService;
