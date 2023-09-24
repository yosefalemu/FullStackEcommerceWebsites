import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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
`;
const CreateProduct = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  let [categories, setCategories] = useState("");
  let [size, setSize] = useState("");
  let [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState(true);

  if (categories) {
    categories = categories.split(",");
  }
  if (size) {
    size = size.split(",");
  }
  if (color) {
    color = color.split(",");
  }

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/v1/product", {
      title,
      description,
      categories,
      size,
      color,
      price,
      inStock,
    });
    navigate("/allproduct");
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE Product</Title>
        <Form>
          <InputWrapper>
            <Label>Title</Label>
            <Input
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Description</Label>
            <Input
              placeholder="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Categories</Label>
            <Input
              placeholder="categories"
              onChange={(e) => setCategories(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Size</Label>
            <Input
              placeholder="size"
              onChange={(e) => setSize(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Color</Label>
            <Input
              placeholder="color"
              onChange={(e) => setColor(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Price</Label>
            <Input
              placeholder="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>InStock</Label>
            <Input
              placeholder="inStock"
              onChange={(e) => setInStock(e.target.value)}
            />
          </InputWrapper>
          {/* <InputWrapper>
            <Label>User Image</Label>
            <Input type="file" accept="image/*" onChange={uploadFileHandler} />
          </InputWrapper> */}
          <ButtonContainer>
            <Button onClick={handleCreateProduct}>CREATE</Button>
          </ButtonContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default CreateProduct;
