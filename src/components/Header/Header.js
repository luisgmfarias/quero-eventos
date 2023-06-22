import React from "react";
import { Link } from "react-router-dom";
import { HeaderContainer } from "./styles";
import logo from "../../assets/quero-logo.png";

const Header = () => {
  return (
    <HeaderContainer>
      <nav>
        <ul>
          <li>
            <Link to="/sobre">Sobre</Link>
          </li>
          <li>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </li>
          <li>
            <Link to="/contato">Contato</Link>
          </li>
        </ul>
      </nav>
    </HeaderContainer>
  );
};

export default Header;
