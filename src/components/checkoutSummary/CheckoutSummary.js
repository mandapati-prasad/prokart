import React, { useEffect } from "react";
import styles from "./CheckoutSummary.module.scss";
import {
  CALCULATE_TOTAL_AMOUNT,
  CALCULATE_TOTAL_QUANTITY,
  selectCartAmount,
  selectCartItems,
  selectCartQuantity,
} from "../../redux/slice/cartslice";
import { useDispatch, useSelector } from "react-redux";
import Card from "../card/Card";
import { Link } from "react-router-dom";

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartAmount);
  const totalQuantity = useSelector(selectCartQuantity);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_AMOUNT())
    dispatch(CALCULATE_TOTAL_QUANTITY())
  },[dispatch,cartItems])

  return (
    <div>
      <h3>Checkout Summary</h3>
      {cartItems.length === 0 ? (
        <>
          <p>No products in the cart</p>
          <Link to="/#products">
            <button className="--btn --btn-red" style={{ marginTop: "1rem" }}>
              &larr; Back to Shop
            </button>
          </Link>
        </>
      ) : (
        <>
          <p>
            <b>Cart item(s): {totalQuantity}</b>
          </p>
          <div className={styles.text}>
            <h4>Subtotal:</h4>
            <h3>${totalAmount.toFixed(2)}</h3>
          </div>
          <div>
            {cartItems.map((item) => {
              const { name, id, cartQuantity, price } = item;
              return (
                <Card key={id} className={styles.card}>
                  <h4>Product: {name}</h4>
                  <p>Quantity: {cartQuantity}</p>
                  <p>Unit price: {price}</p>
                  <p>Total Amount: {price * cartQuantity}</p>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutSummary;
