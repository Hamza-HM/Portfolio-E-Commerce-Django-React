import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
    user: {
        user_email: '',
        user_first_name: '',
        user_last_name: '',
        phone_number: '',
        date_of_birth: '',
        credit_card: '',
        profile_picture: '',
        loyalty_points: '',
    },
    addresses: {
      error: false,
      errorMessage: "",
      loading: true,
      data: [],
      success: false,
    },
    countries: {
      error: false,
      errorMessage: "",
      loading: true,
      data: [],
    },
  };


const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        userLoadedSuccess: (state, action) => {
            state.user = action.payload;
          },
          userLoadedFail: (state) => {
            state.user = {}

          },
          addressLoadedSuccess: (state, action) => {
            state.addresses.data = action.payload;
            state.addresses.error = false
            state.addresses.errorMessage = ""
            state.addresses.loading = false
          },
          addressLoadedFail: (state, action) => {
            state.addresses.data = [];
            state.addresses.error = true
            state.addresses.errorMessage = action.payload
            state.addresses.loading = false
          },
          addressCreateSuccess: (state, action) => {
            state.addresses.error = false;
            state.addresses.loading = false;
            state.addresses.success = true;

          },
          addressCreateFail: (state, action) => {
            state.addresses.error = true;
            state.addresses.loading = false;
            state.addresses.success = false;

          },
          addressUpdateSuccess: (state) => {
            state.addresses.error = false;
            state.addresses.loading = false;
            state.addresses.success = true;

          },
          addressUpdateFail: (state) => {
            state.addresses.error = true;
            state.addresses.loading = false;
            state.addresses.success = false;

          },
          addressDeleteSuccess: (state) => {
            state.addresses.error = false;
            state.addresses.loading = false;
            state.addresses.success = true;

          },
          addressDeleteFail: (state) => {
            state.addresses.error = true;
            state.addresses.loading = false;
            state.addresses.success = false;

          },
          loadCountriesSuccess: (state, action) => {
            state.countries.data = action.payload;
            state.countries.error = false
            state.countries.errorMessage = ""
            state.countries.loading = false
          },
          loadCountriesFail: (state, action) => {
            state.countries.data = [];
            state.countries.error = true
            state.countries.errorMessage = action.payload.response.data
            state.countries.loading = false
          },
    }
});

export const {
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
  addressDeleteFail
} = profileSlice.actions;

export default profileSlice.reducer;