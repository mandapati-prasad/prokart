import React from "react";
import styles from "./ProductItem.module.scss";
import Card from "../../card/Card";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../../../redux/slice/cartslice";

const ProductItem = ({ product, grid, id, name, desc, imageURL, price }) => {
  const shortText = (text, len) => {
    if (text.length > len) {
      return text.substring(0, len + 1).concat("...");
    }
    return text;
  };

  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
  };

  return (
    <Card className={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${id}`}>
        <div className={styles.img}>
          <img src={imageURL} alt="" />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>${price}</p>
          <h4>{shortText(name, 18)}</h4>
        </div>

        {!grid && <p className={styles.desc}>{shortText(desc, 200)}</p>}

        <button className="--btn --btn-red" onClick={() => addToCart(product)}>
          Add to cart
        </button>
      </div>
    </Card>
  );
};

export default ProductItem;
