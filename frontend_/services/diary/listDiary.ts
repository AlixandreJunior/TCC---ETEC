import { Diary } from '@/types/mental/diary';
import api from '../api';

export const getDiaryList = async (month?: number, year?: number): Promise<Diary[]> => {
  try {
    const params: Record<string, any> = {};

    if (month) params.month = month;
    if (year) params.year = year;

    const response = await api.get<Diary[]>("mental/diary/", {
      params: params,
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.warn("Diários não encontrados para o mês/ano especificado.");
      return []; 
    }
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error("Erro ao tentar buscar diário");
  }
};