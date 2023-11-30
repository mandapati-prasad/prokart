import React, { useEffect, useState } from "react";
import styles from "./Product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import useFetchCollection from "../../customehooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_MIN_MAX_PRICE,
  STORE_PRODUCTS,
  selectProducts,
} from "../../redux/slice/productSlice";
import spinner from "../../assets/spinner.jpg";
import { FaCogs } from "react-icons/fa";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProducts);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );

    dispatch(
      GET_MIN_MAX_PRICE({
        products: data,
      })
    );
  }, [dispatch, data]);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside
          className={
            show ? `${styles.show} ${styles.filter}` : `${styles.filter}`
          }
        >
          <ProductFilter />
        </aside>
        <div className={styles.content}>
          {isLoading ? (
            <img
              src={spinner}
              alt=""
              className="--center-all"
              style={{ width: "100px" }}
            />
          ) : (
            <ProductList products={products} />
          )}
          <div className={styles.icon} onClick={() => setShow(!show)}>
            <FaCogs size={25} />
            <p><b>{show ? "Hide Filter" : "Show Filter"}</b></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
