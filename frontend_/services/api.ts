import axios, { AxiosRequestConfig, AxiosError } from 'axios'; 
import { clearTokens, getToken, getRefreshToken, saveToken } from '../stores/authStore';

const apiUrl = 'http://192.168.1.10:8000/api/'; 

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

//@ts-ignore
api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  try {
    const token = await getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Erro ao recuperar accessToken do SecureStore:", error);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => { 
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }; 

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 
      try {
        const refreshToken = await getRefreshToken();

        if (!refreshToken) {
          console.warn('Refresh token ausente. Redirecionando para login.');
          return Promise.reject(error);
        }

        const response = await axios.post<any>(`${apiUrl}refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;
        const newRefreshToken = response.data.refresh;

       saveToken(newAccessToken, newRefreshToken)

        if (!originalRequest.headers) {
          originalRequest.headers = {};
        }
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError: any) { 
        console.warn('Erro ao tentar renovar token:', refreshError.response?.data || refreshError.message);
        await clearTokens()
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
