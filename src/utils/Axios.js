import axios from 'axios';

const Axios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // true if using refresh tokens or cookies
});

export default Axios;
