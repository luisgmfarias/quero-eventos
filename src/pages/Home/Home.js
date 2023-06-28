import React, { useEffect, useState } from "react";
import Login from "../../components/Login/Login";
import EventList from "../../components/EventList/EventList";
import Button from "../../components/Button/Button";
import { HomeContainer, ButtonWrapper } from "./styles";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };
  return (
    <HomeContainer>
      {!isAuthenticated ? (
        <Login />
      ) : (
        <>
          <ButtonWrapper>
            <Button onClick={handleLogout} danger={true} title="Deslogar" />
          </ButtonWrapper>
          <EventList />
        </>
      )}
    </HomeContainer>
  );
};

export default Home;
