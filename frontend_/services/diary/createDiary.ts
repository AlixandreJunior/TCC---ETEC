import api from "../api";

export const createDiary = async (data: FormData) => {
  console.log(data);
  try {
    const response = await api.post("mental/diary/create/", data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Erro ao criar diário:", error);

    // Erro com resposta do servidor
    if (error.response) {
      const serverMessage = error.response.data?.detail || JSON.stringify(error.response.data);
      throw new Error(serverMessage);
    }

    // Erro de rede ou outro erro genérico
    throw new Error(error.message || "Erro desconhecido ao criar diário.");
  }
};
