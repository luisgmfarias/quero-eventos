export const login = async (dadosLogin) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_HOST}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosLogin),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      const userId = data.userId;

      localStorage.setItem("token", token);
      localStorage.setItem("user", userId);

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
    const response = await fetch(`${process.env.REACT_APP_SERVER_HOST}auth/cadastro`, {
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
