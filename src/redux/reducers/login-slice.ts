import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "@/types/types";

const initialState: UserType = {
  email: localStorage.getItem("email") || "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserType>) => {
      state.email = action.payload.email;
      localStorage.setItem("email", action.payload.email);
    },
    logout: (state) => {
      state.email = "";
      localStorage.removeItem("email");
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
