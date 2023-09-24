import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import NavBar from "../Components/NavBar";
import Announcements from "../Components/Announcements";
import NewsPaper from "../Components/NewsPaper";
import Footer from "../Components/Footer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { removeCart } from "../redux-toolkit/cartSlice";
import { removeProduct } from "../redux-toolkit/productSlice";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
`;
const Title = styled.h1`
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  background: ${(props) => (props.type === "filled" ? "black" : "transparent")};
  color: ${(props) => props.type === "filled" && "white"};
  border: ${(props) => props.type === "filled" && "none"};
`;
const TopTexts = styled.div`
  display: flex;
  align-items: center;
`;
const TopText = styled.h3`
  font-weight: 400;
  margin-right: 20px;
  cursor: pointer;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
  position: relative;
  padding: 20px 5px;
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 0.2px solid black;
`;
const ProductSize = styled.div``;
const PriceDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  width: 90%;
  text-align: center;
  position: absolute;
  bottom: 0;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: fit-content;
  text-align: center;
`;
const SummaryTitle = styled.h1`
  text-align: center;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: fit-content;

  padding: 10px;
  color: white;
  font-weight: 600;
  font-size: 24px;
  margin: 20px 5px;
  border: none;
  cursor: pointer;
`;
const RemoveButton = styled.button`
  margin: 20px 5px;
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  font-size: 18px;
`;
const Amount = styled.span`
  font-size: 24px;
`;

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userCart, setUserCart] = useState([]);
  const [deleteCart, setDeleteCart] = useState({});
  let cart = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.user.currentUser.user._id);
  const wish = useSelector((state) => state.wish);

  //get users cart items
  useEffect(() => {
    const getUserCart = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/cart/${userId}`
      );
      setUserCart(res.data.cartItem);
    };
    getUserCart();
  }, [userId, deleteCart]);

  const handleRemove = async (deleteId) => {
    const deleteCart = await axios.delete(
      `http://localhost:5000/api/v1/cart/${deleteId}`
    );
    const price = deleteCart.data.deletedCart.price;
    const quantity = deleteCart.data.deletedCart.quantity;
    const productId = deleteCart.data.deletedCart.productId;
    setDeleteCart(deleteCart);
    dispatch(removeCart({ deleteId, price, quantity }));
    dispatch(removeProduct(productId));
  };

  const handleClick = () => {
    navigate("/shipping");
  };

  return (
    <Container>
      <NavBar />
      <Announcements />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to={"/homepage"}>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>
              <Link to={"/cart"} style={{ textDecoration: "none" }}>
                Shopping Bag [{cart.amount}]
              </Link>
            </TopText>
            <TopText>
              <Link to={"/wishlist"} style={{ textDecoration: "none" }}>
                Your Wishlist [{wish.wishAmount}]
              </Link>
            </TopText>
          </TopTexts>
          <TopButton type="filled">CHECK MY BALANCE</TopButton>
        </Top>
        <Bottom>
          <Info>
            {userCart.map((item) => (
              <Product key={item._id}>
                <ProductDetail>
                  <Image src={item.image} />
                  <Details>
                    <ProductName>
                      <b>Product:</b>
                      {item.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {item._id}
                    </ProductId>
                    <ProductColor color={item.color} />
                    <ProductSize>
                      <b>Size:</b> {item.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetails>
                  <ProductAmountContainer>
                    <Amount>Quantity:</Amount>
                    <ProductAmount>{item.quantity}</ProductAmount>
                  </ProductAmountContainer>
                  <ProductPrice>
                    {(item.price * item.quantity).toFixed(2)} Birr
                  </ProductPrice>
                  <RemoveButton onClick={() => handleRemove(item._id)}>
                    REMOVE
                  </RemoveButton>
                </PriceDetails>
                <Hr />
              </Product>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem type="total">
              <SummaryItemText>TotalPrice</SummaryItemText>
              <SummaryItemPrice>{cart.total.toFixed(2)} Birr</SummaryItemPrice>
            </SummaryItem>
            {cart.amount > 0 ? (
              <Button onClick={handleClick} style={{ background: "green" }}>
                ORDER NOW
              </Button>
            ) : (
              <Button style={{ background: "red" }}>YOUR CART IS EMPTY</Button>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      <NewsPaper />
      <Footer />
    </Container>
  );
};

export default Cart;
