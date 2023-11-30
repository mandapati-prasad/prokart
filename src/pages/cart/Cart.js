import React, { useEffect } from "react";
import styles from "./Cart.module.scss";
import {
  CALCULATE_TOTAL_AMOUNT,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_QUANTITY,
  DELETE_CART_PRODUCT,
  INCREASE_QUANTITY,
  SAVE_URL,
  selectCartAmount,
  selectCartItems,
  selectCartQuantity,
} from "../../redux/slice/cartslice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Card from "../../components/card/Card";
import { Confirm } from "notiflix";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmout = useSelector(selectCartAmount);
  const cartTotalQuantity = useSelector(selectCartQuantity);

  const url = window.location.href;
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate()

  const dispatch = useDispatch();

  const checkOut = () => {
    if (isLoggedIn) {
      navigate("/checkout-details")
    }else{
      dispatch(SAVE_URL(url))
      navigate("/login")
    }
  };

  const decreaseQuantity = (cart) => {
    dispatch(DECREASE_QUANTITY(cart));
  };

  const increaseQuantity = (cart) => {
    dispatch(INCREASE_QUANTITY(cart));
  };

  const confirmNote = (cart, func, title, query, button) => {
    Confirm.show(
      title,
      query,
      button,
      "Cancle",
      () => {
        if (cart !== undefined) {
          func(cart);
        } else {
          func();
        }
      },
      () => {
        console.log("");
      },
      {
        titleColor: "red",
        titleFontSize: "2rem",
        okButtonColor: "white",
        okButtonBackground: "red",
        borderRadius: "3px",
        width: "400px",
      }
    );
  };

  const deleteCartProduct = (cart) => {
    dispatch(DELETE_CART_PRODUCT(cart));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_AMOUNT());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Your cart is currently empty</p>
            <br />
            <Link to="/#products">
              <button className="--btn --btn-red">
                &larr; Continue Shoping
              </button>
            </Link>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, index) => {
                  const { id, name, imageURL, price, cartQuantity } = cart;

                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img src={imageURL} alt={name} width="100px" />
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className={styles.count}>
                          <button
                            className="--btn --bg-dark --color-white"
                            onClick={() => decreaseQuantity(cart)}
                          >
                            -
                          </button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button
                            className="--btn --bg-dark --color-white"
                            onClick={() => increaseQuantity(cart)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{(cartQuantity * price).toFixed(2)}</td>
                      <td className={styles.icon}>
                        <FaTrash
                          size={26}
                          color="red"
                          onClick={() =>
                            confirmNote(
                              cart,
                              deleteCartProduct,
                              "Remove Product",
                              "Do you want to remove this product from cart",
                              "Remove"
                            )
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button
                className="--btn --btn-red"
                onClick={() =>
                  confirmNote(
                    undefined,
                    clearCart,
                    "Clear Cart",
                    "Do you want to remove all products from cart",
                    "Clear"
                  )
                }
              >
                Clear Cart
              </button>
              <div className={styles.checkout}>
                <Link to="/#products">
                  <button className={`--btn ${styles.btn}`}>
                    &larr; Continue Shopping
                  </button>
                </Link>
                <Card className={styles.card}>
                  <p>{`Cart Item(s): ${cartTotalQuantity}`}</p>
                  <div className={styles.text}>
                    <h4>Subtotal:</h4>
                    <h3>${cartTotalAmout.toFixed(2)}</h3>
                  </div>
                  <p>Taxes and Shipping calculated at checkout</p>
                  <button className="--btn --btn-block --btn-red" onClick={checkOut}>
                    CheckOut
                  </button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
