import React, { useEffect } from "react";
import styles from "./orderHistroy.module.scss";
import useFetchCollection from "../../customehooks/useFetchCollection";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  SAVE_ORDER_ITEMS,
  selectOrderItems,
} from "../../redux/slice/orderSlice";
import { selectuserId } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

const OrderHistroy = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const dispatch = useDispatch();

  const orders = useSelector(selectOrderItems);
  const userId = useSelector(selectuserId);

  const navigate = useNavigate();


  useEffect(() => {
    dispatch(SAVE_ORDER_ITEMS(data));
  }, [dispatch, data]);

  const handleOnClick = (id) => {
    navigate(`/order-details/${id}`);
  };

  const filteredOrders = orders.filter((order) => {
    return order.userId === userId
  })

  return (
    <section>
      <div className={`container ${styles.order}`}>
        <h2>Order History</h2>
        <p>
          open an order to leave the <b>Product Review</b>
        </p>
        <br />
        {isLoading && <Loader />}
        <div className={styles.table}>
          {filteredOrders.length === 0 ? (
            <p>No Orders found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Order Amount</th>
                  <th>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((item, index) => {
                  const { id, orderDate, orderAmount, orderStatus } = item;
                  return (
                    <tr key={id} onClick={() => handleOnClick(id)}>
                      <td>{index + 1}</td>
                      <td>{orderDate}</td>
                      <td>{id}</td>
                      <td>${orderAmount}</td>
                      <td className={orderStatus !== "Delivered" ? styles.pending : styles.delivered}>{orderStatus}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderHistroy;
