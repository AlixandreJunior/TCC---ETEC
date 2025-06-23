import { Steps } from "@/types/health/steps";
import api from "../api"

export const getStepsList = async () => {
    try {
    const response = await api.get<Steps[]>("mental/mindfulness/")
    
    const data = response.data
    return data

    } catch(error: any) {
      if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail); 
    }

    throw new Error("Erro ao tentar buscar diario");
    }
  }
