import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  wishAmount: 0,
};

const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    setWishList: (state, action) => {
      state.wishAmount = action.payload;
    },
    addWishList: (state) => {
      state.wishAmount += 1;
    },
    removeWishList: (state) => {
      state.wishAmount -= 1;
    },
  },
});
export const { setWishList, addWishList, removeWishList } = wishSlice.actions;
export default wishSlice.reducer;
