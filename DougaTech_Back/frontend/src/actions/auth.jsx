import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../urils/cookieUtil";
import {
  loginSuccess,
  loginFail,
  signUpSuccess,
  signUpFail,
  authenticatedSuccess,
  authenticatedFail,
  logoutPerform,
} from "../reducers/auth";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      withCredentials: true,
    };
    const body = {
      email: email,
      password: password,
    };
    try {
      const res = await axios.post(
        import.meta.env.VITE_LOGIN_URL,
        body,
        config
      );
      dispatch(loginSuccess(res.data));
      console.log(res.data);
    } catch (err) {
      dispatch(loginFail(err));
    }
  }
);
// export const fetchCsrfToken = createAsyncThunk(
//   "auth/fetchCsrfToken",
//   async (_, { dispatch }) => {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     try {
//       const res = await axios.get(
//         import.meta.env.VITE_CSRF_TOKEN_URL,
//         config
//       );
//       console.log(res.data)
//       console.log(res.data);
//     } catch (err) {
//       console.log(err)
//     }
//   }
// );

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password, re_password }, { dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      withCredentials: true,
    };
    const body = {
      username,
      email,
      password,
      re_password,
    };
    try {
      const res = await axios.post(
        import.meta.env.VITE_REGISTER_URL,
        config,
        body
      );
      dispatch(signUpSuccess(res.data));
    } catch (err) {
      dispatch(signUpFail(err));
    }
  }
);

export const checkAuthenticated = createAsyncThunk(
  "auth/checkAuthenticated",
  async (_, { dispatch }) => {
    if (localStorage.getItem("access")) {
      console.log(getCookie("csrftoken"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
      };
      const body = {
        token: localStorage.getItem("access"),
      };
      try {
        const res = await axios.post(
          import.meta.env.VITE_VERIFY_USER_URL,
          body,
          config
        );
        if (res.data.code !== "token_not_valid") {
          dispatch(authenticatedSuccess());
          // dispatch(load_user());
        } else {
          dispatch(authenticatedFail());
        }
      } catch (err) {
        dispatch(authenticatedFail());
      }
    } else {
      dispatch(authenticatedFail());
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    dispatch(logoutPerform());
  }
);
