import React from "react";
import { styled } from "styled-components";
import { useState } from "react";
import axios from "axios";
import {
  loginFail,
  loginStart,
  loginSuccess,
} from "../redux-toolkit/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

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
  width: 85%;
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
  width: 30%;
  border: none;
  padding: 8px;
  background-color: teal;
  color: white;
  cursor: pointer;
  font-size: 18px;
  &:disabled {
    cursor: not-allowed;
  }
`;
const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const ForgotPasswordLink = styled(Link)`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-top: 10px;
  cursor: pointer;
`;
const RegisterLink = styled(Link)`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-top: 10px;
  cursor: pointer;
`;
const Error = styled.div`
  color: red;
`;
const Fetching = styled.div`
  color: blue;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isFetching } = useSelector((state) => state.user);

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
        email,
        password,
      });

      dispatch(loginSuccess(res.data));
      navigate("/homepage");
    } catch (error) {
      setErrorMessage(error.response.data.msg);
      dispatch(loginFail());
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>LOGIN</Title>
        <Form>
          <InputWrapper>
            <Label>Email</Label>
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputWrapper>
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>{errorMessage}...</Error>}
          {isFetching && <Fetching>processing...</Fetching>}
          <LinkContainer>
            <ForgotPasswordLink Link to="/forgetpassword">
              Forgot Password?
            </ForgotPasswordLink>
            <RegisterLink Link to="/signup">
              Don't have an account? Register here.
            </RegisterLink>
          </LinkContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
