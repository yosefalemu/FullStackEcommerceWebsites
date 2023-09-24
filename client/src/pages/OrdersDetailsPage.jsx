import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../Components/NavBar";
import Announcements from "../Components/Announcements";
import { styled } from "styled-components";
import axios from "axios";

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
const OrdersDetailsPage = () => {
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

  return (
    <Container>
      <NavBar />
      <Announcements />
      <Wrapper>
        <Summary>
          <SummaryTitle>ORDER DETAILS</SummaryTitle>
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
        </Summary>
      </Wrapper>
    </Container>
  );
};

export default OrdersDetailsPage;
