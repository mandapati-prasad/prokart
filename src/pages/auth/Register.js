import React, { useState } from "react";
import registerImg from "../../assets/Register.png";
import styles from "./auth.module.scss";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidUserDetail } from "react-icons/bi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { BiShow, BiHide } from "react-icons/bi";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [hidepass, setHidepass] = useState(true);
  const [hideCpass, setHideCpass] = useState(true);
  const navigate = useNavigate();

  const showPass = () => {
    setHidepass(!hidepass);
  };

  const showCPass = () => {
    setHideCpass(!hideCpass);
  };

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      toast.error("Password did not match");
    } else {
      setIsloading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          toast.success("Registration is successful...");
          setIsloading(false);
          navigate("/login");
        })
        .catch((error) => {
          toast.error(error.code);
          setIsloading(false);
        });
    }
  };

  return (
    <>
      {isloading && <Loader />}
      <section className={`container ${styles.auth}`}>
        {/* --------------------------form section start-------------------------------- */}
        <Card className={styles["card"]}>
          <div className={styles.form}>
            <div className={styles["icon"]}>
              <BiSolidUserDetail size={80} />
            </div>

            <form action="" onSubmit={registerUser}>
              <div className={styles.email}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.password}>
                <input
                  type={hidepass ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className={styles.eye} onClick={showPass}>
                  {hidepass ? <BiShow size={20} /> : <BiHide size={20} />}
                </span>
              </div>
              <div className={styles.password}>
                <input
                  type={hideCpass ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={cPassword}
                  onChange={(e) => setCPassword(e.target.value)}
                  required
                />
                <span className={styles.eye} onClick={showCPass}>
                  {hideCpass ? <BiShow size={20} /> : <BiHide size={20} />}
                </span>
              </div>
              <button
                type="submit"
                className={`${styles.btn} --btn --btn-block`}
              >
                Register
              </button>
            </form>

            <span className={styles.register}>
              <p>Already have an account?</p>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>
        {/* --------------------------form section end-------------------------------- */}
        {/* -------------------------------img section---------------------------- */}
        <div className={styles.img}>
          <img src={registerImg} alt="" />
        </div>
        {/* -------------------------------img section---------------------------- */}
      </section>
    </>
  );
};

export default Register;
