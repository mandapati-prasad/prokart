import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  billingAddress : {},
  shippingAddress : {}
}

const checkoutslice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    ADD_BILLING_ADDRESS:(state,action) => {
      state.billingAddress = action.payload;
      console.log(state.billingAddress)
    },
    ADD_SHIPPING_ADDRESS:(state,action) => {
      state.shippingAddress = action.payload;
      console.log(state.shippingAddress)
    }
  }
});

export const {ADD_BILLING_ADDRESS,ADD_SHIPPING_ADDRESS} = checkoutslice.actions

export const selectBillingAddress = (state) => state.checkout.billingAddress;
export const selectShippingAddress = (state) => state.checkout.shippingAddress;


export default checkoutslice.reducer