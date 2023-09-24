import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { Badge, Button } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logOutCart } from "../redux-toolkit/cartSlice";
import { useNavigate } from "react-router-dom";
import { logOutProduct, setProduct } from "../redux-toolkit/productSlice";
import { logOutUser } from "../redux-toolkit/userSlice";
import { logOutOrder } from "../redux-toolkit/orderSlice";

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Middle = styled.div`
  flex: 1;
  text-align: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Language = styled.span`
  font-size: 24px;
  cursor: pointer;
  font-weight: bold;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px 8px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 18px;
`;

const Logo = styled.div`
  font-weight: bolder;
  font-size: 30px;
`;

const MenuItems = styled.div`
  font-weight: bolder;
  margin-left: 10px;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: #f50057;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 20px;
  border: 2px solid black;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  text-transform: capitalize;
`;

const DropdownContent = styled.div`
  display: none;
  margin-top: 2px;
  position: absolute;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  ${DropdownWrapper}:hover & {
    display: block;
  }
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`;
const LogOutContainer = styled.div`
  display: flex;
  color: red;
  font-weight: 700;
  align-items: center;
`;
const NavBar = () => {
  const user = useSelector((state) => state.user.currentUser.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = () => {
    dispatch(logOutCart());
    dispatch(logOutProduct());
    dispatch(logOutUser());
    dispatch(logOutOrder());
    navigate("/");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "gray", fontSize: "16px" }} />
          </SearchContainer>
        </Left>
        <Middle>
          <Logo>YOSEF.</Logo>
        </Middle>
        <Right>
          {user.isAdmin && (
            <DropdownWrapper>
              <ButtonContainer>
                <DropdownButton>Admin</DropdownButton>
                <KeyboardArrowDownIcon />
              </ButtonContainer>
              <DropdownContent>
                <DropdownItem onClick={() => navigate("/alluser")}>
                  GetAllUser
                </DropdownItem>
                <DropdownItem onClick={() => navigate("/allproduct")}>
                  GetAllProduct
                </DropdownItem>
                <DropdownItem onClick={() => navigate("/orderproduct")}>
                  GetAllOrder
                </DropdownItem>
                <DropdownItem onClick={() => navigate("/createproduct")}>
                  CreateProduct
                </DropdownItem>

                {/* Add other dropdown items */}
              </DropdownContent>
            </DropdownWrapper>
          )}
          <DropdownWrapper>
            <ButtonContainer>
              <DropdownButton>{user.username}</DropdownButton>
              <KeyboardArrowDownIcon />
            </ButtonContainer>
            <DropdownContent>
              <DropdownItem onClick={() => navigate("/update")}>
                UpdateProfile
              </DropdownItem>
              <DropdownItem onClick={() => navigate("/wishlist")}>
                MyWishList
              </DropdownItem>
              <DropdownItem onClick={() => navigate("/myorder")}>
                MyOrders
              </DropdownItem>
              <DropdownItem onClick={() => navigate("/mypurchase")}>
                MyPurchase
              </DropdownItem>
              <DropdownItem onClick={logOutHandler}>
                <LogOutContainer>
                  <LogoutIcon />
                  LogOut
                </LogOutContainer>
              </DropdownItem>
              {/* Add other dropdown items */}
            </DropdownContent>
          </DropdownWrapper>
          <MenuItems>
            <Link to={"/cart"}>
              <Badge badgeContent={cart.amount} color="primary" showZero>
                <ShoppingCartOutlinedIcon />
              </Badge>
            </Link>
          </MenuItems>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default NavBar;
