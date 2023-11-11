import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { onAuthStateChanged } from "firebase/auth";
import { FaRegUserCircle } from "react-icons/fa";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        pro<span>Kart</span>
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Cart
      <FaShoppingCart size={20} />
      <p>0</p>
    </Link>
  </span>
);

const activeLink = ({ isActive }) => (isActive ? `${styles["active"]}` : " ");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    setIsloading(true);
    signOut(auth)
      .then(() => {
        setIsloading(false);
        toast.success("Loggedout successfully");
        navigate("/");
      })
      .catch((error) => {
        setIsloading(false);
        toast.error(error.code);
      });
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        const name = user.displayName;
        setUsername(name);
      } else {
        setUsername("");
      }
    });
  }, []);

  return (
    <header>
      {isloading && <Loader />}
      <div className={`${styles.header}`}>
        {logo}

        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>
          {/* ----------------header-left---------------------- */}
          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes className={styles.icon} size={22} onClick={hideMenu} />
            </li>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={activeLink} to="/contact">
                ContactUs
              </NavLink>
            </li>
          </ul>
          {/* ----------------------header-right---------------------------- */}
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles["links"]}>
              <NavLink className={activeLink} to="/login">
                Login
              </NavLink>

              {username && (
                <a href="#" className={`${styles.user} --color-danger`}>
                  <span className={styles.icon}>
                    <FaRegUserCircle className="--color-danger" />
                  </span>
                  {username}
                </a>
              )}

              <NavLink className={activeLink} to="/register">
                Register
              </NavLink>
              <NavLink className={activeLink} to="/orders">
                My Orders
              </NavLink>
              <NavLink className={activeLink} to="/logout" onClick={logout}>
                Logout
              </NavLink>
            </span>
            {cart}
          </div>
        </nav>

        <div className={styles["menu-icon"]}>
          {cart}
          <RxHamburgerMenu size={22} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
