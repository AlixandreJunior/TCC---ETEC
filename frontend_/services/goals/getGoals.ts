// services/user/goalsService.ts (ou onde sua função getGoals está)
import { Goal } from "@/types/user/goal";
import api from "../api"; // Ajuste o caminho para sua instância Axios

export const getGoals = async ()=> { // Retorna Goal ou null
  try {
    const response = await api.get<Goal>("user/goals/"); // Endpoint para buscar as metas
    
    // Se a API retornar 200 OK mas com dados vazios (ex: {} ou []), 
    // você pode querer tratar como "não encontrado" aqui também.
    if (!response.data) {
        console.warn("Nenhuma meta encontrada para o usuário.");
        return null;
    }
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      // Se a API retornar 404, significa que não há metas para o usuário
      console.warn("Nenhuma meta encontrada para o usuário (404).");
      return null; // Retorna null em caso de 404
    }
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error("Erro ao tentar buscar metas do usuário.");
  }
};