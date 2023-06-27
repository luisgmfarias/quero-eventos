import { getTokenFromLocalStorage } from "./auth";

export const cadastrarEvento = async (values) => {
  try {
    const response = await fetch("http://localhost:3001/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getTokenFromLocalStorage(),
      },
      body: JSON.stringify(values),
    });

    // Verificar se o evento foi cadastrado com sucesso
    if (response.ok) {
      // Exibir mensagem de sucesso ou redirecionar para outra página
      console.log("Evento cadastrado com sucesso!");
    } else {
      throw new Error("Erro ao cadastrar evento");
    }
  } catch (error) {
    // Tratar o erro de cadastro do evento
    console.error("Erro ao cadastrar evento:", error);
  }
};

export const getEventos = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/events");
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Erro ao obter eventos");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// Atualizar um evento
export const atualizarEvento = async (eventId, updatedEvent) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/events/${eventId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getTokenFromLocalStorage(),
        },
        body: JSON.stringify(updatedEvent),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Erro ao atualizar o evento");
    }
  } catch (error) {
    console.error("Erro ao atualizar o evento:", error);
    throw error;
  }
};

// Excluir um evento
export const excluirEvento = async (eventId) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/events/${eventId}`,
      {
        method: "DELETE",
        Authorization: "Bearer " + getTokenFromLocalStorage(),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Erro ao excluir o evento");
    }
  } catch (error) {
    console.error("Erro ao excluir o evento:", error);
    throw error;
  }
};
