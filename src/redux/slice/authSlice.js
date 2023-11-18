import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userEmail: null,
  userName: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      const {email, name, id} = action.payload
      state.isLoggedIn = true;
      state.userEmail = email;
      state.userId = id;
      state.userName = name;
    },
    REMOVE_ACTIVE_USER: (state) => {
      state.isLoggedIn = false;
      state.userEmail = null;
      state.userId = null;
      state.userName = null;
    }
  },
});

export const {SET_ACTIVE_USER,REMOVE_ACTIVE_USER} = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectuserEmail = (state) => state.auth.userEmail;
export const selectuserName = (state) => state.auth.userName;
export const selectuserId = (state) => state.auth.userId;

export default authSlice.reducer;
