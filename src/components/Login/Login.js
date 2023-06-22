import React from "react";
import {
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
  CardButton,
  CardInput,
  CardLink,
} from "./styles";
import Card from "../Card/Card";
import { useState } from "react";
import { login } from "../../services/auth";
import { cadastrar } from "../../services/auth";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      const dadosLogin = {
        user,
        senha,
        // Adicione outros campos do formulário de cadastro
      };
      const response = await login(dadosLogin);

      localStorage.setItem("token", response.token);

      setUser("");
      setSenha("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCadastro = async () => {
    try {
      const dadosCadastro = {
        user,
        senha,
        // Adicione outros campos do formulário de cadastro
      };

      await cadastrar(dadosCadastro);
      setUser("");
      setSenha("");

      // Exibir uma mensagem de sucesso ou redirecionar para outra página
    } catch (error) {
      // Lógica para tratar o erro de cadastro (exibição de mensagem de erro, etc.)
      console.error(error);
    }
  };

  const handleToggleLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Card>
      <CardHeader>
        <CardHeading>{isLogin ? "Login" : "Cadastrar"}</CardHeading>
      </CardHeader>

      <CardBody>
        <CardFieldset>
          <CardInput
            placeholder="Username"
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </CardFieldset>

        <CardFieldset>
          <CardInput
            placeholder="Password"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </CardFieldset>

        <CardFieldset>
          <CardButton
            type="button"
            onClick={isLogin ? handleLogin : handleCadastro}
          >
            {isLogin ? "Entrar" : "Cadastrar"}
          </CardButton>
        </CardFieldset>

        <CardFieldset>
          <CardLink onClick={handleToggleLogin}>
            {!isLogin ? "Opa, eu já tenho uma conta!" : " Primeira vez?"}
          </CardLink>
        </CardFieldset>
      </CardBody>
    </Card>
  );
};

export default Login;
