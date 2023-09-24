import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ButtonsContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("/images/background.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled(Link)`
  padding: 10px 20px;
  margin-left: 50px;
  background-color: teal;
  color: white;
  text-decoration: none;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const LandingPage = () => {
  return (
    <ButtonsContainer>
      <Button to="/login">Login</Button>
      <Button to="/signup">Sign Up</Button>
    </ButtonsContainer>
  );
};

export default LandingPage;
