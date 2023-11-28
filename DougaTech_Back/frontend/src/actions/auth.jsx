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
  accountActivationSuccess,
  accountActivationFail,
  logoutPerform,
  passwordResetSuccess,
  passwordResetFail,
  passwordResetConfirmSuccess,
  passwordResetConfirmFail,
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
    } catch (err) {
      dispatch(loginFail(err.response.data));
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
  async (values, { dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      withCredentials: true,
    };
    const body = values;
    try {
      const res = await axios.post(
        import.meta.env.VITE_REGISTER_URL,
        body,
        config
      );
      dispatch(signUpSuccess(res.data));
    } catch (err) {
      dispatch(signUpFail(err.response.data));
    }
  }
);

export const activate = createAsyncThunk(
  "auth/activate",
  async (values, { dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
    };
    const body = values;
    try {
      await axios.post(import.meta.env.VITE_ACCOUNT_ACTIVATE_URL, body, config);
      dispatch(accountActivationSuccess());
    } catch (err) {
      dispatch(accountActivationFail(err.response.data));
    }
  }
);

export const checkAuthenticated = createAsyncThunk(
  "auth/checkAuthenticated",
  async (_, { dispatch }) => {
    if (localStorage.getItem("access")) {
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
        dispatch(authenticatedFail(err.reponse.data));
      }
    } else {
      dispatch(authenticatedFail());
    }
  }
);

export const passwordReset = createAsyncThunk(
  "auth/passwordReset",
  async ({ email }, { dispatch }) => {
    const config = {
      "Content-Type": "application/json",
      accept: "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    };
    const body = {
      email: email,
    };
    try {
      const res = await axios.post(
        import.meta.env.VITE_PASSWORD_RESET_URL,
        body,
        config
      );
      dispatch(passwordResetSuccess());
    } catch (err) {
      dispatch(passwordResetFail(err.response.data));
    }
  }
);
export const resetPasswordConfirmation = createAsyncThunk(
  "auth/passwordResetConfirm",
  async ({ uid, token, password, re_password }, { dispatch }) => {
    const config = {
      "Content-Type": "application/json",
      accept: "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    };
    const body = {
      uid,
      token,
      new_password: password,
      re_new_password: re_password,
    };
    try {
      await axios.post(
        import.meta.env.VITE_PASSWORD_RESET_CONFIRM_URL,
        body,
        config
      );
      dispatch(passwordResetConfirmSuccess());
    } catch (err) {
      dispatch(passwordResetConfirmFail(err.response.data));
    }
  }
);

export const facebookAuth = createAsyncThunk(
  "auth/facebookAuth",
  async ({ state, code }, { dispatch }) => {
    if (state && code && !localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-CSRFToken": getCookie("csrftoken"),
        },
      };
      const details = {
        state: state,
        code: code,
      };
      const formBody = Object.keys(details)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
        )
        .join("&");

      try {
        const response = await axios.post(
          `
      ${import.meta.env.VITE_REACT_APP_BASE_URL}/auth/o/facebook/?${formBody}`,
          config
        );
        dispatch(loginSuccess(response.data));
        // dispatch(load_user())
      } catch (error) {
        dispatch(loginFail());
        // dispatch(userLoadedFail())
      }
    } else {
      dispatch(loginFail("Account login error!"));
    }
  }
);

export const googleAuth = createAsyncThunk(
  'auth/googleAuth',
  async ({state, code}, {dispatch}) => {
    if (state && code && !localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-CSRFToken": getCookie("csrftoken"),

        },
      };
      const details = {
        "state" : state,
        "code" : code
      };
      const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

      try {
      const response = await axios.post(`
      ${import.meta.env.VITE_REACT_APP_BASE_URL}/auth/o/google-oauth2/?${formBody}`, config)
      dispatch(loginSuccess(response.data))
      // dispatch(load_user())
      } catch (error) {
        dispatch(loginFail());
        // dispatch(userLoadedFail());
      }
    }
}
)
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    dispatch(logoutPerform());
  }
);
