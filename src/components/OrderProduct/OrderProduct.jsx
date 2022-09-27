import React from "react";
import Link from "next/link";
import styles from "./OrderProduct.module.scss";
import { useTranslation } from "next-i18next";
function OrderProduct() {
  const { t } = useTranslation();
  return (
    <div className={styles.order_product}>
      <div className={styles.order_product_details}>
        <p>
          <Link href="/">شورت بحر وتر بروف</Link> - اسود, 1x large
        </p>
        <p>
          <span>{t("common:merchant")}</span>: hamza
        </p>
        <p>
          <span>{t("common:color")}</span>: اسود
        </p>
        <p>
          <span>{t("common:size")}</span>: large
        </p>
      </div>
      <div className={styles.order_product_total}>55 جنية</div>
    </div>
  );
}

export default OrderProduct;
