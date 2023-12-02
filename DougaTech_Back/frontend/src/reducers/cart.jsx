import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shoppingCart: null,
    error: false,
    errorMessage: '',
    loading : true
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        fetchCartSuccess: (state, action) => {
            state.shoppingCart = action.payload;
        },
        fetchCartFail: (state, err) => {
            state.shoppingCart = null;
            state.errorMessage = err.payload
        },
        cartItemRemovedSuccess: () => {
            // state.error = false;
            // state.loading = false;
        },
        cartItemRemovedFail: () => {
            // state.errorMessage = err.payload
            // state.loading = false;
            // state.error = true;
        },
        paymentSuccess: () => {},
        paymentFail: () => {},
        updateItemCartQuantitySuccess: () => {},
        updateItemCartQuantityFail: () => {}
    }
});

export const {
    fetchCartSuccess,
    fetchCartFail,
    paymentSuccess,
    paymentFail,
    cartItemRemovedSuccess,
    cartItemRemovedFail,
    updateItemCartQuantitySuccess,
    updateItemCartQuantityFail
} = cartSlice.actions

export default cartSlice.reducer