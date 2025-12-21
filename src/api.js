import axios from "axios";

const api = axios.create({
  baseURL: "http://91.214.78.53:3000", // The address of the NestJS backend
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
