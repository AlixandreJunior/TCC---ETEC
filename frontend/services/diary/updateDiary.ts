import { Diary } from "@/types/mental/diary";
import api from "../api";

export const updateDiary = async (id: number, data: Partial<Diary>) => {
  try {
    const response = await api.patch(`mental/diary/detail/${id}/update/`, data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error("Erro ao tentar atualizar usuário.");
  }
};
