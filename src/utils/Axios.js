import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: false,
});

export default Axios;
