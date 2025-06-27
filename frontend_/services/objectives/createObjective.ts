import { ObjectiveWrite } from "@/types/mental/objectives";
import api from "../api";

export const registerObjectiveLog= async (data: ObjectiveWrite) => {
  try {
    const response = await api.post("progress/objective/create/", data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error("Erro ao tentar atualizar usuário.");
  }
};
