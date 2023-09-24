import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  isFetching: false,
  error: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.currentUser = null;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFail: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = true;
    },
    logOutUser: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
    },
  },
});

export const { loginStart, loginFail, loginSuccess, logOutUser } =
  userSlice.actions;
export default userSlice.reducer;
