import React from "react";
import styles from "./Admin.module.scss";
import Navbar from "../../components/admin/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../../components/admin/home/Home";
import AddProduct from "../../components/admin/addProducts/AddProduct";
import ViewProducts from "../../components/admin/viewProducts/ViewProducts";
import Orders from "../../components/admin/orders/Orders";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>

      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="add-product/:id" element={<AddProduct />} />
          <Route path="products" element={<ViewProducts />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
