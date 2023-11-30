import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  totalAmount: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    SAVE_ORDER_ITEMS: (state, action) => {
      state.orderItems = action.payload;
    },

    CALCULATE_ORDER_AMOUNT: (state) => {
      const array = [];
      state.orderItems.map((item) => {
        return array.push(item.orderAmount);
      });
      const amount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalAmount = amount;
    },
  },
});

export const { SAVE_ORDER_ITEMS,CALCULATE_ORDER_AMOUNT } = orderSlice.actions;

export const selectOrderItems = (state) => state.orders.orderItems;
export const selectTotalAmount = (state) => state.orders.totalAmount;

export default orderSlice.reducer;
