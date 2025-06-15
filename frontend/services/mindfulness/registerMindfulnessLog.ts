import api from "../api";
import { MindfulnessLog } from "@/types/health/mindfulness";

export const registerMindfulnessLog= async (data: MindfulnessLog) => {
  try {
    const response = await api.post("mental/mindfulness/log/register", data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error("Erro ao tentar atualizar usuário.");
  }
};
