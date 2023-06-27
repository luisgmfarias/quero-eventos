import React from "react";
import { ButtonStyles } from "./styles";

const Button = ({ title, type = "button", onClick }) => {
  return (
    <ButtonStyles type={type} onClick={onClick}>
      {title}
    </ButtonStyles>
  );
};

export default Button;
