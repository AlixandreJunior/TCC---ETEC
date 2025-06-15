import api from "../api"
import { Mindfulness } from "@/types/health/mindfulness";

export const getMindfulnessList = async () => {
    try {
    const response = await api.get<Mindfulness[]>("mental/mindfulness/")
    
    const data = response.data
    return data

    } catch(error: any) {
      if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail); 
    }

    throw new Error("Erro ao tentar buscar diario");
    }
  }
