import React from 'react'
import styles from "./InfoBox.module.scss"
import Card from '../card/Card'

const InfoBox = ({title, cardClass, count, icon}) => {
  return (
    <div className={styles["info-box"]}>
      <Card className={cardClass}>
        <h3>{title}</h3>
        <span>
          <h3>{count}</h3>
          {icon}
        </span>
      </Card>
    </div>
  )
}

export default InfoBox