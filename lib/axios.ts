"use client"; // THIS IS REQUIRED

import axios from "axios";

const api = axios.create({
   baseURL:  "https://slate-x-server.vercel.app/api/v1",
   withCredentials: true, // allows cookies/tokens if needed
});

export default api;


