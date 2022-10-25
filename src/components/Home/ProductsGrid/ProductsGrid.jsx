import React from "react";
import Link from "next/link";
import style from "./ProductGrid.module.scss";
function ProductsGrid() {
  return (
    <section className={`grid_wrapper`}>
      <div className={`product very_light_blue`}>
        <Link href="#">
          <>
            <picture>
              <img src="/images/Rectangle 10.png" alt="ستوك تو داي - ملابس" />
            </picture>
          </>
        </Link>
      </div>
      <div className={"products_wrapper"} style={{ maxWidth: "600px" }}>
        <div className={`product light_blue`}>
          <Link href="#">
            <>
              <picture>
                <img src="/images/Rectangle 12.png" alt="ستوك تو داي - ملابس" />
              </picture>
            </>
          </Link>
        </div>
        <div className={`product middle`}>
          <Link href="#">
            <>
              <picture>
                <img src="/images/Rectangle 9.png" alt="ستوك تو داي - اطفال" />
              </picture>
            </>
          </Link>
        </div>
        <div className={"product"}>
          <Link href="#">
            <>
              <picture>
                <img src="/images/Rectangle 13.png" alt="ستوك تو داي - احذية" />
              </picture>
            </>
          </Link>
        </div>

        <div className={"product"}>
          <Link href="#">
            <>
              <picture>
                <img src="/images/Rectangle 14.png" alt="ستوك تو داي - حقائب" />
              </picture>
            </>
          </Link>
        </div>
        <div className={`product skin_color`}>
          <Link href="#">
            <>
              <picture>
                <img src="/images/Rectangle 15.png" alt="ستوك تو داي - اطفال" />
              </picture>
            </>
          </Link>
        </div>
      </div>
      <div className={`product off_white`}>
        <Link href="#">
          <>
            <picture>
              <img src="/images/Rectangle 11.png" alt="ستوك تو داي - ملابس" />
            </picture>
          </>
        </Link>
      </div>

      <style jsx>
        {`
          .grid_wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            background-image: url("/images/login-bg.png");
            gap: 1rem;
            flex-wrap: wrap;

            .very_light_blue {
              background-color: #ecfcff;
            }

            .middle {
              background-color: #e86f32;
              grid-row: span 2;
            }

            .off_white {
              background-color: #f5ffea;
            }

            .light_blue {
              background-color: #b9dbef;
            }

            .skin_color {
              background-color: #ffe9be;
            }

            .product {
              position: relative;
              border-radius: 8px;
              overflow: hidden;
            }
          }

          .products_wrapper {
            display: grid;
            grid-template-columns: repeat(3, 1fr);

            gap: 1rem;

            img {
              object-fit: cover;
              height: 100%;
              width: 100%;
            }
          }

          @media (max-width: 900px) {
            .products_wrapper {
              margin: 0 1rem;
            }
          }
          @media (max-width: 576px) {
            .grid_wrapper > .product {
              width: 50%;
            }
          }
        `}
      </style>
    </section>
  );
}

export default ProductsGrid;
