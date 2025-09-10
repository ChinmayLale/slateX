"use client";

import axios from "axios";
import { useAuth } from "@clerk/nextjs";

// Create instance
const api = axios.create({
  baseURL:  "https://slate-x-server.vercel.app/api/v1",
  withCredentials: true,
});

// Add interceptor for client-side token injection
export const useApi = () => {
  const { getToken } = useAuth();

  // Attach token before every request
  api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};

export default api;



