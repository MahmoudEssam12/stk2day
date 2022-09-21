import React from "react";
import Link from "next/link";
import style from "./ProductGrid.module.scss";
function ProductsGrid() {
  return (
    <section className={style.grid_wrapper}>
      <div className={`${style.product} ${style.very_light_blue}`}>
        <Link href="#">
          <>
            <picture>
              <img src="/images/Rectangle 10.png" alt="ستوك تو داي - ملابس" />
            </picture>
          </>
        </Link>
      </div>
      <div className={style.products_wrapper} style={{ maxWidth: "600px" }}>
        <div className={`${style.product} ${style.light_blue}`}>
          <Link href="#">
            <>
              <picture>
                <img src="/images/Rectangle 12.png" alt="ستوك تو داي - ملابس" />
              </picture>
            </>
          </Link>
        </div>
        <div className={`${style.product} ${style.middle}`}>
          <Link href="#">
            <>
              <picture>
                <img src="/images/Rectangle 9.png" alt="ستوك تو داي - اطفال" />
              </picture>
            </>
          </Link>
        </div>
        <div className={style.product}>
          <Link href="#">
            <>
              <picture>
                <img src="/images/Rectangle 13.png" alt="ستوك تو داي - احذية" />
              </picture>
            </>
          </Link>
        </div>

        <div className={style.product}>
          <Link href="#">
            <>
              <picture>
                <img src="/images/Rectangle 14.png" alt="ستوك تو داي - حقائب" />
              </picture>
            </>
          </Link>
        </div>
        <div className={`${style.product} ${style.skin_color}`}>
          <Link href="#">
            <>
              <picture>
                <img src="/images/Rectangle 15.png" alt="ستوك تو داي - اطفال" />
              </picture>
            </>
          </Link>
        </div>
      </div>
      <div className={`${style.product} ${style.off_white}`}>
        <Link href="#">
          <>
            <picture>
              <img src="/images/Rectangle 11.png" alt="ستوك تو داي - ملابس" />
            </picture>
          </>
        </Link>
      </div>
    </section>
  );
}

export default ProductsGrid;
