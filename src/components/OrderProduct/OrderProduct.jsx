import React from "react";
import Link from "next/link";
import styles from "./OrderProduct.module.scss";
function OrderProduct() {
  return (
    <div className={styles.order_product}>
      <div className={styles.order_product_details}>
        <p>
          <Link href="/">شورت بحر وتر بروف</Link> - اسود, 1x large
        </p>
        <p>
          <span>التاجر</span>: hamza
        </p>
        <p>
          <span>اللون</span>: اسود
        </p>
        <p>
          <span>المقاس</span>: large
        </p>
      </div>
      <div className={styles.order_product_total}>55 جنية</div>
    </div>
  );
}

export default OrderProduct;
