import React from 'react'
import styles from "./NotFound.module.scss"
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className={styles["not-found"]}>
      <div>
        <h2>404</h2>
        <p>oops, page not found</p>
        <button className='--btn'><Link to="/">&larr; Back to home</Link></button>
      </div>
    </section>
  )
}

export default NotFound