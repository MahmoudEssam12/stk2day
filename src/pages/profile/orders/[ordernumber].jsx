import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import styles from "../../../styles/Profile.module.scss";
import { MainLayout } from "../../../layout/mainLayout";
import ProfileSidebar from "../../../components/ProfileSidebar/ProfileSidebar";
import Head from "next/head";
import Link from "next/link";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrderProduct from "../../../components/OrderProduct/OrderProduct";
import { motion } from "framer-motion";
export async function getStaticPaths() {
  return {
    paths: [
      { params: { ordernumber: "1" } },
      { params: { ordernumber: "2" } },
      { params: { ordernumber: "3" } },
      { params: { ordernumber: "4" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "login",
        "footer",
        "navbar",
        "common",
        "profile",
      ])),
    },
  };
}
function OrderNumber() {
  const router = useRouter();
  const { ordernumber } = router.query;
  const { t } = useTranslation();
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <section className={styles.order_details}>
        <Head>
          <title>
            {router.locale === "en"
              ? `stk2day - ${ordernumber}`
              : `ستوك تو داي- ${ordernumber}`}
          </title>
        </Head>
        <p style={{ marginBottom: "2rem" }}>
          {t("profile:order_detail")} <span>{ordernumber}</span> في يوليو 27,
          2022 وهو الآن بحالة <span> مُكتمل</span>
        </p>
        <h1>{t("profile:order_detail_title")}</h1>
        <div className={styles.order_details_header}>
          <span>المنتج</span>
          <span>الإجمالي</span>
        </div>

        <OrderProduct />
        <OrderProduct />

        <div className={styles.order_borders}>
          <span>المجموع</span>
          <span>110 جنية</span>
        </div>
        <div className={styles.order_borders}>
          <span>الشحن:</span>
          <span>35 جنية(بواسطة تكلفة شحن) </span>
        </div>
        <div className={styles.order_borders}>
          <span>وسيلة الدفع:</span>
          <span>الدفع نقدًا عند الاستلام</span>
        </div>
        <div className={styles.order_borders}>
          <span>الإجمالي</span>
          <span>145 جنية </span>
        </div>
        <CustomButton
          text={"تكرار الطلب"}
          color="secondary-box"
          style={{
            padding: "1rem 0",
            backgroundColor: "var(--secondary-color)",
            textTransform: "capitalize",
            maxHeight: "60px",
            marginTop: "1rem",
          }}
        />

        <div className={styles.address}>
          <div>
            <h4>عنوان الشحن</h4>
            <p>
              <span> ميامي جمال عبدالناصر الشارع المقابل لجزارة اللؤلؤه</span>
              <span>الاسكندرية</span>
              <span>مصر</span>
            </p>
          </div>
          <div>
            <h4>عنوان الفاتورة</h4>
            <p>
              <span>محمود عبدالله</span>
              <span>ميامي جمال عبدالناصر الشارع المقابل لجزارة اللؤلؤه</span>
              <span>الاسكندرية</span>
              <span>مصر</span>
            </p>
            <div className="contact">
              <p>
                <FontAwesomeIcon icon={faPhone} />
                01145865799
              </p>
              <p>
                <FontAwesomeIcon icon={faEnvelope} /> ahmed_fourth@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
OrderNumber.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <ProfileSidebar>{page}</ProfileSidebar>
    </MainLayout>
  );
};
export default OrderNumber;
