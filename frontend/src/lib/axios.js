import axios from "axios";

const API_URL = "https://real-time-chatty-application.onrender.com/api";

// Debug logging
console.log('Environment variables:', import.meta.env);
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('Final API_URL:', API_URL);

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});