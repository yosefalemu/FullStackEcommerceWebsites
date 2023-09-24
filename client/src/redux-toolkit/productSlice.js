import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  updateProductId: "",
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      const itemId = action.payload;
      state.products = state.products.filter((item) => item._id !== itemId);
    },
    setProduct: (state, action) => {
      action.payload.products.forEach((item) => {
        state.products.push(item);
      });
    },
    getUpdateID: (state, action) => {
      state.updateProductId = action.payload;
    },
    removeUpdateId: (state) => {
      state.updateProductId = "";
    },
    logOutProduct: (state) => {
      state.products = [];
    },
  },
});

export const {
  addProducts,
  removeProduct,
  logOutProduct,
  setProduct,
  getUpdateID,
  removeUpdateId,
} = productSlice.actions;
export default productSlice.reducer;
