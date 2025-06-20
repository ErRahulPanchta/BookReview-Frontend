import axios from 'axios';

const Axios = axios.create({
  baseURL: process.env.VITE_BACKEND_URL,
  withCredentials: false,
});

export default Axios;
