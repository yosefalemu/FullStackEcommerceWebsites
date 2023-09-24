import React, { useState } from "react";
import { styled } from "styled-components";
import NavBar from "../Components/NavBar";
import Announcements from "../Components/Announcements";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import NewsPaper from "../Components/NewsPaper";
import Footer from "../Components/Footer";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../redux-toolkit/productSlice";
import { addCart } from "../redux-toolkit/cartSlice";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;
const ImageContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 30px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: ${(props) =>
    props.color === "White" ? "0.1px solid black" : "none"};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid teal;
  margin: 0px 10px;
`;
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  margin-left: 50px;

  &:hover {
    background-color: #f8f4f4;
  }
`;
const FilterSizeOption = styled.option``;
const RatingContainer = styled.div`
  display: flex;
  border: 2px dashed green;
  border-radius: 20px;
  padding: 15px;
  width: 80%;
  margin: 25px auto 0px;
`;
const UserContainer = styled.div`
  flex: 1;
  font-size: 25px;
  margin-right: 20px;
`;
const CommentContainer = styled.div`
  flex: 2;
  padding: 10px;
`;
const Rating = styled.div`
  font-size: 20px;
`;
const Description = styled.div`
  font-size: 20px;
`;
const NoRating = styled.div``;
const WholeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid yellow;
  margin-top: 40px;
  font-size: 14px;
  padding: 15px;
  border-radius: 15px;
`;

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const productId = location.pathname.split("/")[2];
  const userId = useSelector((state) => state.user.currentUser.user._id);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(null);
  const [title, setTitle] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/product/${productId}`
        );
        const product = res.data.product;
        setProduct(product);
        setPrice(product.price);
        setTitle(product.title);
      } catch (error) {}
    };
    getProduct();
  }, [productId]);

  const handleQuantityClick = (type) => {
    if (type === "increase") {
      setQuantity(quantity + 1);
    } else {
      quantity > 1 && setQuantity(quantity - 1);
    }
  };
  const handleCartClick = async () => {
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
  const productReview = product.review;
  return (
    <Container>
      <NavBar />
      <Announcements />
      <Wrapper>
        <ImageContainer>
          <Image src={product.img} />
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.description}</Desc>
          <Price>{product.price}Birr</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color &&
                product.color.map((item) => (
                  <FilterColor
                    color={item}
                    key={item}
                    onClick={() => setColor(item)}
                  />
                ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size &&
                  product.size.map((item) => (
                    <FilterSizeOption key={item}>{item}</FilterSizeOption>
                  ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon onClick={() => handleQuantityClick("decrease")} />
              <Amount>{quantity}</Amount>
              <AddIcon onClick={() => handleQuantityClick("increase")} />
            </AmountContainer>
            <Button onClick={handleCartClick}>ADD TO CART</Button>
          </AddContainer>
          <WholeContainer>
            <Title>Product Review</Title>
            {productReview &&
              productReview.map((item) => (
                <RatingContainer>
                  <UserContainer>{item.username}</UserContainer>
                  <CommentContainer>
                    <Rating>{item.rating}</Rating>
                    <Description>.{item.comment}</Description>
                  </CommentContainer>
                </RatingContainer>
              ))}
            {!productReview && (
              <RatingContainer>
                <NoRating>The product is not reviewd yet...</NoRating>
              </RatingContainer>
            )}
          </WholeContainer>
        </InfoContainer>
      </Wrapper>
      <NewsPaper />
      <Footer />
    </Container>
  );
};

export default Product;
