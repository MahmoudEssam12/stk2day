import { useRouter } from "next/router";
import React from "react";
import styles from "./Card.module.scss";
function Card({
  image = "/images/car.svg",
  text = "اعلى معدل نجاح لشحن وتوصيل الطلبات فى اقل من 48 ساعة فى كل انحاء مصر",
}) {
  const { locale } = useRouter();
  return (
    <div
      className={styles.card}
      style={{ direction: locale === "en" ? "ltr" : "rtl" }}
    >
      <div className={styles.img_wrapper}>
        <picture>
          <img src={image} alt={text} />
        </picture>
      </div>
      <p>{text}</p>
    </div>
  );
}

export default Card;
