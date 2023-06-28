import React from "react";
import { ContatoStyles } from "./styles";
import { Link } from "react-router-dom";

const Contato = () => {
  return (
    <ContatoStyles>
      <h1>Entre em contato</h1>
      <p>
        Você pode entrar em contato com o desenvolvedor por e-mail:
      </p>
      <Link href="mailto:luisgmfarias@gmail.com">Enviar e-mail</Link>
    </ContatoStyles>
  );
};

export default Contato;
