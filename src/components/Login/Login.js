import React from "react";
import {
  CardWrapper,
  CardBody,
  CardFieldset,
  CardInput,
  CardLink,
} from "./styles";
import Card from "../Card/Card";
import { useState } from "react";
import { login } from "../../services/auth";
import { cadastrar } from "../../services/auth";
import Button from "../Button/Button";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      const dadosLogin = {
        user,
        senha,
        
      };
      const response = await login(dadosLogin);

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", user);

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
        
      };

      await cadastrar(dadosCadastro);
      setUser("");
      setSenha("");
      setIsLogin(true);

      
    } catch (error) {
      
      console.error(error);
    }
  };

  const handleToggleLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <CardWrapper>
      <Card header={isLogin ? "Login" : "Cadastrar"}>
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
            <Button
              title={isLogin ? "Entrar" : "Cadastrar"}
              onClick={isLogin ? handleLogin : handleCadastro}
            ></Button>
          </CardFieldset>

          <CardFieldset>
            <CardLink onClick={handleToggleLogin}>
              {!isLogin ? "Opa, eu já tenho uma conta!" : " Primeira vez?"}
            </CardLink>
          </CardFieldset>
        </CardBody>
      </Card>
    </CardWrapper>
  );
};

export default Login;
