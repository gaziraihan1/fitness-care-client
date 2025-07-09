import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000' 
});

axiosSecure.interceptors.request.use(config => {
  const token = localStorage.getItem('access-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

axiosSecure.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('access-token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
