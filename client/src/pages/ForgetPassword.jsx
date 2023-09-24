import React from "react";
import { styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
const Container = styled.div`
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
const Wrapper = styled.div`
  width: 40%;
  padding: 30px 50px 40px 50px;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 15px;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const InputWrapper = styled.div`
  display: flex;
  width: 80%;
  margin-bottom: 15px;
  align-items: center;
`;
const Label = styled.label`
  flex: 2;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 5px;
`;
const Input = styled.input`
  flex: 8;
  padding: 8px 12px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 18px;
`;
const Button = styled.button`
  width: 30%;
  border: none;
  padding: 8px;
  background-color: teal;
  color: white;
  cursor: pointer;
  font-size: 18px;
`;
const LogInLink = styled(Link)`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-top: 10px;
  text-decoration: underline;
  cursor: pointer;
`;

const ForgetPassword = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/resetpassword");
  };
  return (
    <Container>
      <Wrapper>
        <Title>FORGET PASSWORD</Title>
        <Form>
          <InputWrapper>
            <Label>Email</Label>
            <Input placeholder="Email" />
          </InputWrapper>
          <Button onClick={handleClick}>FORGET PASSWORD</Button>
          <LogInLink Link to="/login">
            PASSWORD-REMEBERED? LOGIN.
          </LogInLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default ForgetPassword;
