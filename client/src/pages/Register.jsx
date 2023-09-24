import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess } from "../redux-toolkit/userSlice";
import { setIntialCart } from "../redux-toolkit/cartSlice";

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
  width: 100%;
`;
const InputWrapperInfo = styled.div`
  display: flex;
  width: 100%;
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
const Agreement = styled.span`
  font-size: 18px;
  margin: 20px 0px;
`;
const ButtonContainer = styled.div`
  display: flex;
  width: 50%;
  // justify-content: space-between;
`;

const Button = styled.button`
  width: 30%;
  border: none;
  padding: 8px;
  margin-left: 40px;
  background-color: teal;
  color: white;
  cursor: pointer;
  font-size: 18px;
`;
const Error = styled.div`
  color: red;
  display: flex;
  justify-content: center;
  margin-top: 0px;
`;
const Empty = styled.div``;

const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  // const [image, setImage] = useState("");
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setImage(file);
  //   console.log(image);
  // };
  const handleBack = () => {
    navigate("/");
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setFlag(true);
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        {
          firstname,
          middlename,
          lastname,
          username,
          email,
          password,
        }
      );
      dispatch(setIntialCart());
      dispatch(loginSuccess(res.data));
      navigate("/homepage");
    } catch (error) {
      setErrorMessage(error.response.data.msg);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <InputWrapper>
            <InputWrapperInfo>
              <Label>First Name</Label>
              <Input
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </InputWrapperInfo>
            {errorMessage === "First name is required..." ? (
              <Error>{errorMessage}</Error>
            ) : (
              <Empty></Empty>
            )}
          </InputWrapper>
          <InputWrapper>
            <InputWrapperInfo>
              <Label>Middle Name</Label>
              <Input
                placeholder="Middle Name"
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </InputWrapperInfo>
            {errorMessage === "Middle name is required..." ? (
              <Error>{errorMessage}</Error>
            ) : (
              <Empty></Empty>
            )}
          </InputWrapper>
          <InputWrapper>
            <InputWrapperInfo>
              <Label>Last Name</Label>
              <Input
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </InputWrapperInfo>
            {errorMessage === "Last name is required..." ? (
              <Error>{errorMessage}</Error>
            ) : (
              <Empty></Empty>
            )}
          </InputWrapper>
          <InputWrapper>
            <InputWrapperInfo>
              <Label>Username</Label>
              <Input
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </InputWrapperInfo>
            {errorMessage === "Username is required..." ? (
              <Error>{errorMessage}</Error>
            ) : (
              <Empty></Empty>
            )}
          </InputWrapper>
          <InputWrapper>
            <InputWrapperInfo>
              <Label>Email</Label>
              <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputWrapperInfo>
            {errorMessage === "Email name is required..." ? (
              <Error>{errorMessage}</Error>
            ) : errorMessage === "please provide valid email..." ? (
              <Error>{errorMessage}</Error>
            ) : (
              <Empty></Empty>
            )}
          </InputWrapper>
          <InputWrapper>
            <InputWrapperInfo>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputWrapperInfo>
            {errorMessage === "Password is required..." ? (
              <Error>{errorMessage}</Error>
            ) : (
              <Empty></Empty>
            )}
          </InputWrapper>
          <InputWrapper>
            <InputWrapperInfo>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </InputWrapperInfo>
            {flag ? <Error>Password dont match</Error> : <Empty></Empty>}
          </InputWrapper>
          {/* <InputWrapper>
            <Label>User Image</Label>
            <Input type="file" accept="image/*" onChange={uploadFileHandler} />
          </InputWrapper> */}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <ButtonContainer>
            <Button onClick={handleBack}>BACK</Button>
            <Button onClick={handleCreate}>CREATE</Button>
          </ButtonContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
