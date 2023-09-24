import React, { useEffect } from "react";
import { styled } from "styled-components";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUpdateId } from "../redux-toolkit/productSlice";

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
  width: 60%;
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

const UpdateProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  let [categories, setCategories] = useState(null);
  let [size, setSize] = useState(null);
  let [color, setColor] = useState(null);
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [product, setProduct] = useState({});
  if (categories) {
    categories = categories.split(",");
  }
  if (size) {
    size = size.split(",");
  }
  if (color) {
    color = color.split(",");
  }

  const id = useSelector((state) => state.product.updateProductId);

  useEffect(() => {
    const getProductUpdate = async () => {
      const res = await axios.get(`http://localhost:5000/api/v1/product/${id}`);
      setProduct(res.data.product);
    };
    getProductUpdate();
  }, []);
  const handelUpdateClick = async (e) => {
    e.preventDefault();
    const res = await axios.patch(
      `http://localhost:5000/api/v1/product/${id}`,
      {
        title,
        description,
        categories,
        size,
        color,
        price,
        inStock,
      }
    );
    dispatch(removeUpdateId());
    navigate("/allproduct");
  };
  return (
    <Container>
      <Wrapper>
        <Title>UPDATE PRODUCT</Title>
        <Form>
          <InputWrapper>
            <Label>Title</Label>
            <Input
              placeholder={product.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Description</Label>
            <Input
              placeholder={product.description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Categories</Label>
            <Input
              placeholder={product.categories}
              onChange={(e) => setCategories(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Size</Label>
            <Input
              placeholder={product.size}
              onChange={(e) => setSize(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Color</Label>
            <Input
              placeholder={product.color}
              onChange={(e) => setColor(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Price</Label>
            <Input
              placeholder={product.price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>InStock</Label>
            <Input
              placeholder={product.inStock ? "YES" : "NO"}
              onChange={(e) => setInStock(e.target.value)}
            />
          </InputWrapper>
          <Button onClick={handelUpdateClick}>UPDATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default UpdateProductPage;
