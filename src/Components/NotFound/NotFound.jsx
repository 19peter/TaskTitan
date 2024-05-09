import { Button } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Keyframe animation for the 404 text
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

// Styled components for the 404 page
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 5rem;
  color: #333;
  animation: ${bounce} 2s infinite;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  color: #555;
`;

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container style={{ backgroundColor: "#0b0c10" }}>
      <Title style={{ color: "#66FCF1" }}>404</Title>
      <Subtitle>Oops! Page not found</Subtitle>
      <Button
        variant="outlined"
        sx={{ color: "aqua", marginTop: "2%", width: "10rem" }}
        onClick={() => {
          navigate("/");
        }}
      >
        Go To Home
      </Button>
    </Container>
  );
};

export default NotFound;
