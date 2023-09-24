import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
  amount: 0,
  isSet: false,
  products: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.amount += 1;
      state.products.push(action.payload);
      state.total += parseFloat(action.payload.price) * action.payload.quantity;
    },
    setCart: (state, action) => {
      state.isSet = true;
      state.amount = action.payload.amount;
      state.products = [];
      state.total = 0;
      action.payload.products.forEach((item) => {
        state.products.push(item);
        state.total += item.price * item.quantity;
      });
    },
    setIntialCart: (state) => {
      state.isSet = true;
      state.amount = 0;
      state.products = [];
      state.total = 0;
    },
    logOutCart: (state) => {
      state.total = 0;
      state.products = [];
      state.isSet = false;
      state.amount = 0;
    },
    removeCart: (state, action) => {
      const itemId = action.payload;
      state.products = state.products.filter((item) => item._id !== itemId);
      state.amount -= 1;
      state.total -= action.payload.price * action.payload.quantity;
    },
    increaseAmount: (state) => {
      state.amount += 1;
    },
  },
});
export const {
  addCart,
  removeCart,
  getUserCart,
  setCart,
  increaseAmount,
  logOutCart,
  setIntialCart,
} = cartSlice.actions;
export default cartSlice.reducer;
