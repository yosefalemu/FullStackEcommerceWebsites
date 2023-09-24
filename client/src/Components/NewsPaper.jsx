import React from "react";
import { styled } from "styled-components";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  font-weight: 900;
`;
const Desc = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;
const InputContainer = styled.div`
  width: 40%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
`;
const Input = styled.input`
  border: none;
  outline: none;
  flex: 5;
  padding: 0 12px;
  font-size: 18px;
`;
const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  padding: 6px;
  svg {
    font-size: 30px;
  }
`;

const NewsPaper = () => {
  return (
    <Container>
      <Title>NewsLetter</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      <InputContainer>
        <Input placeholder="Your email..." />
        <Button>
          <SendOutlinedIcon />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default NewsPaper;
