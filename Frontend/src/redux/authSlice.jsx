import { createSlice } from "@reduxjs/toolkit";


const tokenFromStorage = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user");

const initialState = {
  user:
    userFromStorage && userFromStorage !== "undefined"
      ? JSON.parse(userFromStorage)
      : null,

  token: tokenFromStorage,
  isAuth:  !!(tokenFromStorage && userFromStorage),
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));

    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");

    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
