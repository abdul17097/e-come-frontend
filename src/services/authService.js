import { api } from "../utils/axiosInstance";

export const loginUser = async ({ email, password }) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

export const signupUser = async ({ name, email, password }) => {
  const { data } = await api.post("/auth/signup", { name, email, password });
  return data;
};

export const logoutUser = async () => {
  await api.post("/auth/logout");
};

export const getMe = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};
