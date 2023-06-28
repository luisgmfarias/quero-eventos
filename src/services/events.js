import { getTokenFromLocalStorage } from "./auth";

export const cadastrarEvento = async (values) => {
  try {
    const token = getTokenFromLocalStorage();

    const response = await fetch("http://localhost:3001/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      console.log("Evento cadastrado com sucesso!");
    } else {
      throw new Error("Erro ao cadastrar evento");
    }
  } catch (error) {
    console.error("Erro ao cadastrar evento:", error);
  }
};

export const getEventos = async () => {
  try {
    const token = getTokenFromLocalStorage();
    const response = await fetch("http://localhost:3001/api/events", {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    });
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

export const participarEvento = async (eventId, userId) => {
  try {
    const token = getTokenFromLocalStorage();

    const response = await fetch(
      `http://localhost:3001/api/events/${eventId}/participate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({"userId":userId}),
      }
    );

    if (response.ok) {
      console.log("Você esta participando do evento");
    } else {
      throw new Error("Erro ao participar do evento");
    }
  } catch (error) {
    console.error("Erro participar do evento", error);
  }
};

export const atualizarEvento = async (eventId, updatedEvent) => {
  try {
    const token = getTokenFromLocalStorage();
    const response = await fetch(
      `http://localhost:3001/api/events/${eventId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
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

export const excluirEvento = async (eventId) => {
  try {
    const token = getTokenFromLocalStorage();
    const response = await fetch(
      `http://localhost:3001/api/events/${eventId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
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
