import { Objective } from "@/types/mental/objectives";
import api from "../api";

export const registerObjectiveLog= async (data: Objective) => {
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
