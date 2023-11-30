import React, { useState } from "react";
import styles from "./ChangeOrderStatus.module.scss"
import Card from "../../card/Card";
import Loader from "../../loader/Loader";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ChangeOrderStatus = ({order, id}) => {
  const [status, setStatus] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const editStatus = (e) => {
    e.preventDefault()
    setIsLoading(true)

    const orderConfig = {
      ...order,
      orderStatus:status,
      editedAt:Timestamp.now().toDate()
    }
    // console.log("order", order)
    // console.log("orderConfig", orderConfig)
    try {
      setDoc(doc(db, "orders", id),orderConfig);
      setIsLoading(false)
      navigate("/admin/orders")
      toast.success("order status changed successfullly");
    } catch (error) {
      setIsLoading(false)
      toast.error(error.code)
    }
  }

  return (
    <>
    {isLoading && <Loader />}

    <div className={styles.status}>
      <Card className={styles.card}>
        <h4>Update Status</h4>
        <form onSubmit={(e) => editStatus(e)}>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">-- Choose One --</option>
              <option value="order placed...">Order placed...</option>
              <option value="Processing...">Processing...</option>
              <option value="Shipped...">Shipped...</option>
              <option value="Delivered">Delivered</option>
          </select>
          <button type="submit" className="--btn --btn-red">Update Status</button>
        </form>
      </Card>
    </div>
    </>
  );
};

export default ChangeOrderStatus;
