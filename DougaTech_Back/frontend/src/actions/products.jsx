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
// import { fetchCart } from "./cart";

export const loadProducts = createAsyncThunk(
  "products/loadProducts",
  async (_, { dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
    };

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_PRODUCT_LIST_URL}`,
        config
      );
      dispatch(productsLoadedSuccess(res.data));
    } catch (error) {
      dispatch(productsLoadedFail(error));
    }
  }
);
export const loadProduct = createAsyncThunk(
  "products/loadProduct",
  async ({ productID }, { dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
    };
    console.log("from action", productID);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_PRODUCT_LIST}${productID}/`,
        config
      );
      console.log("this is the product data: ", res.data);
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

      try {
        await axios.post(`${import.meta.env.VITE_ADD_TO_CART}`, body, config);
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
