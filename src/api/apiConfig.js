import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosClient.interceptors.request.use(function (config) {
  let token = localStorage.getItem('token');
  config.headers['Authorization'] = 'Bearer ' + token;
  return config;
});

export default axiosClient;
