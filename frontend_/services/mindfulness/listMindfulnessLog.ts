import api from "../api"
import { MindfulnessLog } from "@/types/health/mindfulness"
import { startOfWeek, endOfWeek, format } from "date-fns"

export const getMindfulnessList = async (date: Date = new Date()): Promise<MindfulnessLog[]> => {
  try {
    const startDate = format(startOfWeek(date, { weekStartsOn: 0 }), "yyyy-MM-dd") 
    const endDate = format(endOfWeek(date, { weekStartsOn: 0 }), "yyyy-MM-dd")     

    const response = await api.get<MindfulnessLog[]>("mental/mindfulness/log/", {
      params: {
        start_date: startDate,
        end_date: endDate,
      }
    })

    return response.data
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail)
    }
    throw new Error("Erro ao tentar buscar registros de mindfulness.")
  }
}
