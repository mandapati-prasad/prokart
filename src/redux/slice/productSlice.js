import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  MIN_PRICE:null,
  MAX_PRICE:null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    STORE_PRODUCTS(state, action) {
      // console.log(action.payload.products)
      state.products = action.payload.products;
    },

    GET_MIN_MAX_PRICE: (state, action) => {
      const {products} = action.payload
      let prices = []
      products.map((product) => {
        return prices.push(product.price)
      })
      state.MAX_PRICE = Math.max(...prices)
      state.MIN_PRICE = Math.min(...prices)
    },
  },
});

export const { STORE_PRODUCTS,GET_MIN_MAX_PRICE } = productSlice.actions;

export const selectProducts = (state) => state.product.products;
export const max_price = (state) => state.product.MAX_PRICE;
export const min_price = (state) => state.product.MIN_PRICE;
// console.log(initialState.products)

export default productSlice.reducer;
