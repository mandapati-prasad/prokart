import React from "react";
import styles from "./Loader.module.scss"
import  ReactDOM  from "react-dom";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}> 
      <div className={styles.loader_container}>
          <span className={styles["loader"]}></span>
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
