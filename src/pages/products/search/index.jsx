import React, { useState, useEffect } from "react";
import { MainLayout } from "../../../layout/mainLayout";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Filters from "../../../components/Filters/Filters";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import ProductCard from "../../../components/ProductCard/ProductCard";

// import styles from "../../../styles/Category.module.scss";

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
function Search() {
  let { t } = useTranslation();

  let router = useRouter();
  let { keyword } = router.query;
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [ratings, setRatings] = useState([]);
  const [products, setProducts] = useState([
    {
      img: "15",
      name: "حزام مطرزة",
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
      name: "شورت مطرزة",
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
  const [categories, setCategories] = useState([
    { name: t("categories:men"), link: "men" },
    { name: t("categories:women"), link: "women" },
    { name: t("categories:kids"), link: "kids" },
    { name: t("categories:accessories"), link: "accessories" },
  ]);
  useEffect(() => {
    setProducts((prev) => {
      const filtered = prev.filter((product) => product.name.includes(keyword));
      setFilteredProducts(filtered);
      console.log(prev);
      console.log("filterd", filtered);
      return filtered;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="c-container">
      <Head>
        <title>
          {router.locale === "en"
            ? `stk2day - ${keyword}`
            : `ستوك تو داي - ${keyword}`}
        </title>
      </Head>
      <div className="search-wrapper">
        <div className="col">
          <Filters
            products={products}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            ratings={ratings}
            setRatings={setRatings}
            filteredProducts={filteredProducts}
            setFilteredProducts={setFilteredProducts}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            pricesInputs={pricesInputs}
            setPricesInputs={setPricesInputs}
            categories={categories}
            setCategories={setCategories}
          />
        </div>
        <div className="col">
          {!filteredProducts.length ? (
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
      <style jsx>
        {`
          .search-wrapper {
            display: flex;
            padding: 2rem 0;
            display: flex;
            align-items: flex-start;
            gap: 2rem;
          }

          .col:last-child {
            width: 100%;
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            flex-wrap: wrap;

            @media (max-width: 768px) {
              justify-content: center;
            }
          }
        `}
      </style>
    </section>
  );
}

Search.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Search;
