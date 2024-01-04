import axios from 'axios';
const baseURL = import.meta.env.PROD ? import.meta.env.VITE_SERVER_URL_PROD : import.meta.env.VITE_SERVER_URL_DEV;

const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    config.headers['Authorization'] = `Bearer ${jwt}`;
  }
  return config;
})

export default api;