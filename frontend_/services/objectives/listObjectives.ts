import { Objective } from '@/types/mental/objectives'; // Ajuste o caminho
import api from '../api';

export const getObjectiveList = async (): Promise<Objective[]> => {
  try {
    const response = await api.get<Objective[]>("progress/objective/");

    const data = response.data;
    return data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.warn("Nenhum objetivo encontrado.");
      return []
    }
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
      
    }
    throw new Error("Erro ao tentar buscar objetivos");
  }
};