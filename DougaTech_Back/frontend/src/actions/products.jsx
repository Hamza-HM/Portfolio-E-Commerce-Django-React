import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../urils/cookieUtil";

import {
  productsLoadedSuccess,
  productsLoadedFail,
  productLoadedSuccess,
  productLoadedFail,
  productAddedToCartSuccess,
  productAddedToCartFail,
} from "../reducers/products";
import { fetchCart } from "./cart";
// import { fetchCart } from "./cart";

export const loadProducts = createAsyncThunk(
  "products/loadProducts",
  async ({ url }, { dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
    };

    try {
      const requestUrl = url || `${import.meta.env.VITE_PRODUCT_LIST_URL}`;

      const res = await axios.get(requestUrl, config);
      dispatch(productsLoadedSuccess(res.data));
    } catch (error) {
      dispatch(productsLoadedFail(error));
    }
  }
);

export const loadProduct = createAsyncThunk(
  "products/loadProduct",
  async ({ id }, { dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
    };
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_PRODUCT_LIST_URL}${id}`,
        config
      );
      dispatch(productLoadedSuccess(res.data));
    } catch (error) {
      dispatch(productLoadedFail(error));
    }
  }
);

export const addToCart = createAsyncThunk(
  "products/addToCart",
  async ({ slug, variations }, { dispatch }) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          "X-CSRFToken": getCookie("csrftoken"),
        },
        withCredentials: true,
      };
      const body = {
        slug,
        variations,
      };
      console.log(body);

      try {
        await axios.post(import.meta.env.VITE_ADD_TO_CART_URL, body, config);
        dispatch(productAddedToCartSuccess());
        dispatch(fetchCart());
      } catch (error) {
        dispatch(productAddedToCartFail());
        console.error(error);
      }
    } else {
      dispatch(productAddedToCartFail());
    }
  }
);
