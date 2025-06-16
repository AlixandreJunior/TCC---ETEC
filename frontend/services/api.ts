import axios, { AxiosRequestConfig, AxiosError } from 'axios'; // Adicionando tipos Axios
import { clearTokens, getToken, getRefreshToken, saveToken } from '../stores/authStore';

const apiUrl = 'http://localhost:8000/api/'; // Lembre-se de usar seu IP local real aqui se estiver em um dispositivo/emulador!

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
    console.log(token)
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
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }; // Tipagem mais precisa para originalRequest

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
      } catch (refreshError: any) { // Captura erros durante o processo de refresh
        console.warn('Erro ao tentar renovar token:', refreshError.response?.data || refreshError.message);
        await clearTokens()
        return Promise.reject(refreshError); // Rejeita o erro de refresh
      }
    }

    return Promise.reject(error);
  }
);

export default api;
