import React, { useEffect, useState } from "react";
import Login from "../../components/Login/Login";
import EventList from "../../components/EventList/EventList";
import { HomeContainer } from "./styles";

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
      {!isAuthenticated ? <Login /> : <EventList />}

      <button onClick={handleLogout}/>
    </HomeContainer>
  );
};

export default Home;
