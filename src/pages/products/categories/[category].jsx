import React, { useState, useEffect } from "react";
import { MainLayout } from "../../../layout/mainLayout";
import Head from "next/head";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Rating } from "primereact/rating";
import SearchForm from "../../../components/SearchForm/SearchForm";
import { Slider } from "primereact/slider";
import styles from "../../../styles/Category.module.scss";
import { motion } from "framer-motion";
import Link from "next/link";
import { Checkbox } from "primereact/checkbox";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { InputNumber } from "primereact/inputnumber";
export async function getStaticPaths() {
  return {
    paths: ["/products/categories/[category]"],
    fallback: true,
  };
}

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
function Category() {
  let { t } = useTranslation();
  let router = useRouter();
  let { category } = router.query;
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [ratings, setRatings] = useState([]);
  const [categories, setCategories] = useState([
    t("categories:men"),
    t("categories:women"),
    t("categories:kids"),
    t("categories:accessories"),
  ]);
  const [products, setProducts] = useState([
    {
      img: "15",
      name: "عباية مطرزة",
      merchant: "احمد محمد",
      price: "500",
      rating: 4,
      id: 10,
    },
    {
      img: "15",
      name: "عباية مطرزة",
      merchant: "احمد محمد",
      price: "400",
      rating: 4,
      id: 11,
    },
    {
      img: "15",
      name: "عباية مطرزة",
      merchant: "احمد محمد",
      price: "500",
      rating: 5,
      id: 12,
    },
    {
      img: "15",
      name: "عباية مطرزة",
      merchant: "احمد محمد",
      price: "300",
      rating: 3,
      id: 13,
    },
    {
      img: "15",
      name: "عباية مطرزة",
      merchant: "احمد محمد",
      price: "100",
      rating: 2,
      id: 14,
    },
    {
      img: "15",
      name: "عباية مطرزة",
      merchant: "احمد محمد",
      price: "50",
      rating: 1,
      id: 15,
    },
    {
      img: "15",
      name: "عباية مطرزة",
      merchant: "احمد محمد",
      price: "250",
      rating: 1,
      id: 16,
    },
  ]);
  const [filteredProducts, setFilteredProducts] = useState([...products]);
  const [showFilters, setShowFilters] = useState(true);
  const [pricesInputs, setPricesInputs] = useState({
    max: priceRange ? priceRange[1] : 0,
    min: priceRange ? priceRange[0] : 0,
  });
  // for the filters responsive
  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };
  // function to handle price range change
  const priceRangeChange = (e) => {
    setPriceRange(e.value);
    if (e.value !== null) {
      setPricesInputs((prev) => {
        return {
          min: e.value[0],
          max: e.value[1],
        };
      });
    } else {
      setPricesInputs((prev) => {
        return { min: 0, max: 0 };
      });
    }
  };
  // function to handle input prices change
  const priceChange = (e) => {
    if (e.value >= 0 && e.value <= 100) {
      setPricesInputs((prev) => {
        return {
          ...prev,
          [e.originalEvent.target.name]: e.value,
        };
      });

      setPriceRange((prev) => {
        let arr = [...prev];
        if (e.originalEvent.target.name === "min") {
          arr[0] = e.value;
        } else {
          arr[1] = e.value;
        }
        return arr;
      });
    }
  };

  // function to apply filter products by price
  const filterByPrice = () => {
    let cProducts = [...products];
    if (ratings.length) {
      let filter = filteredProducts.filter((product) => {
        if (
          Number(product.price) >= priceRange[0] &&
          Number(product.price) <= priceRange[1]
        ) {
          return product;
        }
      });
      setFilteredProducts([...filter]);
    } else {
      if (priceRange[0] !== null && priceRange[1] !== null) {
        let priceFilter = cProducts.filter((product) => {
          if (
            Number(product.price) >= priceRange[0] &&
            Number(product.price) <= priceRange[1]
          ) {
            return product;
          }
        });
        setFilteredProducts([...priceFilter]);
      } else if (priceRange[0] === null && priceRange[1] === null) {
        setFilteredProducts([...products]);
      }
    }
  };

  // function to reset price filter
  const resetPriceFilter = () => {
    setFilteredProducts([...products]);
    setPriceRange([0, 500]);
    setPricesInputs((prev) => {
      return { min: 0, max: 500 };
    });
    setRatings([]);
  };

  // function to handle rating checkboxs filter changes
  const onRatingFilterChange = (e) => {
    let selectedRatings = [...ratings];

    if (e.checked) selectedRatings.push(e.value);
    else selectedRatings.splice(selectedRatings.indexOf(e.value), 1);

    setRatings(selectedRatings);
  };

  // function to apply the filters on the products
  const filterProductsByRating = () => {
    let cProducts = [...products];
    let filtered = [];
    if (ratings.length) {
      ratings.forEach((rating) => {
        let ratingsProducts = cProducts.filter((product) => {
          return product.rating === Number(rating);
        });
        filtered = [...filtered, ...ratingsProducts];
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([...products]);
    }
  };

  useEffect(() => {
    filterProductsByRating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratings]);

  return (
    <motion.div
      exit={{ opacity: 0, y: 100 }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="c-container"
      style={{ padding: " 2rem 0" }}
    >
      <Head>
        <title>
          {router.locale === "en"
            ? `stk2day - ${category}`
            : `ستوك تو داي - ${category}`}
        </title>
      </Head>
      <SearchForm />
      <div className={styles.content_wrapper}>
        <div className={styles.col}>
          <button className={styles.filters_button} onClick={toggleFilters}>
            Filters{" "}
            <FontAwesomeIcon
              icon={faAngleDown}
              className={showFilters ? styles.rotate_icon : ""}
            />
          </button>
          <div
            className={`${styles.filters_wrapper} ${
              showFilters ? styles.active : " "
            }`}
          >
            <h4>{t("categories:title")}</h4>
            <ul className={styles.categories_ul}>
              {categories.map((cate) => (
                <li
                  key={cate}
                  className={category === cate ? styles.active : " "}
                >
                  <Link href={`/products/categories/${cate}`} passHref>
                    <a>
                      {cate} <span>300</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            <h4>{t("categories:rating_title")}</h4>
            <ul>
              <li>
                <div
                  className={`field-checkbox rating-checkbox ${styles.rating_checkbox}`}
                >
                  <Checkbox
                    inputId="rating1"
                    name="ratings"
                    value="1"
                    onChange={onRatingFilterChange}
                    checked={ratings.indexOf("1") !== -1}
                  />
                  <label
                    htmlFor="rating1"
                    style={{
                      cursor: "pointer",
                      display: "block",
                      width: "100%",
                    }}
                  >
                    <Rating value={1} readOnly stars={5} cancel={false} />
                  </label>
                </div>
              </li>
              <li>
                <div
                  className={`field-checkbox rating-checkbox ${styles.rating_checkbox}`}
                >
                  <Checkbox
                    inputId="rating2"
                    name="ratings"
                    value="2"
                    onChange={onRatingFilterChange}
                    checked={ratings.indexOf("2") !== -1}
                  />
                  <label
                    htmlFor="rating2"
                    style={{
                      cursor: "pointer",
                      display: "block",
                      width: "100%",
                    }}
                  >
                    <Rating value={2} readOnly stars={5} cancel={false} />
                  </label>
                </div>
              </li>
              <li>
                <div
                  className={`field-checkbox rating-checkbox ${styles.rating_checkbox}`}
                >
                  <Checkbox
                    inputId="rating3"
                    name="ratings"
                    value="3"
                    onChange={onRatingFilterChange}
                    checked={ratings.indexOf("3") !== -1}
                  />
                  <label
                    htmlFor="rating3"
                    style={{
                      cursor: "pointer",
                      display: "block",
                      width: "100%",
                    }}
                  >
                    <Rating value={3} readOnly stars={5} cancel={false} />
                  </label>
                </div>
              </li>
              <li>
                <div
                  className={`field-checkbox rating-checkbox ${styles.rating_checkbox}`}
                >
                  <Checkbox
                    inputId="rating4"
                    name="ratings"
                    value="4"
                    onChange={onRatingFilterChange}
                    checked={ratings.indexOf("4") !== -1}
                  />
                  <label
                    htmlFor="rating4"
                    style={{
                      cursor: "pointer",
                      display: "block",
                      width: "100%",
                    }}
                  >
                    <Rating value={4} readOnly stars={5} cancel={false} />
                  </label>
                </div>
              </li>
              <li>
                <div
                  className={`field-checkbox rating-checkbox ${styles.rating_checkbox}`}
                >
                  <Checkbox
                    inputId="rating5"
                    name="ratings"
                    value="5"
                    onChange={onRatingFilterChange}
                    checked={ratings.indexOf("5") !== -1}
                  />
                  <label
                    htmlFor="rating5"
                    style={{
                      cursor: "pointer",
                      display: "block",
                      width: "100%",
                    }}
                  >
                    <Rating value={5} readOnly stars={5} cancel={false} />
                  </label>
                </div>
              </li>
            </ul>
            <h4>{t("categories:price")}</h4>
            <div>
              <div className={styles.range}>
                <Slider
                  value={priceRange}
                  onChange={priceRangeChange}
                  min={0}
                  max={500}
                  range
                  className={styles.range}
                />
              </div>
              <div className={styles.prices_inputs}>
                <span className="p-float-label">
                  <InputNumber
                    id="min"
                    name="min"
                    max={pricesInputs.max}
                    min={0}
                    value={pricesInputs.min}
                    onChange={priceChange}
                  />
                  <label htmlFor="min">{t("categories:min")}</label>
                </span>
                <span className="p-float-label">
                  <InputNumber
                    id="max"
                    name="max"
                    min={pricesInputs.min}
                    max={500}
                    value={pricesInputs.max}
                    onChange={priceChange}
                  />
                  <label htmlFor="max">{t("categories:max")}</label>
                </span>
              </div>
              <div className={styles.buttons}>
                <button onClick={filterByPrice}>{t("categories:apply")}</button>
                <button className={styles.reset_btn} onClick={resetPriceFilter}>
                  {t("categories:reset")}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.col}>
          {!products.length ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <picture>
                <img src="/images/no-products.png" alt="There is no products" />
              </picture>
              <h3>{t("common:no_products")}</h3>
            </div>
          ) : (
            filteredProducts.map((product, index) => (
              <ProductCard
                img={product.img}
                name={product.name}
                merchant={product.merchant}
                price={product.price}
                rating={product.rating}
                id={product.id}
                key={index}
              />
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}

Category.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Category;
