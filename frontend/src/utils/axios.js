import axios from "axios";
import { URLS } from "../URL";
import { useNavigate } from "react-router-dom";

let isRefreshing = false;  // Renamed for clarity
let failedQueue = [];      // Queue for storing failed requests

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Create an instance of Axios with default configuration
const axiosInstance = axios.create({
  baseURL: URLS.BASE, // Adjust the base URL as per your API endpoint
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        try {
          const token = await new Promise((resolve, reject) => {
            failedQueue.push({resolve, reject});
          });
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axios(originalRequest);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
      
      originalRequest._retry = true;
      isRefreshing = true;
      
      try {
        const { data } = await axios.post(
          URLS.REFRESH, 
          { refresh: localStorage.getItem('refresh_token') },
          { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        );

        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
        
        // Process the queue after successful refresh
        processQueue(null, data.access);
        originalRequest.headers['Authorization'] = 'Bearer ' + data.access;
        return axios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    const token = localStorage.getItem('access_token')
/*     if(error.response.status === 401 && !token)
    {
      const navigate = useNavigate();
      navigate.push('auth/login');
    } */
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;