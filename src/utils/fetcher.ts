import axios from 'axios';
import { env } from "@app/utils/env"

export const appFetcher = axios.create({
  baseURL: env.NEXT_PUBLIC_APP_URL,
  headers: {
    'Accept': 'application/json',
  },
});

export const cmsFetcher = axios.create({
  baseURL: env.NEXT_PUBLIC_CMS_API_URL,
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${env.NEXT_PUBLIC_CMS_READ_ONLY_API_KEY}`,
  },
});

// Interceptors for handling errors globally
appFetcher.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API request error:', error);
    return Promise.reject(error);
  }
);

cmsFetcher.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('CMS request error:', error);
    return Promise.reject(error);
  }
);