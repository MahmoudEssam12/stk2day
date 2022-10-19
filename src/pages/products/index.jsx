import { useState } from "react";
import { MainLayout } from "../../layout/mainLayout";
import { InputText } from "primereact/inputtext";
import { motion } from "framer-motion";

import CustomButton from "../../components/CustomButton/CustomButton";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import styles from "../../styles/Products.module.scss";
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
  const search = (e) => {
    e.preventDefault();
    // router.push(`/products/search/${searchValue}`);
    router.push(`/products/search?keyword=${searchValue}`);
  };
  return (
    <motion.div
      exit={{ opacity: 0, y: 20 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`c-container`}
    >
      <div className="products">
        <form onSubmit={search} className={`search_form ${styles.search_form}`}>
          <span
            className={`p-float-label  ${
              router.locale === "en" && "p-input-icon-left"
            } ${"input_wrapper"} ${"input_search"} ${
              router.locale === "en" ? " " : "ar"
            }`}
          >
            <i
              className={`pi pi-search ${"inputIcons"} ${
                router.locale === "en" ? "icon_en" : ""
              }`}
            ></i>
            <InputText
              value={searchValue}
              name="search"
              id="search"
              onChange={handleSearch}
              className={"text-input"}
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
        <div className={"categories"}>
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
      </div>
      <style jsx>
        {`
          .products {
            padding: 2rem 0;
          }

          .search_form {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 2rem;

            .input_search {
              margin: 0;

              input {
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
                width: 100%;
              }

              &.ar input {
                border-radius: 0;
                border-top-right-radius: 8px;
                border-bottom-right-radius: 8px;
              }
            }

            button {
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
              height: 60px;

              @media (max-width: 768px) {
                max-width: 100px;
              }
            }

            .ar button {
              border-radius: 0;
              border-top-right-radius: 0px;
              border-bottom-right-radius: 0px;
              border-top-left-radius: 8px;
              border-bottom-left-radius: 8px;
            }
          }

          .categories {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;

            @media (max-width: 768px) {
              justify-content: center;
            }
          }

          .row {
            margin: 2rem 0;

            h3 {
              margin: 1rem 0;
            }
          }

          .products_row {
            display: flex;
            justify-content: space-between;
            overflow-x: scroll;
            padding: 1rem 0;
            gap: 1rem;
          }
        `}
      </style>
      <style jsx global>
        {`
          .input_wrapper {
            display: block;
            margin-bottom: 2rem;
            width: 100%;

            input,
            textarea {
              width: 100%;
              background-color: #f6f6f6;
              min-height: 60px;
              font-size: 1.1rem;
              padding: 0.75rem 2.7rem !important;
            }

            input:focus {
              background-color: #fff;
            }

            textarea {
              min-height: 200px;
            }

            textarea ~ label {
              top: 28px;
            }

            label {
              text-transform: capitalize;
              right: 40px;
              top: 28px;
              color: #03014c;
              text-transform: capitalize;

              @media (max-width: 768px) {
                font-size: 0.9rem;
              }
            }

            .inputIcons {
              position: absolute;
              top: 22px;
              right: 14px;
              left: unset;
              z-index: 1;
              cursor: auto;
              pointer-events: none;
              width: 20px;
              height: 20px;
              color: var(--default-color) !important;

              &.icon_en {
                right: unset;
                left: 19px;
                top: 28px;
              }
            }
          }

          .form_styles {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .input_wrapper > label {
              left: 2.8rem;
            }
          }
        `}
      </style>
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
