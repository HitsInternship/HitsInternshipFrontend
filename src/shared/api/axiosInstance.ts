import axios from 'axios';

import { BASE_URL } from '../consts';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${BASE_URL}/user/refresh`, {
          refreshToken: refreshToken,
        });
        const { accessToken, refreshToken: newRefreshToken } =
          response.data.token;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        return await api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
