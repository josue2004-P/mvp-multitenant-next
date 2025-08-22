// src/infrastructure/api/AxiosClient.ts
import axios from "axios";
import { getSession } from "next-auth/react";
import { getClientSubdomain } from "@/utils/getSubdomain";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // permite enviar cookies
});

// Interceptor para agregar token y subdominio
axiosClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.user.token;      // token de NextAuth
  const subdomain = getClientSubdomain(); // subdominio actual

  if (token) config.headers["x-token"] = token;
  if (subdomain) config.headers["x-subdomain"] = subdomain;

  return config;
});