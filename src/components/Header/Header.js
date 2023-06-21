import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderContainer } from './styles';

const Header = () => {
  return (
    <HeaderContainer>
      <nav>
        <ul>
          <li>
            <Link to="/">Sobre</Link>
          </li>
          <li>
            <Link to="/contato"></Link>
          </li>
          <li>
            <Link to="/sobre">Contato</Link>
          </li>
        </ul>
      </nav>
    </HeaderContainer>
  );
};

export default Header;
