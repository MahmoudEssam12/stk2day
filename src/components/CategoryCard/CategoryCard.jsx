import Link from "next/link";
import { Ripple } from "primereact/ripple";
import React from "react";
import styles from "./CategoryCard.module.scss";
function CategoryCard({ img, text, link }) {
  return (
    //
    <Link href={`/products/category/${link}`}>
      <div className={styles.card_wrapper}>
        <div className={styles.img_wrapper}>
          <picture>
            <img src={`/images/${img}.png`} alt={text} />
          </picture>
        </div>
        <h4>{text}</h4>
        <Ripple />
      </div>
    </Link>
  );
}

export default CategoryCard;
