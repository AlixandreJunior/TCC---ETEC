import api from "../api"
import { getRefreshToken } from "../../stores/authStore";

export interface createAccountResponse{
    detail: string
}

export const logout = async () => {
    const refresh = await getRefreshToken();
    
    if (!refresh) {
      throw new Error("Refresh Token não existe.");
    }

    try {
        const response = await api.post<createAccountResponse>("logout/", {refresh: refresh})

        const data = response.data
        return data

    } catch(error: any) {
      if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }

    throw new Error("Erro ao tentar criar usuario");
    }
  }
