import { Diary, DiaryWrite } from "@/types/mental/diary";
import api from "../api";

export const createDiary= async (data: FormData) => {
  try {
    const response = await api.post("mental/diary/create/", data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error(error.response.data);
  }
};
