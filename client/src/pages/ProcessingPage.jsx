import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
`;

const ProcessingPage = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/success");
    }, 2000);
  }, []);

  return (
    <Container>{isProcessing ? <div>Processing...</div> : null}</Container>
  );
};

export default ProcessingPage;
