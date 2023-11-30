import React, { useEffect } from "react";
import styles from "./Home.module.scss"
import InfoBox from "../../infoBox/InfoBox";
import { BsCurrencyDollar } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { MdShoppingCart } from "react-icons/md";
import useFetchCollection from "../../../customehooks/useFetchCollection";
import { STORE_PRODUCTS, selectProducts } from "../../../redux/slice/productSlice";
import { CALCULATE_ORDER_AMOUNT, SAVE_ORDER_ITEMS, selectOrderItems, selectTotalAmount } from "../../../redux/slice/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import BarChart from "../../charts/BarChart.js";



const Home = () => {
  const earningIcon = <BsCurrencyDollar size={35} color="purple"/>
  const ordersIcon = <TbTruckDelivery size={35} color="#1f93ff"/>
  const productsIcon = <MdShoppingCart  size={35} color="orangered"/>

  const products = useSelector(selectProducts)
  const orders = useSelector(selectOrderItems)
  const orderAmount = useSelector(selectTotalAmount)

  const productData = useFetchCollection("products")
  const orderData = useFetchCollection("orders")

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(STORE_PRODUCTS({
      products:productData.data
    }))

    dispatch(SAVE_ORDER_ITEMS(orderData.data))

    dispatch(CALCULATE_ORDER_AMOUNT())
  },[dispatch, productData, orderData])
 

  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>
      <div className={styles["info-box"]}>
        <InfoBox title={"Earnings"} cardClass={`${styles.card} ${styles.card1}`} icon={earningIcon} count={`$${orderAmount}`}/>
        <InfoBox title={"Orders"} cardClass={`${styles.card} ${styles.card2}`} icon={ordersIcon} count={orders.length}/>
        <InfoBox title={"Products"} cardClass={`${styles.card} ${styles.card3}`} icon={productsIcon} count={products.length}/>
      </div>
      <div>
        <BarChart />
      </div>
    </div>
  );
};

export default Home;
