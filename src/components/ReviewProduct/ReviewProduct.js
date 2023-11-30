import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectProducts } from "../../redux/slice/productSlice";
import { selectuserId, selectuserName } from "../../redux/slice/authSlice";
import styles from "./ReviewProduct.module.scss";
import Card from "../card/Card";
import StarsRating from "react-star-rate";
import useFetchDocument from "../../customehooks/useFetchDocument";
import spinner from "../../assets/spinner.jpg";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";

const ReviewProduct = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState(null);

  const { id } = useParams();

  const { item } = useFetchDocument("products", id);
  const userId = useSelector(selectuserId);
  const userName = useSelector(selectuserName);

  console.log(product);

  useEffect(() => {
    setProduct(item);
  }, [item]);

  const submitReview = (e) => {
    e.preventDefault();
    const date = new Date().toDateString();
    const reviewConfig = {
      userId,
      userName,
      rate,
      review,
      productId: id,
      reviewDate: date,
      date: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("review submitted successfully");
      setRate(0);
      setReview("");
    } catch (error) {
      toast.error(error.code)
    }
  };

  return (
    <div className={`container ${styles.review}`}>
      <h2>Review</h2>
      {product === null ? (
        <img src={spinner} alt="Loading..." style={{ width: "100px" }} />
      ) : (
        <>
          <p>
            <b>Product Name:</b> {product.name}
          </p>
          <img
            src={product.imageURL}
            alt={product.name}
            style={{ width: "100px" }}
          />
          <Card className={styles.card}>
            <form onSubmit={(e) => submitReview(e)}>
              <label>Rating:</label>
              <StarsRating value={rate} onChange={(rate) => setRate(rate)} />
              <label>Review:</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                cols="30"
                rows="10"
              ></textarea>
              <button type="submit" className="--btn --btn-red">
                Submit Review
              </button>
            </form>
          </Card>
        </>
      )}
    </div>
  );
};

export default ReviewProduct;
