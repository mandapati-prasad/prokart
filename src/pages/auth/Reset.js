import React, { useState } from "react";
import resetImg from "../../assets/reset.png";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import styles from "./auth.module.scss";
import { MdLockReset } from "react-icons/md";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";


const Reset = () => {
  const [email, setEmail] = useState("");
  const [isloading, setIsloading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setIsloading(true)
    sendPasswordResetEmail(auth, email)
  .then(() => {
    setIsloading(false)
    toast.success("Check mail for reseting password")
  })
  .catch((error) => {
    setIsloading(false)
    toast.error(error.code)
    // ..
  });
  };

  return (
    <>
    {isloading && <Loader />}
      <section className={`container ${styles.auth}`}>
        {/* -------------------------------img section---------------------------- */}
        <div className={styles.img}>
          <img src={resetImg} alt="" />
        </div>
        {/* -------------------------------img section---------------------------- */}
        {/* --------------------------form section start-------------------------------- */}
        <Card>
          <div className={styles.form}>
            <div className={styles["icon"]}>
              <MdLockReset size={80} />
            </div>

            <form action="" onSubmit={resetPassword}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                autoComplete="on"
                required
              />
              <button
                type="submit"
                className={`${styles.btn} --btn --btn-block`}
              >
                Reset Password
              </button>
            </form>

            <span className={styles.reset}>
              <Link to="/login">- Login</Link>
              <Link to="/Register">- Register</Link>
            </span>
          </div>
        </Card>
        {/* --------------------------form section end-------------------------------- */}
      </section>
    </>
  );
};

export default Reset;
