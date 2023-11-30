import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterdProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH: (state, action) => {
      // console.log(action.payload)
      const { products, search } = action.payload;
      const filteredItems = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );
      state.filterdProducts = filteredItems;
    },

    SORT_PRODUCTS: (state, action) => {
      // console.log(action.payload, state.filterdProducts)
      const { products, sort } = action.payload;
      let tempProducts = [];
      if (sort === "latest") {
        tempProducts = products.slice().sort((a, b) => a.date - b.date);
      } else if (sort === "lowest-price") {
        tempProducts = products.slice().sort((a, b) => a.price - b.price);
      } else if (sort === "highest-price") {
        tempProducts = products.slice().sort((a, b) => b.price - a.price);
      } else if (sort === "a-z") {
        tempProducts = products
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name));
      } else if (sort === "z-a") {
        tempProducts = products
          .slice()
          .sort((a, b) => b.name.localeCompare(a.name));
      }

      state.filterdProducts = tempProducts;
    },

    FILTER_BY_CATEGORY: (state, action) => {
      // console.log(action.payload)
      const { products, category } = action.payload;
      let tempProducts = [];
      if (category === "All") {
        tempProducts = products;
      } else {
        tempProducts = products.filter(
          (product) => product.category === category
        );
      }
      state.filterdProducts = tempProducts;
    },

    FILTER_BY_BRAND: (state, action) => {
      const { products, brand } = action.payload;
      let tempProducts = [];
      if (brand === "All") {
        tempProducts = products;
      } else {
        tempProducts = products.filter((product) => product.brand === brand);
      }
      state.filterdProducts = tempProducts;
    },

    FILTER_BY_PRICE: (state, action) => {
      const { products, price } = action.payload;
      let tempProducts = [];
      tempProducts = products.filter((product) => product.price <= price);
      state.filterdProducts = tempProducts
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
} = filterSlice.actions;

export const selectFilterProducts = (state) => state.filter.filterdProducts;

export default filterSlice.reducer;
