import React from "react";
import styles from "./FeatureCard.module.scss";

function FeatureCard({
  color = " ",
  image = "/images/icon-1.png",
  text = "اعلى معدل نجاح لشحن وتوصيل الطلبات فى اقل من 48 ساعة فى كل انحاء مصر",
}) {
  return (
    <section className={styles.feature_card_wrapper}>
      <div className={`${styles.card} ${styles[color]}`}>
        <div className={styles.wrapper}>
          <div className={styles.box_shadow}></div>
          <div className={styles.content}>
            <picture>
              <img src={image} alt={text} />
            </picture>
            <div className={styles.icon}>
              <picture>
                <img src={image} alt={text} />
              </picture>
              <p>{text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureCard;
