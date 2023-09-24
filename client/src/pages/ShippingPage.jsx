import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { styled } from "styled-components";
import Announcements from "../Components/Announcements";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  addOrders,
  getOrderPaidId,
  getOrderDetailsId,
} from "../redux-toolkit/orderSlice";
import { calculateTotal } from "../redux-toolkit/orderSlice";
import { logOutCart } from "../redux-toolkit/cartSlice";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
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
  margin-top: 30px;
`;
const InputWrapper = styled.div`
  display: flex;
  width: 80%;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
`;
const Label = styled.label`
  flex: 2;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 5px;
`;
const Input = styled.input`
  flex: 4;
  padding: 8px 12px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 18px;
  margin-left: -100px;
`;
const AllContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: fit-content;
  border: none;
  padding: 8px;
  margin-top: 40px;
  background-color: teal;
  color: white;
  cursor: pointer;
  font-size: 18px;
`;

const ShippingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [distance, setDistance] = useState(0);
  const userId = useSelector((state) => state.user.currentUser.user._id);
  const products = useSelector((state) => state.product.products);
  const total = useSelector((state) => state.cart.total);
  const amount = useSelector((state) => state.cart.amount);
  const userCart = useSelector((state) => state.cart.products);

  const handleOrderClick = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/v1/order", {
      userId,
      products,
      total,
      amount,
      address,
      city,
      postalCode,
      country,
      distance,
    });
    dispatch(getOrderPaidId(res.data.order._id));
    dispatch(getOrderDetailsId(res.data.order._id));
    dispatch(
      addOrders({
        address,
        city,
        postalCode,
        country,
        distance,
        userId,
        products,
        total,
        amount,
      })
    );
    dispatch(calculateTotal({ distance, total }));
    userCart.forEach(async (item) => {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/cart/${item.productId}`
      );
    });
    dispatch(logOutCart());

    navigate("/payment");
  };
  return (
    <Container>
      <NavBar />
      <Announcements />
      <AllContainer>
        <Wrapper>
          <Title>SHIPPING</Title>
          <Form>
            <InputWrapper>
              <Label>Address</Label>
              <Input
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>City</Label>
              <Input
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>Postal Code</Label>
              <Input
                placeholder="Postal Code"
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>Country</Label>
              <Input
                placeholder="Country"
                onChange={(e) => setCountry(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>Distance</Label>
              <Input
                placeholder="Distance in Km"
                onChange={(e) => setDistance(e.target.value)}
              />
            </InputWrapper>
            <Button onClick={handleOrderClick}>ORDER</Button>
          </Form>
        </Wrapper>
      </AllContainer>
    </Container>
  );
};

export default ShippingPage;
