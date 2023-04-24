import { createSlice } from "@reduxjs/toolkit";

//Intial state of the auth slice
const initialState = {
  isAuthenticated: false,
  token: null,
};

// Define the auth slice with initial state and reducers
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //login reducer sets isAuthenticated to true and updates the token
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    //logout reducer sets isAuthenticated to false and clears the token
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

//and finally export the actions and the reducer

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
