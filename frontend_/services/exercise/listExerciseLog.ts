import { ExerciseLog } from "@/types/health/exercise";
import api from "../api";
import { startOfWeek, endOfWeek, format } from "date-fns";
import { ptBR } from 'date-fns/locale';

export const getExerciseLogs = async (date: Date = new Date()): Promise<ExerciseLog[]> => {
  try {
    const startDate = format(startOfWeek(date, { weekStartsOn: 0, locale: ptBR }), "yyyy-MM-dd");
    const endDate = format(endOfWeek(date, { weekStartsOn: 0, locale: ptBR }), "yyyy-MM-dd");

    const response = await api.get<ExerciseLog[]>("physical/exercise/log/", {
      params: {
        start_date: startDate,
        end_date: endDate,
      }
    });
    return response.data;
  } catch (error: any) {
    console.log('Erro na API de Exercício:', error);
    return [];
  }
};