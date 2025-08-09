import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://real-time-chatty-application.onrender.com/api";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // <<< MUST be set
  headers: { "Content-Type": "application/json" }
});
