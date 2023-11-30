import React, { useEffect, useState } from "react";
import styles from "./ProductFilter.module.scss";
import {
  max_price,
  min_price,
  selectProducts,
} from "../../../redux/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../../redux/slice/filterSlice";

const ProductFilter = () => {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(3000);
  const min_p = useSelector(min_price);
  const max_p = useSelector(max_price);
  const products = useSelector(selectProducts);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  const brands = ["All", ...new Set(products.map((product) => product.brand))];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      FILTER_BY_BRAND({
        products,
        brand,
      })
    );
    setPrice(max_p);
  }, [dispatch, brand, products]);

  useEffect(() => {
    dispatch(
      FILTER_BY_PRICE({
        products,
        price,
      })
    );
  }, [dispatch, price, products]);

  const filterProduct = (cat) => {
    setCategory(cat);
    dispatch(
      FILTER_BY_CATEGORY({
        products,
        category: cat,
      })
    );
    setPrice(max_p);
  };

  const clearFilter = () => {
    setBrand("All")
    setPrice(max_p)
    filterProduct("All")
    
  };

  return (
    <div className={styles.filter}>
      <h4>Category</h4>
      <div className={styles.category}>
        {categories.map((cat, index) => {
          return (
            <button
              key={index}
              className={`${category}` === cat ? styles.active : ""}
              onClick={() => filterProduct(cat)}
            >
              {cat}
            </button>
          );
        })}
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select
          name="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          {brands.map((brand, index) => {
            return (
              <option key={index} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>
      </div>
      <h4>Price</h4>
      <p>${price}</p>
      <div className={styles.price}>
        <input
          type="range"
          name="product price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min={min_p}
          max={max_p}
        />
      </div>
      <button className="--btn --btn-red" onClick={clearFilter}>
        Clear Filter
      </button>
    </div>
  );
};

export default ProductFilter;
