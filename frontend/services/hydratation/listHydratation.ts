import api from "../api"
import { Hydratation } from "@/types/health/hydratation"

export const getHydratationList = async (date?: Date): Promise<Hydratation[]> => {
  try {
    const response = await api.get<Hydratation[]>("physical/hydratation/", {
      params: date ? { date } : {}
    })
    return response.data
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail)
    }
    throw new Error("Erro ao tentar buscar diário de hidratação.")
  }
}
