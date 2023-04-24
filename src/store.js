import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

//configuring the redux store with the auth reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
