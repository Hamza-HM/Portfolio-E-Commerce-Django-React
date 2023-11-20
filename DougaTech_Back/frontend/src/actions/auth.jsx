import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from '../urils/cookieUtil';
import {
    loginSuccess,
    loginFail,
    signUpSuccess,
    signUpFail,
    authenticatedSuccess,
    authenticatedFail,
}from '../reducers/auth';

export const login = createAsyncThunk(
    'auth/login',
    async({email, password}, {dispatch}) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            },
            withCredentials: true
        }
        const body = {
            email,
            password
        }
        try {
            const res = await axios.post(import.meta.env.VITE_LOGIN_URL,
            config,
            body)
            dispatch(loginSuccess(res.data))
        }
        catch (err) {
            dispatch(loginFail(err))
        }

    }
)
export const register = createAsyncThunk(
    'auth/register',
    async({username, email, password, re_password}, {dispatch}) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            },
            withCredentials: true
        }
        const body = {
            username,
            email,
            password,
            re_password
        }
        try {
            const res = await axios.post(import.meta.env.VITE_REGISTER_URL,
            config,
            body)
            dispatch(signUpSuccess(res.data))
        }
        catch (err) {
            dispatch(signUpFail(err))
        }

    }
)

export const checkAuthenticated = createAsyncThunk(
    'auth/checkAuthenticated',
    async(_, {dispatch}) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            }
        }
        const body = {
            token: localStorage.getItem('access')
        }
        try {
            await axios.post(import.meta.env.VITE_VERIFY_USER_URL,
            config,
             body)
             dispatch(authenticatedSuccess());
        }
        catch (err) {
            dispatch(authenticatedFail());
        }

    }
)