export const login = async (dadosLogin) => {
  try {
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosLogin),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;

      return { token };
    } else {
      throw new Error("Erro ao fazer login");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const cadastrar = async (dadosCadastro) => {
  try {
    const response = await fetch("http://localhost:3001/api/auth/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosCadastro),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Erro ao cadastrar");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};
