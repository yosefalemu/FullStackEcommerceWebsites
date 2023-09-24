import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import NavBar from "../Components/NavBar";
import Announcements from "../Components/Announcements";
import { useNavigate } from "react-router-dom";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
`;
const Title = styled.h1`
  text-align: center;
`;
const Info = styled.div``;
const Product = styled.div`
  flex: 1;
  display: flex;
  margin: 20px 0px;
  position: relative;
  padding: 20px 5px;
  width: 100%;
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

const ReviewButton = styled.button`
  margin: 20px 5px;
  padding: 10px;
  background-color: green;
  color: white;
  border: none;
  font-size: 18px;
  width: fit-content;
  height: fit-content;
`;
const Amount = styled.span`
  font-size: 24px;
`;
const Select = styled.select`
  flex: 0.2;
  margin: 0px 30px;
  height: fit-content;
`;
const Option = styled.option``;
const TextArea = styled.textarea`
  flex: 2;
  font-size: 18px;
`;
const InnerContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RatingPage = () => {
  const navigate = useNavigate();
  const orderId = useSelector((state) => state.order.orderReviewId);
  const username = useSelector((state) => state.user.currentUser.user.username);
  const [products, setProducts] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [response, setResponse] = useState({});
  const review = { username, comment, rating };
  useEffect(() => {
    const getSingleOrder = async () => {
      const res = await axios.post(
        `http://localhost:5000/api/v1/order/${orderId}`,
        {
          orderId,
        }
      );
      setProducts(res.data.singleOrder.products);
    };
    getSingleOrder();
  }, []);
  const handleReview = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/product/${id}/review`,
        review
      );
      setResponse(res.data);
      navigate("/mypurchase");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <NavBar />
      <Announcements />
      <Wrapper>
        <Info>
          <Title>RATING</Title>
          {products &&
            products.map((item) => (
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
                </PriceDetails>
                <TextArea
                  placeholder="Add some description"
                  onChange={(e) => setComment(e.target.value)}
                ></TextArea>
                <InnerContainer>
                  <Select onChange={(e) => setRating(e.target.value)}>
                    <Option disabled>Rating</Option>
                    <Option>1-poor</Option>
                    <Option>2-fair</Option>
                    <Option>3-good</Option>
                    <Option>4-very good</Option>
                    <Option>5-excellent</Option>
                  </Select>
                  <ReviewButton onClick={() => handleReview(item._id)}>
                    Review
                  </ReviewButton>
                </InnerContainer>
                <Hr />
              </Product>
            ))}
        </Info>
      </Wrapper>
    </Container>
  );
};

export default RatingPage;
