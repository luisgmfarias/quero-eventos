import React from 'react';
import { CardWrapper, CardBody, CardHeader, CardHeading, CardFieldset, CardButton, CardIcon, CardInput, CardLink } from './styles';

const Card = ({ children }) => {
  return (
    <CardWrapper>
      {children}
      
    </CardWrapper>
  )
}

export default Card;
