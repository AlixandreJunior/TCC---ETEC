import api from '../api';
import { MindfulnessLog } from '@/types/health/mindfulness';
import { startOfWeek, endOfWeek, format } from "date-fns";
import { ptBR } from 'date-fns/locale';

export const getMindfulnessList = async (date: Date = new Date()): Promise<MindfulnessLog[]> => {
  try {
    const startDate = format(startOfWeek(date, { weekStartsOn: 0, locale: ptBR }), "yyyy-MM-dd");
    const endDate = format(endOfWeek(date, { weekStartsOn: 0, locale: ptBR }), "yyyy-MM-dd");

    const response = await api.get<MindfulnessLog[]>("mental/mindfulness/log/", {
      params: {
        start_date: startDate,
        end_date: endDate,
      }
    });
    return response.data;
  } catch (error: any) {
    console.log("Erro na API de Mindfulness:", error);
    return [];
  }
};