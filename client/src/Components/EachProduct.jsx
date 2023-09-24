import React, { useState } from "react";
import { styled } from "styled-components";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addWishList } from "../redux-toolkit/wishSlice";
import { useNavigate } from "react-router-dom";
import { addProducts } from "../redux-toolkit/productSlice";
import { addCart } from "../redux-toolkit/cartSlice";
import axios from "axios";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;
const Container = styled.div`
  flex: 1;
  margin: 5px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.2);
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;
const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const EachProduct = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.currentUser.user._id);

  const handleWishClick = async (id) => {
    try {
      const productId = id;
      const res = await axios.post("http://localhost:5000/api/v1/wish", {
        userId,
        productId,
      });
      dispatch(addWishList());
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddToCart = async (product) => {
    const productId = product._id;
    const title = product.title;
    const price = product.price;
    const quantity = 1;
    const size = product.size[0];
    const color = product.color[0];
    try {
      const res = await axios.post("http://localhost:5000/api/v1/cart", {
        userId,
        productId,
        quantity,
        color,
        size,
        price,
        title,
      });
      dispatch(addCart({ ...product, color, size, userId, price, quantity }));
      dispatch(
        addProducts({
          ...product,
          color,
          size,
          userId,
          price,
          quantity,
          productId,
        })
      );
      navigate("/cart");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon onClick={() => handleAddToCart(item)}>
          <AddShoppingCartOutlinedIcon />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlinedIcon />
          </Link>
        </Icon>
        <Icon onClick={() => handleWishClick(item._id)}>
          <FavoriteBorderOutlinedIcon />
        </Icon>
      </Info>
    </Container>
  );
};

export default EachProduct;
