import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { useSelector } from "react-redux";
import { selectuserName } from "../../../redux/slice/authSlice";

const Navbar = () => {
  const user = useSelector(selectuserName);

  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={80} />
        <h4>{user}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/products" className={activeLink}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product/ADD" className={activeLink}>
              Add Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
