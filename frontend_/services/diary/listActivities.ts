import api from "../api"
import { Activity } from "@/types/mental/diary";

export const getActivities = async () => {
    try {
    const response = await api.get<Activity[]>(`mental/activities`)
    
    const data = response.data
    return data

    } catch(error: any) {
      if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail); 
    }

    throw new Error("Erro ao tentar buscar diario");
    }
  }
