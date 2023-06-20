import React from 'react';
import { CardHeader, CardHeading, CardBody, CardFieldset, CardButton, CardInput, CardIcon, CardLink } from './styles';
import Card from '../Card/Card';
import { useState } from 'react';

const Login = () => {

  const [isLogin, setisLogin] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardHeading>{isLogin ? "Login" : "Cadastrar"}</CardHeading>
      </CardHeader>

      <CardBody>
        <CardFieldset>
          <CardInput
            placeholder='Username'
            type='text'
            required
          />
        </CardFieldset>

        <CardFieldset>
          <CardInput
            placeholder='Password'
            type='password'
            required
          />
        </CardFieldset>

        <CardFieldset>
          <CardButton type='button'>{isLogin ? "Entrar" : "Cadastrar"}</CardButton>
        </CardFieldset>
        {!isLogin &&
          <CardFieldset>
            <CardLink onClick={() => setisLogin(true)}>I already have an account</CardLink>
          </CardFieldset>
        }

      </CardBody>
    </Card>
  );
};

export default Login;
