import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    error: null, // New error field to hold authentication errors
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const { access, refresh } = action.payload;

            localStorage.setItem('access', access);
            localStorage.setItem('refresh', refresh);

            state.isAuthenticated = true;
            state.access = access;
            state.refresh = refresh;
            state.error = null; // Reset any previous errors on successful login
        },
        loginFail: (state, action) => {
            state.isAuthenticated = false;
            state.access = null;
            state.refresh = null;
            state.error = action.payload; // Set the error message from the action payload
        },
        signUpSuccess: (state) => {
            state.isAuthenticated = false;
        },
        signUpFail: (state) => {
            state.isAuthenticated = false;
        },
        authenticatedSuccess: (state) => {
            state.isAuthenticated = true;
        },
        authenticatedFail: (state) => {
            state.isAuthenticated = false;
        }
    },
});

export const {
    loginSuccess,
    loginFail,
    signUpSuccess,
    signUpFail,
    authenticatedSuccess,
    authenticatedFail,
 } = authSlice.actions;

export default authSlice.reducer;
