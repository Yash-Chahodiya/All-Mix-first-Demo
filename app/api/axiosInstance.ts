import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.restful-api.dev",
});

axiosInstance.interceptors.request.use((config) => {
  config.headers["Content-Type"] =
    config.headers["Content-Type"] ?? "application/json";

  return config;
});

export default axiosInstance;
