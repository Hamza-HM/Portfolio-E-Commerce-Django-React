import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  error: null,
  isAuthenticated: null,
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
      state.access = access;
      state.refresh = refresh;
      state.error = null; // Reset any previous errors on successful
    },
    loginFail: (state, action) => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.isAuthenticated = false;
      state.access = null;
      state.refresh = null;
      state.error = action.payload; // Set the error message from the action payload
    },
    signUpSuccess: (state, action) => {
      state.isAuthenticated = false;
      state.success = action.payload;
      state.error = null;
    },
    signUpFail: (state, action) => {
      state.isAuthenticated = false;
      state.error = action.payload;
      state.success = null;
    },
    authenticatedSuccess: (state) => {
      state.isAuthenticated = true;
      state.error = null;
    },
    authenticatedFail: (state, action) => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.isAuthenticated = false;
      state.access = null;
      state.refresh = null;
      state.error = action.payload;
    },
    logoutPerform: (state) => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.isAuthenticated = false;
      state.access = null;
      state.refresh = null;
      state.error = null;
    },
    accountActivationSuccess: (state) => {
      state.error = null;
      state.success = "Account activated!";
    },
    accountActivationFail: (state, action) => {
      state.success = null;
      state.error = action.payload;
    },
    passwordResetSuccess: (state) => {
      state.success =
        "if you have an account your will receive a password reset email!";
      state.error = null;
    },
    passwordResetFail: (state, action) => {
      state.success = null;
      state.error = action.payload;
    },
    passwordResetConfirmSuccess: (state) => {
      state.success = "Password changed!";
      state.error = null;
    },
    passwordResetConfirmFail: (state, action) => {
      state.success = null;
      state.error = action.payload;
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
  accountActivationSuccess,
  accountActivationFail,
  passwordResetSuccess,
  passwordResetFail,
  passwordResetConfirmSuccess,
  passwordResetConfirmFail,
  googleAuthSuccess,
  googleAuthFail,
  facebookAuthSuccess,
  facebookAuthFail,
} = authSlice.actions;

export default authSlice.reducer;
