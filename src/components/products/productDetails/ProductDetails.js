import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.scss";
import { Link, useParams } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../../../firebase/config";
// import { toast } from "react-toastify";
import Loader from "../../loader/Loader";
import Card from "../../card/Card";
import spinner from "../../../assets/spinner.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_AMOUNT,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  selectCartItems,
} from "../../../redux/slice/cartslice";
import useFetchDocument from "../../../customehooks/useFetchDocument";
import useFetchCollection from "../../../customehooks/useFetchCollection";
import StarsRating from "react-star-rate";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();

  const { id } = useParams();

  const { item } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews");

  const filterdReviews = data.filter((item) => item.productId === id);

  console.log("filter", filterdReviews);

  const cartItem = cartItems.find((item) => item.id === id);

  // const getProduct = async () => {
  //   setIsLoading(true);
  //   try {
  //     const docRef = doc(db, "products", id);
  //     const docSnap = await getDoc(docRef);
  //     // if you didn't use the async and await use the following code
  //     // docSnap.then((item) => {
  //     //   console.log(item.data())
  //     // })
  //     if (docSnap.exists()) {
  //       const item = docSnap.data();
  //       setProduct({ id: id, ...item });
  //       setIsLoading(false);
  //     } else {
  //       setIsLoading(false);
  //       console.log("no such file");
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     toast.error(error.code);
  //   }
  // };

  const addToCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
    dispatch(CALCULATE_TOTAL_AMOUNT());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const increaseQuantity = (cart) => {
    dispatch(INCREASE_QUANTITY(cart));
    dispatch(CALCULATE_TOTAL_AMOUNT());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseQuantity = (cart) => {
    dispatch(DECREASE_QUANTITY(cart));
    dispatch(CALCULATE_TOTAL_AMOUNT());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  useEffect(() => {
    setProduct(item);
  }, [item]);

  return (
    <>
      {isLoading && <Loader />}
      <section>
        <div className={`container ${styles.product}`}>
          <h2>productDetails</h2>
          <div>
            <Link to="/#products">
              <button className="--btn --btn-red">
                &larr; Back to products
              </button>
            </Link>
          </div>
          <Card className={styles.card}>
            {product === null ? (
              <img src={spinner} alt="loader" style={{ width: "150px" }} />
            ) : (
              <div className={styles.details}>
                <div className={styles.img}>
                  <img src={product.imageURL} alt="product image" />
                </div>

                <div className={styles.content}>
                  <h3>{product.name}</h3>
                  <p className={styles.price}>${product.price}</p>

                  <p className={styles.desc}>{product.desc}</p>

                  <p className={styles.brand}>
                    <b>SKU: </b> {product.id}
                  </p>

                  <p className={styles.brand}>
                    <b>Brand: </b> {product.brand}
                  </p>

                  {!cartItem ? null : (
                    <div className={styles.count}>
                      <button
                        className="--btn --bg-dark --color-white"
                        style={{ padding: "6px 10px" }}
                        onClick={() => decreaseQuantity(product)}
                      >
                        -
                      </button>
                      <p>
                        <b>{cartItem.cartQuantity}</b>
                      </p>
                      <button
                        className="--btn --bg-dark --color-white"
                        onClick={() => increaseQuantity(product)}
                      >
                        +
                      </button>
                    </div>
                  )}

                  <div>
                    <button
                      className="--btn --btn-red"
                      onClick={() => addToCart(product)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Card>

          <Card className={styles.card}>
            <h3>Product Review</h3>
            {filterdReviews.length === 0 ? (
              <p>There are no reviews for this product yet</p>
            ) : (
              filterdReviews.map((item) => {
                const { rate, review, userName, reviewDate } = item;
                return (
                  <div className={styles.review}>
                    <StarsRating value={rate} />
                    <p>{review}</p>
                    <span style={{ fontSize: "1.4rem" }}>
                      <b>{userName}</b>
                    </span><br />
                    <span>
                      <b>{reviewDate}</b>
                    </span>
                  </div>
                );
              })
            )}
          </Card>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
