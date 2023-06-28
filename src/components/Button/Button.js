import React from "react";
import { ButtonStyles } from "./styles";

const Button = ({ title, danger, type = "button", onClick }) => {
  return (
    <ButtonStyles type={type} danger={danger} onClick={onClick}>
      {title}
    </ButtonStyles>
  );
};

export default Button;
