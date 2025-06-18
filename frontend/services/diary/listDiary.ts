import api from "../api"
import { Diary } from "@/types/mental/diary"

export const getDiaryList = async (month?: number, year?: number): Promise<Diary[]> => {
  try {
    const params: Record<string, any> = {}

    if (month) params.month = month
    if (year) params.year = year

    const response = await api.get<Diary[]>("mental/diary/", { 
      params: {
        month: month,
        year: year
      }
    })
    return response.data
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail)
    }
    throw new Error("Erro ao tentar buscar diário")
  }
}
