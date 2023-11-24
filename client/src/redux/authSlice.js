import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { loggedIn: false, userId: null },
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.userId = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.userId = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
