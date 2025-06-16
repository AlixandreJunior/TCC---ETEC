import { Objective } from "@/types/mental/objectives";
import api from "../api"
import { MindfulnessLog } from "@/types/health/mindfulness";

export const getObjectiveList = async () => {
    try {
    const response = await api.get<Objective[]>("mental/mindfulness/log/")
    
    const data = response.data
    return data

    } catch(error: any) {
      if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail); 
    }

    throw new Error("Erro ao tentar buscar diario");
    }
  }
