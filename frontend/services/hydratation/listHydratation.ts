import api from "../api"
import { Hydratation } from "@/types/health/hydratation";

export const getHydratationList = async () => {
    try {
    const response = await api.get<Hydratation[]>("physical/hydratation/")
    
    const data = response.data
    return data

    } catch(error: any) {
      if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail); 
    }

    throw new Error("Erro ao tentar buscar diario");
    }
  }
