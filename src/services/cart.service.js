import http from "../http-common";

const get = () => {
  return http.get(`/carts`);
};

const search = (data) => {
  return http.post(`/carts/search`, data);
};

const getById = (id) => {
  return http.get(`/carts/${id}`);
};

const create = (data) => {
  return http.post(`/carts`, data);
};

const update = (id, data) => {
  return http.put(`/carts/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/carts/${id}`);
};

const CartService = {
  get,
  search,
  getById,
  create,
  update,
  remove,
};

export default CartService;
