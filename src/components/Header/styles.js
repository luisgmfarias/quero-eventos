import styled from "styled-components";

export const HeaderContainer = styled.header`

  padding: 20px;

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
    width: 100px;
  }
`;
