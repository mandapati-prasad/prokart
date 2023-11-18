import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products : []
}

const productSlice = createSlice({
  name: "productlist",
  initialState,
  reducers: {
    STORE_PRODUCTS : (state, action) => {
      state.products = action.payload
      console.log(state.products)
    }
  }
});

export const {STORE_PRODUCTS} = productSlice.actions

export const selectProducts = (state) => state.productlist.products;

export default productSlice.reducer