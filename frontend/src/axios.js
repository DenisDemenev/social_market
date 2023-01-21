import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://smax.store/api',
});

if (localStorage.getItem('token')) {
  instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Token ${localStorage.getItem('token')}`;
    return config;
  });
}

export default instance;
