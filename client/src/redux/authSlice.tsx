import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ShortId from "shortid";

interface AuthState {
  loggedIn: boolean;
  userId: string;
}

function getGuestId() {
  let guestId = localStorage.getItem("guestId");
  if (!guestId) {
    guestId = ShortId.generate(); // 고유 ID 생성 함수
    localStorage.setItem("guestId", guestId);
  }
  return guestId;
}

const authSlice = createSlice({
  name: "auth",
  initialState: { loggedIn: false, userId: getGuestId() } as AuthState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.loggedIn = true;
      state.userId = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.userId = getGuestId();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
