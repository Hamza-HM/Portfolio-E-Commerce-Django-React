import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticate: {
    access: localStorage.getItem("access"),
    refresh: localStorage.getItem("refresh"),
    error: null, // New error field to hold authentication errors
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
      state.authenticate.access = access;
      state.authenticate.refresh = refresh;
      state.authenticate.error = null; // Reset any previous errors on successful login
    },
    loginFail: (state, action) => {
      state.isAuthenticated = false;
      state.authenticate.access = null;
      state.authenticate.refresh = null;
      state.authenticate.error = action.payload; // Set the error message from the action payload
    },
    signUpSuccess: (state) => {
      state.isAuthenticated = true;
    },
    signUpFail: (state, action) => {
      state.isAuthenticated = false;
      state.verify.error = action.payload;
    },
    authenticatedSuccess: (state) => {
      state.isAuthenticated = true;
    },
    authenticatedFail: (state) => {
      state.isAuthenticated = false;
    },
    logoutPerform: (state) => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.isAuthenticated = false;
      state.authenticate.access = null;
      state.authenticate.refresh = null;
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
} = authSlice.actions;

export default authSlice.reducer;
