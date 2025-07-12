import api from "../api";
import { Goal } from "@/types/user/goal";

export const updateUser = async (data: Partial<Goal>) => {
  try {
    const response = await api.patch("user/goals/update/", data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error("Erro ao tentar atualizar usuário.");
  }
};
