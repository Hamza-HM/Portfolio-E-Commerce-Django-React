import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    access: localStorage.getItem("access"),
    refresh: localStorage.getItem("refresh"),
    error: null,
  },
  signup: {
    response: null,
    error: null,
  },
  isAuthenticated: null,
  verify: {
    error: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { access, refresh } = action.payload;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      state.isAuthenticated = true;
      state.login.access = access;
      state.login.refresh = refresh;
      state.login.error = null; // Reset any previous errors on successful login
    },
    loginFail: (state, action) => {
      state.isAuthenticated = false;
      state.login.access = null;
      state.login.refresh = null;
      state.login.error = action.payload; // Set the error message from the action payload
    },
    signUpSuccess: (state, action) => {
      state.isAuthenticated = false;
      state.signup.response = action.payload;
      state.signup.error = null;
    },
    signUpFail: (state, action) => {
      state.isAuthenticated = false;
      state.signup.error = action.payload;
      state.signup.response = null;
    },
    authenticatedSuccess: (state) => {
      state.isAuthenticated = true;
      state.verify.error = null;
    },
    authenticatedFail: (state, action) => {
      state.isAuthenticated = false;
      state.verify.error = action.payload;
    },
    logoutPerform: (state) => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.isAuthenticated = false;
      state.login.access = null;
      state.login.refresh = null;
    },
    passwordResetSuccess: (state, action) => {
      console.log("password reset link sent");
    },
    passwordResetFail: (state, action) => {
      console.log("Error accured while reseting password");
    },
  },
});

export const {
  loginSuccess,
  loginFail,
  signUpSuccess,
  signUpFail,
  authenticatedSuccess,
  authenticatedFail,
  logoutPerform,
  passwordResetSuccess,
  passwordResetFail,
} = authSlice.actions;

export default authSlice.reducer;
