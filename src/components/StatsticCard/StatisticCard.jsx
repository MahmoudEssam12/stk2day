import React from "react";
import styles from "./StatisticCard.module.scss";
function StatisticCard({ headerText, description }) {
  return (
    <div className={styles.card}>
      <h4>{headerText}:</h4>
      <p>{description}</p>
    </div>
  );
}

export default StatisticCard;
