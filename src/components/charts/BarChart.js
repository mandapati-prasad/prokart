import React from "react";
import styles from "./Charts.module.scss";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Card from "../card/Card";
import { useSelector } from "react-redux";
import { selectOrderItems } from "../../redux/slice/orderSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["Placed orders", "Processing", "Shipped", "Delivered"];

const BarChart = () => {

  const orders = useSelector(selectOrderItems)
  const array = []

  orders.map((item) => {
    return array.push(item.orderStatus)
  })

  const getOrderStatus = (arr, value) => {
    return arr.filter((item) => item === value).length;
  }

  const [q1,q2,q3,q4] = ["order placed...","Processing...","Shipped...","Delivered"]

  const placed = getOrderStatus(array,q1);
  const processed = getOrderStatus(array,q2); 
  const shipped = getOrderStatus(array,q3);
  const deliverd = getOrderStatus(array,q4 );

  const data = {
    labels,
    datasets: [
      {
        label: "order count",
        data: [placed, processed, shipped, deliverd],
        backgroundColor: "red",
      },
    ],
  };

  return (
    <div className={styles.charts}>
      <Card className={styles.card}>
        <h3>Order Status Chart</h3>
        <Bar options={options} data={data} />
      </Card>
    </div>
  );
};

export default BarChart;
