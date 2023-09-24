import React from "react";
import { styled } from "styled-components";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setIntialCart } from "../redux-toolkit/cartSlice";
import { loginSuccess } from "../redux-toolkit/userSlice";

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

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstname, setFirstName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const user = useSelector((state) => state.user.currentUser.user);

  const handelUpdateClick = async (e) => {
    e.preventDefault();
    const res = await axios.patch(
      `http://localhost:5000/api/v1/user/${user._id}`,
      { firstname, middlename, lastname, username }
    );
    dispatch(loginSuccess(res.data));
    navigate("/homepage");
  };
  return (
    <Container>
      <Wrapper>
        <Title>UPDATE AN ACCOUNT</Title>
        <Form>
          <InputWrapper>
            <Label>First Name</Label>
            <Input
              placeholder={user.firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Middle Name</Label>
            <Input
              placeholder={user.middlename}
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Last Name</Label>
            <Input
              placeholder={user.lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Username</Label>
            <Input
              placeholder={user.username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </InputWrapper>
          <Button onClick={handelUpdateClick}>UPDATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default UpdateProfile;
