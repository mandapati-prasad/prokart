import React, { useEffect, useState } from "react";
import styles from "./OrderDetails.module.scss";
import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../../customehooks/useFetchDocument";
import spinner from "../../../assets/spinner.jpg";
import Card from "../../card/Card";
import ChangeOrderStatus from "../changeOrderStatus/ChangeOrderStatus";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { item } = useFetchDocument("orders", id);

  // console.log("item", order);

  useEffect(() => {
    setOrder(item);
  }, [item]);

  return (
    <section className={styles.table}>
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
                <b>Order Amount:</b> ${order.orderAmount}
              </p>
              <p>
                <b>Order Status:</b> {order.orderStatus}
              </p>
              <p>
                <b>Shipping Address:</b>
                <br />
                Address: {order.shippingAddress.line1}
                {order.shippingAddress.line2},{order.shippingAddress.city}
                <br />
                State:{order.shippingAddress.state} <br />
                Country:{order.shippingAddress.country}
              </p>
            </Card>
            <Link to="/admin/orders">
              <button className="--btn --btn-dark">&larr; Back To Orders</button>
            </Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
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
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      <ChangeOrderStatus order={order} id={id}/>
    </section>
  );
};

export default OrderDetails;
