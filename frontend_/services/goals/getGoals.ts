import { User } from "@/types/user/user";
import api from "../api"

export const getGoals = async () => {
    try {
    const response = await api.get<User>("user/goals/")
    
    const data = response.data
    return data

    } catch(error: any) {
      if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail); 
    }

    throw new Error("Erro ao tentar buscar usuario");
    }
  }
