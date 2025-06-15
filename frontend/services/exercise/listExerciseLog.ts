import { ExerciseLog } from "@/types/health/exercise";
import api from "../api"

export const getExerciseList = async () => {
    try {
    const response = await api.get<ExerciseLog[]>("physical/exercise/log/")
    
    const data = response.data
    return data

    } catch(error: any) {
      if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail); 
    }

    throw new Error("Erro ao tentar buscar diario");
    }
  }
