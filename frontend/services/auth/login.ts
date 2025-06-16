import api from "../api";

export interface LoginResponse {
  access: string;
  refresh: string;
}

export const login = async ( email: string, password: string ): Promise<LoginResponse> => {
  if (!email.trim() || !password.trim()) {
    throw new Error("Preencha todos os campos.");
  }

  try {
    const response = await api.post<LoginResponse>('login/', { email, password });
    const data = response.data;

    if (!data.access || !data.refresh) {
      throw new Error("Resposta da API incompleta.");
    }

    return data;

  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail); // erro enviado pelo backend
    }

    throw new Error("Erro ao tentar fazer login.");
  }
};

