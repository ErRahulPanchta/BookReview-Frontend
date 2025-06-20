import axios from 'axios';

const Axios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false, 
});

export default Axios;
