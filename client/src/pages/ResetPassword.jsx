import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
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
  width: 95%;
  margin-bottom: 10px;
  align-items: center;
`;
const Label = styled.label`
  flex: 2;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 5px;
`;
const Input = styled.input`
  flex: 6;
  padding: 8px 12px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 18px;
`;
const Button = styled.button`
  border: none;
  padding: 8px;
  background-color: teal;
  color: white;
  cursor: pointer;
  font-size: 18px;
`;
const ButtonContainer = styled.div`
  display: flex;
  width: 40%;
  margin-top: 20px;
  justify-content: space-between;
`;
const ResetPassword = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/forgetpassword");
  };
  const handleCreate = () => {};
  return (
    <Container>
      <Wrapper>
        <Title>RESET PASSWORD</Title>
        <Form>
          <InputWrapper>
            <Label>New Password</Label>
            <Input type="password" placeholder="New Password" />
          </InputWrapper>
          <InputWrapper>
            <Label>Confirm Password</Label>
            <Input type="password" placeholder="Confirm Password" />
          </InputWrapper>
          <ButtonContainer>
            <Button onClick={handleBack}>BACK</Button>
            <Button onClick={handleCreate}>RESET PASSWORD</Button>
          </ButtonContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default ResetPassword;
