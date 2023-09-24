import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: {},
  total: 0,
  amount: 0,
  orderDetailId: "",
  orderPaidId: "",
  orderReviewId: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrders: (state, action) => {
      state.orders = action.payload;
    },
    logOutOrder: (state, action) => {
      state.orders = {};
    },
    getOrderDetailsId: (state, action) => {
      state.orderDetailId = action.payload;
    },
    getOrderPaidId: (state, action) => {
      state.orderPaidId = action.payload;
    },
    removeOrderDetailId: (state) => {
      state.orderDetailId = "";
    },
    calculateTotal: (state, action) => {
      state.total = 0;
      const totalPrice = action.payload.total;
      const distance = action.payload.distance;
      if (totalPrice >= 500) {
        state.total =
          totalPrice + totalPrice * 0.15 + parseFloat(distance) * 0.5;
      } else {
        state.total = totalPrice + totalPrice * 0.15 + parseFloat(distance) * 1;
      }
    },
    getOrderReviewId: (state, action) => {
      state.orderReviewId = action.payload;
    },
  },
});

export const {
  addOrders,
  removeOrder,
  logOutOrder,
  getOrderDetailsId,
  getOrderPaidId,
  removeOrderDetailId,
  calculateTotal,
  getOrderReviewId,
} = orderSlice.actions;
export default orderSlice.reducer;
