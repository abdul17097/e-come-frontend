import { api } from "../utils/axiosInstance";

export const getAllUsers = async (page = 1, limit = 20) => {
  const { data } = await api.get(`/user?page=${page}&limit=${limit}`);
  return data;
};

export const deleteUser = async (userId) => {
  const { data } = await api.delete(`/user/${userId}`);
  return data;
};
