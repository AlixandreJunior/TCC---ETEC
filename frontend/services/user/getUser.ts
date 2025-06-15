import { User } from "@/types/user/user";
import api from "../api"

export const getUser = async () => {
    try {
    const response = await api.get<User>("user/")
    
    const data = response.data
    return data

    } catch(error: any) {
      if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail); 
    }

    throw new Error("Erro ao tentar buscar usuario");
    }
  }
