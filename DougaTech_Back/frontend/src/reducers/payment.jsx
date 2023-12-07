import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: false,
    success : false,
    detail : null,
    coupon: {
        coupon: null,
        error: false,
    },
    payments: {
        data: [],
        error: false,
        errorMessage: "",
    }
}

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        paymentSuccess: (state, action) => {
            state.detail = action.payload;
            state.success = true;
            state.error = false;
        },
        paymentFail: (state, action) => {
        state.payments.errorMessage = action.payload;
        state.success = false;
        state.error = true;
        },
        couponAddedSuccess: (state) => {
            state.coupon.coupon = true;
            state.coupon.error = false;
        },
        couponAddedFail: (state) => {
            state.coupon.coupon = false;
            state.coupon.error = true;

        },
        paymentListedSuccess: (state, action) => {
            state.payments.data = action.payload;
            state.payments.error = false;
        },
        paymentListedFail: (state) => {
            state.payments.data = [];
            state.payments.errorMessage = false;
            state.payments.error = true;

        },
        paymentResetFields: () => initialState,

    }
});

export const {
    paymentSuccess,
    paymentFail,
    couponAddedSuccess,
    couponAddedFail,
    paymentListedSuccess,
    paymentListedFail,
    paymentResetFields
} = paymentSlice.actions

export default paymentSlice.reducer