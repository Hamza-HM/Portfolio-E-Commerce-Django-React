import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: null,
  loading: true,
  error: false,
  errorMessage: "",
  productDetail: {
    product: null,
    error: false,
    errorMessage: "",
    loading: true,
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsLoadedSuccess: (state, action) => {
      state.productList = action.payload;
      state.loading = false;
      state.error = false;
    },
    productsLoadedFail: (state) => {
      state.productList = [];
      state.loading = false;
      state.error = true;
      state.errorMessage = "page not found 404";
    },
    productLoadedSuccess: (state, action) => {
      state.productDetail.product = action.payload;
      state.productDetail.loading = false;
      state.productDetail.error = false;
    },
    productLoadedFail: (state) => {
      state.productDetail.product = [];
      state.productDetail.loading = false;
      state.productDetail.error = true;
      state.productDetail.errorMessage = "page not found 404";
    },
    productAddedToCartSuccess: () => {},
    productAddedToCartFail: () => {},
  },
});

export const {
  productsLoadedSuccess,
  productsLoadedFail,
  productLoadedSuccess,
  productLoadedFail,
  productAddedToCartSuccess,
  productAddedToCartFail,
} = productSlice.actions;

export default productSlice.reducer;
