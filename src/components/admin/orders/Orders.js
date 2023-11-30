import React, { useEffect, useState } from "react";
import styles from "./Orders.module.scss"
import useFetchCollection from "../../../customehooks/useFetchCollection";
import Loader from "../../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  SAVE_ORDER_ITEMS,
  selectOrderItems,
} from "../../../redux/slice/orderSlice";
import { selectuserId } from "../../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const dispatch = useDispatch();

  const orders = useSelector(selectOrderItems);
  const userId = useSelector(selectuserId);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(SAVE_ORDER_ITEMS(data));
  }, [dispatch, data]);

  const handleOnClick = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  // const filteredOrders = orders.filter((order) => {
  //   return order.userId === userId;
  // });

  return (
    <>
      <div className= {styles.order}>
        <h2>All Order</h2>
        <p>
          open an order to <b>Change Order Status</b>
        </p>
        <br />
        {isLoading && <Loader />}
        <div className={styles.table}>
          {orders.length === 0 ? (
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
                {orders.map((item, index) => {
                  const { id, orderDate, orderAmount, orderStatus } = item;
                  return (
                    <tr key={id} onClick={() => handleOnClick(id)}>
                      <td>{index + 1}</td>
                      <td>{orderDate}</td>
                      <td>{id}</td>
                      <td>${orderAmount}</td>
                      <td
                        className={
                          orderStatus !== "Delivered"
                            ? styles.pending
                            : styles.delivered
                        }
                      >
                        {orderStatus}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
