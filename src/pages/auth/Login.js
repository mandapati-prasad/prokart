import React, { useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { BiSolidUserCircle } from "react-icons/bi";
import { AiOutlineGoogle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { BiShow, BiHide } from "react-icons/bi";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [hidepass, setHidepass] = useState(true);
  const navigate = useNavigate()
  const provider = new GoogleAuthProvider();

  const showPass = () => {
    setHidepass(!hidepass);
  };

  const loginUser = (e) => {
    e.preventDefault();
    
    setIsloading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        // const user = userCredentials.user;
        setIsloading(false)
        navigate("/")
        toast.success("successfully logged in");
      })
      .catch((error) => {
        setIsloading(false)
        toast.warning(error.code);
      });
  };

  const singInWithGoogle = () => {
    setIsloading(true);
    signInWithPopup(auth, provider).then((result) => {
      // const user = result.user;
      setIsloading(false)
      toast.success("Login successfull")
      navigate("/")
    }).catch((error) => {
      setIsloading(false)
      toast.error(error.code)
    })
  }

  return (
    <>
      {isloading && <Loader />}
      <section className={`container ${styles.auth}`}>
        {/* -------------------------------img section---------------------------- */}
        <div className={styles.img}>
          <img src={loginImg} alt="" />
        </div>
        {/* --------------------------form section-------------------------------- */}
        <Card className={styles["card"]}>
          <div className={styles.form}>
            <div className={styles["icon"]}>
              <BiSolidUserCircle size={80} />
            </div>

            <form action="" onSubmit={loginUser}>
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
              <button className={`${styles.btn} --btn --btn-block`}>
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>---- or -----</p>
            </form>

            <button className="--btn --btn-block --btn-red" 
            onClick={singInWithGoogle}>
              <AiOutlineGoogle size={20} />
              Login with Google
            </button>

            <span className={styles.register}>
              <p>Don't have an account?</p>
              <Link to="/register">Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
