import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { popularProducts } from "../data";
import EachProduct from "./EachProduct";
import axios from "axios";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
  & > * {
    flex-basis: calc(25% - 10px);
    margin-bottom: 20px;
  }
`;

const Products = ({ category, filter, sort }) => {
  const [products, setProducts] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/product");
        const allProducts = res.data.products;
        const categoryProducts = category
          ? allProducts.filter((item) => item.categories.includes(category))
          : allProducts;
        setProducts(categoryProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, [category]);
  useEffect(() => {
    if (filter && products.length > 0) {
      const { color, size } = filter;
      const colorFilteredProducts = color
        ? products.filter((item) => item.color.includes(color))
        : products;
      const sizeFilteredProducts = size
        ? colorFilteredProducts.filter((item) => item.size.includes(size))
        : colorFilteredProducts;

      setFilterProduct(sizeFilteredProducts);
    }
  }, [filter, products]);

  //   Sort based on the time the product was created in descending order (Newest first).
  // Sort based on the price in ascending order (Lowest price first).
  // Sort based on the price in descending order (Highest price first).
  useEffect(() => {
    if (sort === "Newest") {
      setFilterProduct((prev) =>
        [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } else if (sort === "asc") {
      setFilterProduct((prev) =>
        [...prev].sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      );
    } else if (sort === "desc") {
      setFilterProduct((prev) =>
        [...prev].sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
      );
    }
  }, [sort]);
  return (
    <Container>
      {category
        ? filterProduct.map((item) => {
            return <EachProduct item={item} key={item._id} />;
          })
        : products.map((item) => {
            return <EachProduct item={item} key={item._id} />;
          })}
    </Container>
  );
};

export default Products;
