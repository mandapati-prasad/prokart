import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmout: 0,
  previous_URL:"",
};

const cartslice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQuantity += 1;
        toast.info(`${action.payload.name} is Edited successfully`, {
          position: "top-left",
        });
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} added successfully`, {
          position: "top-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    DECREASE_QUANTITY: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.info(`${action.payload.name} is Edited successfully`, {
          position: "top-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    INCREASE_QUANTITY: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[productIndex].cartQuantity >= 1) {
        state.cartItems[productIndex].cartQuantity += 1;
        toast.info(`${action.payload.name} is Edited successfully`, {
          position: "top-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    DELETE_CART_PRODUCT: (state, action) => {
      const newCartList = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = newCartList;
      toast.success(`${action.payload.name} is removed successfully`, {
        position: "top-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    CLEAR_CART: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", state.cartItems);
    },

    CALCULATE_TOTAL_AMOUNT: (state) => {
      let totalAmount = 0;
      state.cartItems.map((item) => {
         totalAmount = totalAmount + item.price * item.cartQuantity;
      });
      state.cartTotalAmout = totalAmount;
    },

    CALCULATE_TOTAL_QUANTITY: (state) => {
      let totalQuantity = 0;
      state.cartItems.map((item) => {
        totalQuantity = totalQuantity + item.cartQuantity;
      });
      state.cartTotalQuantity = totalQuantity;
    },

    SAVE_URL: (state, action) => {
      state.previous_URL = action.payload.toString()
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  DELETE_CART_PRODUCT,
  CLEAR_CART,
  CALCULATE_TOTAL_AMOUNT,
  CALCULATE_TOTAL_QUANTITY,
  SAVE_URL,
} = cartslice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartAmount = (state) => state.cart.cartTotalAmout;
export const selectPreviousURL = (state) => state.cart.previous_URL;

export default cartslice.reducer;
