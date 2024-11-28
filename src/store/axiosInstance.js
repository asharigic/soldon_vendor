// src/api/axiosInstance.js

import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API, // Set your base URL here
  headers: {
    'Accept': 'application/json', // Default header for all requests
  }
});

// Add a request interceptor to attach the token
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage (or your preferred storage method)
    const token = localStorage.getItem('vendorusertoken'); // Or use Redux, Context API, etc.
    
    if (token) {
      // Attach the token to the Authorization header
      config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
    }

    return config;
  },
  (error) => {
    // Handle any errors that occur during the request setup
    return Promise.reject(error);
  }
);

export default axiosInstance;
