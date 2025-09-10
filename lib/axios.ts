"use client"; // THIS IS REQUIRED

import axios from "axios";

const api = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL || "https://slate-x-server.vercel.app",
   withCredentials: true, // allows cookies/tokens if needed
});

export default api;


