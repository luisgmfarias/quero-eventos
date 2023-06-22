import styled from "styled-components";

export const HeaderContainer = styled.header`


  nav > ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-inline: 0;
    margin-block:0
  }

  li {
    list-style: none;
    text-align: center;
    width: 300px;

    a{
      text-decoration: 0;
      color: #002250;
    }

    img{
      width: 200px;
    }

  }
`;
