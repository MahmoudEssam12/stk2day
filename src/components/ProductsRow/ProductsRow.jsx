import React, { useRef } from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "../../styles/Products.module.scss";
function ProductsRow({ title }) {
  let num = 4;
  const productRow = useRef();
  return (
    <section className={styles.row}>
      <h3>{title}</h3>
      <div
        className={`${styles.products_row} ${
          num <= 4 ? styles.hide_scroll : " "
        }`}
        ref={productRow}
        onWheel={(e) => {
          e.preventDefault();
          productRow.current.scrollLeft += e.deltaY;
        }}
      >
        <ProductCard
          img="15"
          name="عباية مطرزة"
          merchant="احمد محمد"
          price="500"
          id={1}
        />
        <ProductCard
          img="10"
          name="عباية مطرزة"
          merchant="احمد محمد"
          price="500"
          id={2}
        />
        <ProductCard
          img="11"
          name="عباية مطرزة"
          merchant="احمد محمد"
          price="500"
          id={3}
        />
        <ProductCard
          img="12"
          name="عباية مطرزة"
          merchant="احمد محمد"
          price="500"
          id={4}
        />
        <ProductCard
          img="12"
          name="عباية مطرزة"
          merchant="احمد محمد"
          price="500"
          id={5}
        />
      </div>
    </section>
  );
}

export default ProductsRow;
