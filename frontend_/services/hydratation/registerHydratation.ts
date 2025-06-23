import { Hydratation } from "@/types/health/hydratation";
import api from "../api";

export const registerHydratationLog= async (data: Hydratation) => {
  try {
    const response = await api.post("physical/hydratation/register/", data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error("Erro ao tentar atualizar usuário.");
  }
};
