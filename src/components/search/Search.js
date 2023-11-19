import React from "react";
import styles from "./Search.module.scss";
import { IoIosSearch } from "react-icons/io";

const Search = ({ value, onChange }) => {
  return (
    <div className={styles.search}>
      <IoIosSearch size={18} className={styles.icon} />

      <input type="text" placeholder="Search the product" value={value} onChange={onChange} />
    </div>
  );
};

export default Search;
