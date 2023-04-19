import http from "../http-common";

const get = () => {
  return http.get(`/products`);
};

const search = (data) => {
  return http.post(`/products/search`, data);
};

const getByClient = (data) => {
  return http.post(`/products/get-by-client`, data);
};

const getByPath = (data) => {
  return http.post(`/products/get-by-path`, data);
};

const getById = (id) => {
  return http.get(`/products/${id}`);
};

const create = (data) => {
  return http.post(`/products`, data);
};

const update = (id, data) => {
  return http.put(`/products/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/products/${id}`);
};

const ProductService = {
  get,
  search,
  getByClient,
  getByPath,
  getById,
  create,
  update,
  remove,
};

export default ProductService;
