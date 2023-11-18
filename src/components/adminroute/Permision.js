import React from "react";
import { Link } from "react-router-dom";

const Permision = () => {
  const styles = {
    height: "81vh",
    padding:"10% 0%"
  };

  return (
    <section style={styles}>
      <div className="container">
        <div>
          <h1>Permision Denied</h1>
        </div>
        <p>This page is only viewed by the Admin</p>
        <br />
        <Link to="/">
          <button className="--btn --btn-red">&larr; Back To Home</button>
        </Link>
      </div>
    </section>
  );
};

export default Permision;
