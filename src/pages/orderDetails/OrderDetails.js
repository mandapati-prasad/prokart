import React, { useEffect, useState } from "react";
import styles from "./OrderDetails.module.scss";
import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../customehooks/useFetchDocument";
import spinner from "../../assets/spinner.jpg";
import Card from "../../components/card/Card";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { item } = useFetchDocument("orders", id);

  console.log("item", order);

  useEffect(() => {
    setOrder(item);
  }, [item]);

  return (
    <section className={`container ${styles.table}`}>
      <h2>Order Details</h2>
      {/* <div>
        <Link>
          <button className="--btn">&larr; Back To Orders</button>
        </Link>
      </div> */}
      {order === null ? (
        <img src={spinner} alt="Loading..." style={{ width: "100px" }} />
      ) : (
        <>
          <div className={styles.summary}>
            <Card className={styles.card}>
              <h3>Order Summary</h3>
              <p>
                <b>Order ID:</b> {order.id}
              </p>
              <p>
                <b>Order Amount:</b> {order.orderAmount}
              </p>
              <p>
                <b>Order Status:</b> {order.orderStatus}
              </p>
            </Card>
            <Link to="/order-history">
              <button className="--btn --btn-dark">
                &larr; Back To Orders
              </button>
            </Link>
          </div>
          <table>
            <thead>
              <tr>
                <td>S/N</td>
                <td>Product</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Total</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {order.cartItems.map((product, index) => {
                const { id, name, imageURL, price, cartQuantity } = product;
                return (
                  <>
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{price}</td>
                      <td>{cartQuantity}</td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <button className="--btn --btn-red">
                          <Link to={`/review/${id}`} className="--btn-red">Review Product</Link>
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
};

export default OrderDetails;
