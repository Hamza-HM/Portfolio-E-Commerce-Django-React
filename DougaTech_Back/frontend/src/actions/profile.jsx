import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../urils/cookieUtil";
import axios from "axios";

import {
  userLoadedSuccess,
  userLoadedFail,
  addressLoadedSuccess,
  addressLoadedFail,
  addressCreateSuccess,
  addressCreateFail,
  loadCountriesSuccess,
  loadCountriesFail,
  addressUpdateSuccess,
  addressUpdateFail,
  addressDeleteSuccess,
  addressDeleteFail,
} from "../reducers/profile";
//   import { fetchCart } from "./cart";

export const load_user = createAsyncThunk(
  "auth/load_user",
  async (_, { dispatch }) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          "X-CSRFToken": getCookie("csrftoken"),
        },
      };

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/users/profile/`,
          config
        );
        dispatch(userLoadedSuccess(response.data));
        dispatch(fetchCart());
        dispatch(load_countries());
      } catch (err) {
        dispatch(userLoadedFail(err));
      }
    } else {
      dispatch(userLoadedFail("you must be authenticated!"));
    }
  }
);

export const load_addresses = createAsyncThunk(
  "auth/load_addresses",
  async ({ addrType }, { dispatch }) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          "X-CSRFToken": getCookie("csrftoken"),
        },
      };
      const body = {
        addrType,
      };
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_ADDRESS_URL}?address_type=${addrType}`,
          config
        );
        console.log(res.data);
        dispatch(addressLoadedSuccess(res.data));
      } catch (err) {
        dispatch(addressLoadedFail(err));
      }
    } else {
      dispatch(addressLoadedFail("you must be authenticated!"));
    }
  }
);

export const create_address = createAsyncThunk(
  "auth/create_address",
  async (
    { street_address, country, zip, default_addr, address_type },
    { dispatch }
  ) => {
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
        street_address,
        country,
        zip,
        default_addr,
        address_type,
      };
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_ADDRESS_URL}`,
          body,
          config
        );
        dispatch(addressCreateSuccess(res.data));
        // dispatch(load_addresses("S"));
      } catch (err) {
        dispatch(addressCreateFail(err.response.data));
      }
    } else {
      dispatch(addressCreateFail("you must be authenticated!"));
    }
  }
);

export const update_address = createAsyncThunk(
  "auth/update_address",
  async (
    { street_address, country, zip, default_addr, address_type },
    { dispatch }
  ) => {
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
        street_address,
        country,
        zip,
        default_addr,
        address_type,
      };
      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_API_ADDRESS_URL}`,
          body,
          config
        );
        dispatch(addressUpdateSuccess(response.data));
        // dispatch(load_addresses(address_type));
      } catch (err) {
        dispatch(addressUpdateFail(err));
      }
    } else {
      dispatch(addressUpdateFail("you must be authenticated!"));
    }
  }
);

export const delete_address = createAsyncThunk(
  "auth/delete_address",
  async (
    { street_address, country, zip, default_addr, address_type },
    { dispatch }
  ) => {
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
        street_address,
        apartment_address,
        country,
        zip,
        default_addr,
        address_type,
      };
      try {
        const response = await axios.request({
          method: "DELETE",
          url: `${import.meta.env.VITE_API_ADDRESS_URL}/`,
          data: body,
          headers: config.headers,
        });

        dispatch(addressDeleteSuccess(response.data));
        dispatch(load_addresses(address_type));
      } catch (err) {
        dispatch(addressDeleteFail(err));
      }
    } else {
      dispatch(addressDeleteFail("you must be authenticated!"));
    }
  }
);

export const load_countries = createAsyncThunk(
  "auth/load_countries",
  async (_, { dispatch }) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          "X-CSRFToken": getCookie("csrftoken"),
        },
      };
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_COUNTRY_LIST_URL}`,
          config
        );
        dispatch(loadCountriesSuccess(response.data));
      } catch (err) {
        dispatch(loadCountriesFail(err));
      }
    } else {
      dispatch(loadCountriesFail("you must be authenticated!"));
    }
  }
);
