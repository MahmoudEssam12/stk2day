import React, { useRef, useCallback, useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import useEmblaCarousel from "embla-carousel-react";
import { PrevButton, NextButton } from "./EmablaButtons";
import Autoplay from "embla-carousel-autoplay";

import styles from "../../styles/Products.module.scss";
function ProductsRow({ title }) {
  let num = 4;
  const productRow = useRef();
  // const [emblaRef] = useEmblaCarousel();
  const [viewportRef, embla] = useEmblaCarousel(
    {
      slidesToScroll: 1,
      containScroll: "trimSnaps",
      loop: false,
    },
    [Autoplay()]
  );
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);
  return (
    <section className={styles.row}>
      <h3>{title}</h3>
      <div
        className={`${styles.products_row} embla ${
          num <= 4 ? styles.hide_scroll : " "
        }`}
        // ref={productRow}
        // onWheel={(e) => {
        //   e.preventDefault();
        //   productRow.current.scrollLeft += e.deltaY;
        // }}
      >
        <div className="embla__viewport" ref={viewportRef}>
          <div className="embla__container">
            <div className="embla__slide">
              <ProductCard
                img="15"
                name="عباية مطرزة"
                merchant="احمد محمد"
                price="500"
                id={1}
              />
            </div>

            <div className="embla__slide">
              <ProductCard
                img="10"
                name="عباية مطرزة"
                merchant="احمد محمد"
                price="500"
                id={2}
              />
            </div>
            <div className="embla__slide">
              <ProductCard
                img="11"
                name="عباية مطرزة"
                merchant="احمد محمد"
                price="500"
                id={3}
              />
            </div>
            <div className="embla__slide">
              <ProductCard
                img="12"
                name="عباية مطرزة"
                merchant="احمد محمد"
                price="500"
                id={4}
              />
            </div>
            <div className="embla__slide">
              <ProductCard
                img="12"
                name="عباية مطرزة"
                merchant="احمد محمد"
                price="500"
                id={5}
              />
            </div>
          </div>
        </div>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </div>
    </section>
  );
}

export default ProductsRow;
