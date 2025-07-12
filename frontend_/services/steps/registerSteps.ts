import { Steps } from "@/types/health/steps";
import api from "../api";

export const registerStepsLog= async (data: Steps) => {
  try {
    const response = await api.post("mental/steps/register", data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error("Erro ao tentar atualizar usuário.");
  }
};
