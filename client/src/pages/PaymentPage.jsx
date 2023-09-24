import React from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import NavBar from "../Components/NavBar";
import Announcements from "../Components/Announcements";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Summary = styled.div`
  margin-top: 100px;
  width: 40%;
  border: 0.1px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: fit-content;
  text-align: center;
`;
const SummaryTitle = styled.h1`
  text-align: center;
  margin: 0px;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  background-color: lightblue;
  padding: 5px 0px 5px 50px;
  border-radius: 20px;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.div`
  flex: 1;
  text-align: left;
  color: black;
`;
const SummaryItemValue = styled.div`
  flex: 1;
  text-align: center;
  color: red;
`;
const Button = styled.button`
  width: fit-content;
  padding: 10px 20px;
  background-color: black;
  color: white;
  font-weight: 600;
  font-size: 24px;
  margin: 20px 5px;
`;

const PaymentPage = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const id = useSelector((state) => state.order.orderDetailId);
  const orderId = id;

  useEffect(() => {
    const getOrder = async () => {
      const res = await axios.post(`http://localhost:5000/api/v1/order/${id}`, {
        orderId,
      });
      setOrder(res.data.singleOrder);
    };
    getOrder();
  }, []);
  const [stripetoken, setStripeToken] = useState(null);
  const updateId = useSelector((state) => state.order.orderPaidId);
  const total = useSelector((state) => state.order.total);

  // const handleToken = (token) => {
  //   setStripeToken(token);
  // };

  // useEffect(() => {
  //   const makePayment = async () => {
  //     try {
  //       const res = await axios.post("http://localhost:5000/api/v1/payment", {
  //         tokenId: stripetoken.id,
  //         amount: total * 100,
  //       });
  //       navigate("/processing", { data: res.data });
  //     } catch (error) {
  //       console.log(error.response.data);
  //     }
  //   };
  //   if (stripetoken) {
  //     makePayment();
  //   }
  // }, [stripetoken, total]);

  const handlePayClick = async () => {
    const paid = true;
    const res = await axios.patch(
      `http://localhost:5000/api/v1/order/${updateId}`,
      { paid }
    );
    navigate("/success");
  };

  return (
    <Container>
      <NavBar />
      <Announcements />
      <Wrapper>
        <Summary>
          <SummaryTitle>ORDER SUMMARY</SummaryTitle>
          <SummaryItem type="total">
            <SummaryItemText>Country</SummaryItemText>
            <SummaryItemValue>{order.country}</SummaryItemValue>
          </SummaryItem>
          <SummaryItem type="total">
            <SummaryItemText>City</SummaryItemText>
            <SummaryItemValue>{order.city}</SummaryItemValue>
          </SummaryItem>
          <SummaryItem type="total">
            <SummaryItemText>Address</SummaryItemText>
            <SummaryItemValue>{order.address}</SummaryItemValue>
          </SummaryItem>
          <SummaryItem type="total">
            <SummaryItemText>Postal Code</SummaryItemText>
            <SummaryItemValue>{order.postalCode}</SummaryItemValue>
          </SummaryItem>
          <SummaryItem type="total">
            <SummaryItemText>Distance</SummaryItemText>
            <SummaryItemValue>{order.distance} Km</SummaryItemValue>
          </SummaryItem>
          <SummaryItem type="total">
            <SummaryItemText>TotalPrice</SummaryItemText>
            <SummaryItemValue>{total.toFixed(2)} Birr</SummaryItemValue>
          </SummaryItem>
          <SummaryItem type="total">
            <SummaryItemText>Amount</SummaryItemText>
            <SummaryItemValue>{order.amount}</SummaryItemValue>
          </SummaryItem>
          {/* <StripeCheckout
            token={handleToken}
            image="https://www.logolynx.com/images/logolynx/31/316a6849ec9e5c9e7e14a5995c85f9d0.jpeg"
            stripeKey={process.env.REACT_APP_STRIPE}
            amount={total * 100}
            currency="USD"
            name="Jossy Shop"
            description={`Your total is $${total}`}
          >
            <Button onClick={handlePayClick}>PAY</Button>
          </StripeCheckout> */}
          <Button onClick={handlePayClick}>PAY</Button>
        </Summary>
      </Wrapper>
    </Container>
  );
};

export default PaymentPage;
