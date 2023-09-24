import React from "react";
import { useEffect } from "react";
import NavBar from "../Components/NavBar";
import Announcements from "../Components/Announcements";
import Slider from "../Components/Slider";
import Categories from "../Components/Categories";
import Products from "../Components/Products";
import NewsPaper from "../Components/NewsPaper";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logOutCart } from "../redux-toolkit/cartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setCart } from "../redux-toolkit/cartSlice";
import { logOutProduct, setProduct } from "../redux-toolkit/productSlice";
import { logOutUser } from "../redux-toolkit/userSlice";
import { logOutOrder } from "../redux-toolkit/orderSlice";
import { setWishList } from "../redux-toolkit/wishSlice";

const HomePage = () => {
  const user = useSelector((state) => state.user.currentUser.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserCart = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/cart/${user._id}`
      );
      let amount = res.data.count;
      let products = res.data.cartItem;
      if (!cart.isSet) {
        dispatch(setCart({ amount, products }));
        dispatch(setProduct({ products }));
      }
    };
    getUserCart();
  }, []);
  useEffect(() => {
    const getWishList = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/wish/${user._id}`
      );
      dispatch(setWishList(res.data.count));
    };
    getWishList();
  }, []);
  return (
    <div>
      <Announcements />
      <NavBar />
      <Slider />
      <Categories />
      <Products />
      <NewsPaper />
      <Footer />
    </div>
  );
};

export default HomePage;
