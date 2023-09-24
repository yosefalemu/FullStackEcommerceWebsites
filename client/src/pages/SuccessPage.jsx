import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logOutCart } from "../redux-toolkit/cartSlice";
import { logOutProduct } from "../redux-toolkit/productSlice";
import { logOutOrder } from "../redux-toolkit/orderSlice";

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SuccessIcon = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const SuccessMessage = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const SuccessDescription = styled.p`
  font-size: 18px;
`;

const ContinueShoppingButton = styled.button`
  margin: 20px 0px;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #555;
  }
`;

const SuccessPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userCart = useSelector((state) => state.cart.products);
  const [deleteCart, setDeleteCart] = useState([]);

  const handleDelete = async (id) => {
    try {
      let res = await axios.delete(`http://localhost:5000/api/v1/cart/${id}`);
      setDeleteCart(res.data.deletedCart);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const deleteEachCart = async () => {
      await userCart.forEach((item) => {
        handleDelete(item.cartId);
      });
    };
    deleteEachCart();
  }, []);

  const handleContinueButton = () => {
    dispatch(logOutCart());
    dispatch(logOutProduct());
    dispatch(logOutOrder());
    navigate("/homepage");
  };

  return (
    <SuccessContainer>
      <SuccessIcon src="/path/to/success-icon.png" alt="Success Icon" />
      <SuccessMessage>Payment Successful!</SuccessMessage>
      <SuccessDescription>
        Thank you for your purchase. Your order has been successfully completed.
      </SuccessDescription>
      <ContinueShoppingButton onClick={handleContinueButton}>
        Continue Shopping
      </ContinueShoppingButton>
    </SuccessContainer>
  );
};

export default SuccessPage;
