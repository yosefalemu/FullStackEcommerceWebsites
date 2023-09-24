import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import NavBar from "../Components/NavBar";
import Announcements from "../Components/Announcements";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUpdateID } from "../redux-toolkit/productSlice";
import { useNavigate } from "react-router-dom";

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
const AllProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [deletedProduct, setDeletedProduct] = useState({});
  useEffect(() => {
    const getAllProducts = async () => {
      const res = await axios.get("http://localhost:5000/api/v1/product");
      setProducts(res.data.products);
    };
    getAllProducts();
  }, [deletedProduct]);
  const handleDeleteProduct = async (id) => {
    const res = await axios.delete(
      `http://localhost:5000/api/v1/product/${id}`
    );
    setDeletedProduct(res.data.deletedProduct);
  };
  const handleUpdateProduct = (id) => {
    dispatch(getUpdateID(id));
    navigate("/updateproduct");
  };
  return (
    <Container>
      <NavBar />
      <Announcements />
      <Wrapper>
        <Title>PRODUCTS</Title>
        <OrderTable>
          <TableMainHeader>
            <TableRow>
              <TableHeader style={{ width: "250px" }}>ID</TableHeader>
              <TableHeader style={{ width: "250px" }}>NAME</TableHeader>
              <TableHeader style={{ width: "150px" }}>PRICE</TableHeader>
              <TableHeader style={{ width: "250px" }}>CATEGORIES</TableHeader>
              <TableHeader style={{ width: "100px" }}>INSTOCK</TableHeader>
              <TableHeader style={{ width: "100px" }}>#REVIEWS</TableHeader>
              <TableHeader style={{ width: "70px" }}>EDIT</TableHeader>
              <TableHeader style={{ width: "fit-content" }}>DELETE</TableHeader>
            </TableRow>
          </TableMainHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableData style={{ width: "250px" }}>{product._id}</TableData>
                <TableData style={{ width: "250px" }}>
                  {product.title}
                </TableData>
                <TableData style={{ width: "150px" }}>
                  {product.price} Birr
                </TableData>
                <TableData style={{ width: "250px" }}>
                  {product.categories.map((item) => item + " ")}
                </TableData>
                <TableData style={{ width: "100px" }}>
                  {product.inStock ? "YES" : "NO"}
                </TableData>
                <TableData style={{ width: "100px" }}>
                  {product.review.length}
                </TableData>
                <TableData
                  style={{
                    width: "70px",
                    background: "green",
                    padding: "3px",
                    margin: "2px",
                    color: "whitesmoke",
                    cursor: "pointer",
                    borderRadius: "4px",
                    textAlign: "center",
                  }}
                  onClick={() => handleUpdateProduct(product._id)}
                >
                  EDIT
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
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  DELETE
                </TableData>
              </TableRow>
            ))}
          </TableBody>
        </OrderTable>
      </Wrapper>
    </Container>
  );
};

export default AllProductPage;
