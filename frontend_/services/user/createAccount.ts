import api from "../api"

export interface createAccountResponse{
    detail: string
}

export const createAccount = async (username: string, email: string, password: string) => {
    if (!username.trim() || !email.trim()) {
        throw new Error("Preencha todos os campos.");
    }

    try {
      const response = await api.post<createAccountResponse>("user/create/", {
        username,
        email,
        password,
      })

    const data = response.data
    return data

    } catch(error: any) {
      if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail); 
    }

    throw new Error("Erro ao tentar criar usuario");
    }
  }
