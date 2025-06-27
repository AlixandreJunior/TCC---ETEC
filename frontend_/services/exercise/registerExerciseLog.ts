import { ExerciseLogWrite } from "@/types/health/exercise";
import api from "../api";

export const registerExerciseLog= async (data: ExerciseLogWrite) => {
  try {
    const response = await api.post("physical/exercise/log/register/", data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error("Erro ao tentar atualizar usuário.");
  }
};
