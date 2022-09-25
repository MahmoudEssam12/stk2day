import React, { useState, useEffect } from "react";
import ProfileSidebar from "../components/ProfileSidebar/ProfileSidebar";
import { MainLayout } from "../layout/mainLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import ProductCard from "../components/ProductCard/ProductCard";
import styles from "../styles/favourits.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { selectFavourit, addMultiFavs } from "../store/slices/favourtisSlice";
import { motion } from "framer-motion";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "footer",
        "navbar",
        "common",
        "categories",
        "products",
      ])),
    },
  };
}

function Favourits() {
  const favourits = useSelector(selectFavourit);
  const dispatch = useDispatch();
  const [fav, setFav] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (typeof window !== "undefined" && !favourits.length) {
      let items = JSON.parse(window.localStorage.getItem("favs"));
      if (items) {
        dispatch(addMultiFavs(items));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={` ${styles.favourits}`}
    >
      <header>
        <picture>
          <img src="/images/heart.png" alt="stk2day - favourits" />
        </picture>
      </header>

      <div className={`c-container ${styles.products}`}>
        {favourits.length ? (
          favourits.map((product, index) => (
            <ProductCard
              key={index}
              img={product.img}
              name={product.name}
              merchant={product.merchant}
              price={product.price}
              id={product.id}
            />
          ))
        ) : (
          <div className={styles.empty}>
            <picture>
              <img src="/images/404.png" alt="favourits is empty" />
            </picture>
            <h1>{t("common:empty_favs")}</h1>
          </div>
        )}
      </div>
    </motion.div>
  );
}

Favourits.getLayout = function getLayout(page) {
  return (
    <MainLayout en="Favourits" ar="المفضلات">
      {page}
    </MainLayout>
  );
};
export default Favourits;
