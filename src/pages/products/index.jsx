import { useState } from "react";
import { MainLayout } from "../../layout/mainLayout";
import { InputText } from "primereact/inputtext";
import { motion } from "framer-motion";

import CustomButton from "../../components/CustomButton/CustomButton";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import styles from "../../styles/Products.module.scss";
import inputStyles from "../../styles/Inputs.module.scss";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import ProductsRow from "../../components/ProductsRow/ProductsRow";

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
function Products() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const { t } = useTranslation();
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <motion.div
      exit={{ opacity: 0, y: 100 }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className={`c-container ${styles.products}`}
    >
      <form className={styles.search_form}>
        <span
          className={`p-float-label  ${
            router.locale === "en" && "p-input-icon-left"
          } ${inputStyles.input_wrapper} ${styles.input_search} ${
            router.locale === "en" ? " " : styles.ar
          }`}
        >
          <i
            className={`pi pi-search ${inputStyles.inputIcons} ${
              router.locale === "en" ? inputStyles.icon_en : ""
            }`}
          ></i>
          <InputText
            value={searchValue}
            name="search"
            id="search"
            onChange={handleSearch}
          />

          <label htmlFor="search">{t("common:search_txt")}</label>
        </span>
        <div className={router.locale === "en" ? " " : styles.ar}>
          <CustomButton
            text={t("common:search_btn")}
            color="secondary-box"
            style={{
              padding: "1rem 0",
              backgroundColor: "var(--secondary-color)",
              textTransform: "capitalize",
            }}
          />
        </div>
      </form>
      <div className={styles.categories}>
        <CategoryCard
          img="accessories"
          text={t("categories:accessories")}
          link="accessories"
        />
        <CategoryCard img="women" text={t("categories:women")} link="women" />
        <CategoryCard img="men" text={t("categories:men")} link="men" />
        <CategoryCard img="kids" text={t("categories:kids")} link="kids" />
      </div>
      <ProductsRow title={t("products:offers")} />
      <ProductsRow title={t("products:best_seller")} />
      <ProductsRow title={t("products:recently_added")} />
    </motion.div>
  );
}

Products.getLayout = function getLayout(page) {
  return (
    <MainLayout en="Products" ar="المنتجات">
      {page}
    </MainLayout>
  );
};

export default Products;
