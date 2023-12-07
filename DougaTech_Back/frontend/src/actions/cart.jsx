import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../urils/cookieUtil";

import {
  paymentSuccess,
  paymentFail,
  couponAddedSuccess,
  couponAddedFail,
  paymentListedSuccess,
  paymentListedFail,
} from "../reducers/payment";
import {
  fetchCartSuccess,
  fetchCartFail,
  cartItemRemovedSuccess,
  cartItemRemovedFail,
  updateItemCartQuantitySuccess,
  updateItemCartQuantityFail,
} from "../reducers/cart";

// Cart dtails
export const fetchCart = createAsyncThunk(
  "products/fetchCart",
  async (_, { dispatch }) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem("access")}`,
          "X-CSRFToken": getCookie("csrftoken"),
        },
        withCredentials: true,
      };
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_ORDER_SUMMARY_URL}`,
          config
        );
        dispatch(fetchCartSuccess(res.data));
        // console.log(res.data);
      } catch (error) {
        dispatch(fetchCartFail(error.response.data));
      }
    } else {
      dispatch(fetchCartFail("you must be authenticated!"));
    }
  }
);
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async ({ itemID }, { dispatch }) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          "X-CSRFToken": getCookie("csrftoken"),
        },
        withCredentials: true,
      };

      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_DELETE_ORDER_ITEM_URL}${itemID}/delete/`,
          config
        );

        // const res = await axios.request({
        //   method: "DELETE",
        //   url: `${
        //     import.meta.env.VITE_DELETE_ORDER_ITEM_URL
        //   }${itemID}/delete/`,
        //   headers: config.headers,
        // });
        dispatch(cartItemRemovedSuccess(res.data));
        dispatch(fetchCart());
      } catch (error) {
        dispatch(cartItemRemovedFail(error.response.data));
      }
    } else {
      dispatch(cartItemRemovedFail("you must be authenticated!"));
    }
  }
);

export const updateItemCartQuantity = createAsyncThunk(
  "cart/updateItemCartQuantity",
  async ({ slug, variations }, { dispatch }) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem("access")}`,
          "X-CSRFToken": getCookie("csrftoken"),
        },
        withCredentials: true,
      };
      const body = {
        slug,
        variations,
      };

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_UPDATE_CART_ITEM_URL}`,
          body,
          config
        );
        dispatch(updateItemCartQuantitySuccess(response.data));
        dispatch(fetchCart());
      } catch (error) {
        dispatch(updateItemCartQuantityFail(error.response.data));
      }
    } else {
      dispatch(updateItemCartQuantityFail("you must be authenticated!"));
    }
  }
);

// payment with stripe

export const makePay = createAsyncThunk(
  "products/makePay",
  async ({ token }, { dispatch }) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem("access")}`,
          "X-CSRFToken": getCookie("csrftoken"),
        },
        withCredentials: true,
      };
      const body = {
        stripeToken: token.id,
      };
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_PAYMENT_URL}`,
          body,
          config
        );
        dispatch(paymentSuccess(response.data.message));
        dispatch(fetchCart());
        
      } catch (error) {
        console.log("cart checkout error: ", error)
      }
    } else {
      dispatch(paymentFail("you must be authenticated!"));
    }
  }
);

//coupon

export const getCoupon = createAsyncThunk(
  "products/getCoupon",
  async ({ code }, { dispatch }) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem("access")}`,
          "X-CSRFToken": getCookie("csrftoken"),
        },
        withCredentials: true,
      };
      const body = {
        code,
      };
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_ADD_COUPON_URL}`,
          body,
          config
        );
        console.log("cart coupon response: ", response);
        dispatch(couponAddedSuccess(response.data));
        dispatch(fetchCart());
      } catch (error) {
        dispatch(couponAddedFail(error));
        console.log("coupon stuff error: ", error);
      }
    } else {
      dispatch(couponAddedFail("you must be authenticated!"));
    }
  }
);

// VITE_API_PAYMENT_LIST_URL

export const load_payment_list = createAsyncThunk(
  "products/load_payment_list",
  async (_, { dispatch }) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem("access")}`,
          "X-CSRFToken": getCookie("csrftoken"),
        },
        withCredentials: true,
      };
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_PAYMENT_LIST_URL}`,
          config
        );
        dispatch(paymentListedSuccess(response.data));
      } catch (error) {
        dispatch(paymentListedFail(error));
        console.log("coupon stuff error: ", error);
      }
    } else {
      dispatch(paymentListedFail("you must be authenticated!"));
    }
  }
);
