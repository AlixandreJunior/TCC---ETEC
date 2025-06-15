import { User } from "@/types/user/user";
import api from "../api";
import { createAccountResponse } from "./createAccount";

export const updateUser = async (data: Partial<User>) => {
  try {
    const response = await api.patch<createAccountResponse>("user/update/", data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error("Erro ao tentar atualizar usuário.");
  }
};
