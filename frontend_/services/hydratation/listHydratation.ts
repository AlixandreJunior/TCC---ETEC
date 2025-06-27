// services/hydratation/listHydratation.ts
import api from "../api";
import { Hydratation } from "@/types/health/hydratation";
import { format } from "date-fns"; // Apenas o format é necessário aqui

export const getHydratationList = async (date: Date = new Date()): Promise<Hydratation[]> => {
  try {
    const formattedDate = format(date, "yyyy-MM-dd"); // Data no formato YYYY-MM-DD
    const response = await api.get<Hydratation[]>("physical/hydratation/", {
      params: { date: formattedDate }
    });
    return response.data;
  } catch (error: any) {
    console.log('Erro na API de Hidratação:', error);
    return [];
  }
};