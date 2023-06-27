import React from "react";
import { CardContainer, CardHeader, CardHeading } from "./styles";

const Card = ({ children, header }) => {
  return (
    <CardContainer>
      <CardHeader>
        <CardHeading>{header}</CardHeading>
      </CardHeader>
      {children}
    </CardContainer>
  );
};

export default Card;
