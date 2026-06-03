import { api } from "../utils/axiosInstance";

export const getAllProducts = async () => {
  const { data } = await api.get("/products/admin");
  console.log(data);

  return data;
};

export const getAllProductsPublic = async (params = {}) => {
  const { data } = await api.get("/products", { params });
  return data;
};

export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const createProduct = async (formData) => {
  // formData must be a native FormData object since we are uploading files
  const { data } = await api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const updateProduct = async (productId, formData) => {
  const { data } = await api.put(`/products/${productId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteProduct = async (productId) => {
  const { data } = await api.delete(`/products/${productId}`);
  return data;
};

export const submitReview = async (productId, reviewData) => {
  const { data } = await api.post(`/products/review/${productId}`, reviewData);
  return data;
};
