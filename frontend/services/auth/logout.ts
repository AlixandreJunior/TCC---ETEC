import api from "../api"
import { getRefreshToken } from "../jwt_store";

export interface createAccountResponse{
    detail: string
}

export const logout = async () => {
    const refreshToken = await getRefreshToken();
    
    if (!refreshToken) {
      throw new Error("Refresh Token não existe.");
    }

    try {
        const response = await api.post<createAccountResponse>("logout/", {refreshToken})

        const data = response.data
        return data

    } catch(error: any) {
      if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail); // erro enviado pelo backend
    }

    throw new Error("Erro ao tentar criar usuario");
    }
  }
