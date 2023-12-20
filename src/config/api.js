import axios from 'axios';

export default axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 10000,
  withCredentials: true
});