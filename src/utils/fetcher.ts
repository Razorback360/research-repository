import axios from 'axios';

export const appFetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://127.0.0.1:3000',
  headers: {
    'Accept': 'application/json',
  },
});

export const cmsFetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CMS_API_URL || 'http://127.0.0.1:1337',
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CMS_READ_ONLY_API_KEY}`,
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