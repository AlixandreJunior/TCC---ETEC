import axios, { AxiosRequestConfig, AxiosError } from 'axios';

const apiUrl = 'http://192.168.1.7:8000/api/';

const api = axios.create({
  baseURL: apiUrl,
  timeout: 10000
});

let onLogout: (() => void) | null = null;
let getTokens: (() => Promise<{ access: string | null; refresh: string | null }>) | null = null;
let saveTokens: ((access: string, refresh: string) => Promise<void>) | null = null;
 

export const setAuthHandlers = (handlers: {
  onLogout: () => void;
  getTokens?: () => Promise<{ access: string | null; refresh: string | null }>;
  saveTokens?: (access: string, refresh: string) => Promise<void>;
}) => {
  onLogout = handlers.onLogout;
  getTokens = handlers.getTokens || null;
  saveTokens = handlers.saveTokens || null;
};

//@ts-ignore
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!getTokens || !onLogout) {
        onLogout?.();
        return Promise.reject(error);
      }

      try {
        // Pega refresh token atual
        const { refresh } = await getTokens();

        if (!refresh) {
          onLogout();
          return Promise.reject(error);
        }

        // Faz o refresh no backend
        const res = await axios.post(`${apiUrl}refresh/`, { refresh });

        const newAccess = res.data.access;
        const newRefresh = res.data.refresh;

        if (typeof saveTokens === 'function') {
          await saveTokens(newAccess, newRefresh);
        }

        // Atualiza o header com o novo access token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        }

        return api(originalRequest);
      } catch (e) {
        onLogout();
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);


export default api;
