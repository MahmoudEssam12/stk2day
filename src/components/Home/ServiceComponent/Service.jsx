import React from "react";
import Link from "next/link";
import styles from "./Service.module.scss";
function Service() {
  return (
    <div className={styles.services_wrapper}>
      <div className={styles.service}>
        <div className="img-wrapper">
          <picture>
            <img src="/images/service-1.png" alt="تسجيل الدخول كتاجر" />
          </picture>
        </div>
        <h3>تاجر</h3>
        <Link href="#">تسجيل الأن</Link>
      </div>
      <div className={styles.service}>
        <div className="img-wrapper">
          <picture>
            <img src="/images/service-2.png" alt="تسجيل الدخول كمسوق" />
          </picture>
        </div>
        <h3>مسوق</h3>
        <Link href="#">تسجيل الأن</Link>
      </div>
    </div>
  );
}

export default Service;
