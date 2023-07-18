import axios from "axios";

const instance = axios.create({
  // baseURL: 'https://smax.store/api',
  // baseURL: "http://localhost:8000/api",
  baseURL: "http://80.87.96.10/api",
});

if (localStorage.getItem("token")) {
  instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Token ${localStorage.getItem("token")}`;
    return config;
  });
}
if (localStorage.getItem("access")) {
  instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("access")}`;
    return config;
  });
}

export default instance;
