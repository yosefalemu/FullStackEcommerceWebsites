import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import NavBar from "../Components/NavBar";
import Announcements from "../Components/Announcements";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { removeWishList } from "../redux-toolkit/wishSlice";

const Container = styled.div`
  margin-bottom: 200px;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;
const Title = styled.div`
  font-weight: 800;
  font-size: 32px;
  margin-bottom: 20px;
`;
const OrderTable = styled.table`
  width: 85%;
`;
const TableMainHeader = styled.thead`
  margin: 0px;
`;
const TableHeader = styled.th`
  text-align: left;
`;
const TableRow = styled.tr`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  border: 2px solid lightgray;
  margin-top: 5px;
  padding: 6px;
`;
const TableBody = styled.tbody`
  margin: 0px;
`;
const TableData = styled.td`
  text-align: left;
`;

const WishListPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser.user);
  const [wishes, setWishes] = useState([]);
  const [deleteWish, setDeleteWish] = useState({});
  useEffect(() => {
    const getAllWishes = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/wish/${user._id}`
      );
      setWishes(res.data.userWish);
    };
    getAllWishes();
  }, [deleteWish]);
  const handleWishDelete = async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/v1/wish/${id}`);
    setDeleteWish(res.data.deleteWish);
    dispatch(removeWishList());
  };
  const handleOrderWish = async (id) => {};
  return (
    <Container>
      <NavBar />
      <Announcements />
      <Wrapper>
        <Title>WISHLIST</Title>
        <OrderTable>
          <TableMainHeader>
            <TableRow>
              <TableHeader style={{ width: "250px" }}>ID</TableHeader>
              <TableHeader style={{ width: "250px" }}>USERID</TableHeader>
              <TableHeader style={{ width: "250px" }}>PRODUCTID</TableHeader>
              <TableHeader style={{ width: "100px" }}>DATE</TableHeader>
              <TableHeader style={{ width: "100px" }}>ORDER</TableHeader>
              <TableHeader style={{ width: "100px" }}>REMOVE</TableHeader>
            </TableRow>
          </TableMainHeader>
          <TableBody>
            {wishes.map((wish) => (
              <TableRow key={wish._id}>
                <TableData style={{ width: "250px" }}>{wish._id}</TableData>
                <TableData style={{ width: "250px" }}>{wish.userId}</TableData>
                <TableData style={{ width: "250px" }}>
                  {wish.productId}
                </TableData>
                <TableData style={{ width: "100px" }}>
                  {wish.createdAt.substring(0, 10)}
                </TableData>
                <Link
                  to={`/product/${wish.productId}`}
                  style={{ textDecoration: "none" }}
                >
                  <TableData
                    style={{
                      width: "100px",
                      background: "green",
                      padding: "3px",
                      margin: "2px",
                      color: "whitesmoke",
                      cursor: "pointer",
                      borderRadius: "4px",
                      textAlign: "center",
                    }}
                  >
                    ORDER
                  </TableData>
                </Link>

                <TableData
                  style={{
                    width: "100px",
                    background: "red",
                    padding: "3px",
                    margin: "2px",
                    color: "whitesmoke",
                    cursor: "pointer",
                    borderRadius: "4px",
                    textAlign: "center",
                  }}
                  onClick={() => handleWishDelete(wish._id)}
                >
                  REMOVE
                </TableData>
              </TableRow>
            ))}
          </TableBody>
        </OrderTable>
      </Wrapper>
    </Container>
  );
};

export default WishListPage;
