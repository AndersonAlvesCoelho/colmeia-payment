// src/services/api.ts
import axios, { AxiosError } from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      console.log("token", token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {

    const status = error.response?.status ?? 500;
    const data = error.response?.data ?? {};
    const code = data.statusCode  || 'UNKNOWN';
    const message =
      data.message ||
      (status === 401
        ? 'Sessão expirada. Faça login novamente.'
        : 'Erro inesperado. Tente novamente.');

    if (process.env.NODE_ENV === 'development') {
      console.warn('[API ERROR]', {
        status,
        code,
        url: error.config?.url,
        method: error.config?.method,
        data,
      });
    }

    return Promise.reject({
      status,
      code, 
      message,
      details: data,
    });
  }
);
