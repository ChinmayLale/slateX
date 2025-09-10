"use client"; // THIS IS REQUIRED

import axios from "axios";

const api = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
   withCredentials: true, // allows cookies/tokens if needed
});

export default api;


