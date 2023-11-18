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
import { useDispatch } from "react-redux";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import { ShowOnLogin, ShowOnLogout } from "../hidelinks/hideLinks";
import {AdminOnlyLink} from "../adminroute/adminOnlyRoute";

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
      {/* Cart */}
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

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const signOutUser = () => {
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

  const logout = (e) => {
    e.preventDefault();
    setIsloading(true);
    signOutUser();
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
        if (user.displayName === null) {
          const name = user.email.substring(0, user.email.indexOf("@"));
          setUsername(() => name.charAt(0).toUpperCase() + name.slice(1));
        } else {
          setUsername(user.displayName);
        }
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            name: username,
            id: user.uid,
          })
        );
      } else {
        setUsername("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, username]);

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
              <ShowOnLogout>
                <NavLink className={activeLink} to="/login">
                  Login
                </NavLink>
              </ShowOnLogout>

              {username && (
                <a href="/">
                  <span className={styles.icon}>
                    <FaRegUserCircle />
                  </span>

                  <span className={styles.user}>{username}</span>
                </a>
              )}

              <ShowOnLogout>
                <NavLink className={activeLink} to="/register">
                  Register
                </NavLink>
              </ShowOnLogout>

              <ShowOnLogin>
                <NavLink className={activeLink} to="/orders">
                  My Orders
                </NavLink>
              </ShowOnLogin>

              <ShowOnLogin>
                <NavLink className={activeLink} to="/logout" onClick={logout}>
                  Logout
                </NavLink>
              </ShowOnLogin>

              <ShowOnLogin>
                <AdminOnlyLink>
                  <NavLink className={styles.admin} to="/admin/home">
                    Admin
                  </NavLink>
                </AdminOnlyLink>
              </ShowOnLogin>
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
