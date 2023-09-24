import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import NavBar from "../Components/NavBar";
import Announcements from "../Components/Announcements";
import axios from "axios";

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
  width: 70%;
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

const AllUserPage = () => {
  const [users, setUsers] = useState([]);
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [deletedUser, setDeletedUser] = useState({});
  useEffect(() => {
    const getAllUsers = async () => {
      const res = await axios.get("http://localhost:5000/api/v1/user");
      setUsers(res.data.user);
      setNumberOfUsers(res.data.count);
    };
    getAllUsers();
  }, [deletedUser]);
  const handleDeleteUser = async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/v1/user/${id}`);
    setDeletedUser(res.data.deletedUser);
  };
  return (
    <Container>
      <NavBar />
      <Announcements />
      <Wrapper>
        <Title>USERS</Title>
        <OrderTable>
          <TableMainHeader>
            <TableRow>
              <TableHeader style={{ width: "250px" }}>ID</TableHeader>
              <TableHeader style={{ width: "150px" }}>FIRSTNAME</TableHeader>
              <TableHeader style={{ width: "150px" }}>MIDDLENAME</TableHeader>
              <TableHeader style={{ width: "150px" }}>LASTNAME</TableHeader>
              <TableHeader style={{ width: "150px" }}>USERNAME</TableHeader>
              <TableHeader style={{ width: "100px" }}>ISADMIN</TableHeader>
              <TableHeader style={{ width: "fit-content" }}>
                DELETEUSER
              </TableHeader>
            </TableRow>
          </TableMainHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableData style={{ width: "250px" }}>{user._id}</TableData>
                <TableData style={{ width: "150px" }}>
                  {user.firstname}
                </TableData>
                <TableData style={{ width: "150px" }}>
                  {user.middlename}
                </TableData>
                <TableData style={{ width: "150px" }}>
                  {user.lastname}
                </TableData>
                <TableData style={{ width: "150px" }}>
                  {user.username}
                </TableData>
                <TableData style={{ width: "100px" }}>
                  {user.isAdmin ? "YES" : "NO"}
                </TableData>
                <TableData
                  style={{
                    width: "fit-content",
                    background: "red",
                    padding: "3px",
                    margin: "2px",
                    color: "whitesmoke",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                  onClick={() => handleDeleteUser(user._id)}
                >
                  DELETEUSER
                </TableData>
              </TableRow>
            ))}
          </TableBody>
        </OrderTable>
      </Wrapper>
    </Container>
  );
};

export default AllUserPage;
