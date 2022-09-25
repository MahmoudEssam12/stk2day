import Link from "next/link";
import { Ripple } from "primereact/ripple";
import React from "react";
import styles from "./CategoryCard.module.scss";
function CategoryCard({ img, text, link }) {
  return (
    //
    <Link href={`/products/category/${link}`}>
      <div className={"card_wrapper"}>
        <div className={"img_wrapper"}>
          <picture>
            <img src={`/images/${img}.png`} alt={text} />
          </picture>
        </div>
        <h4>{text}</h4>
        <Ripple />
        <style jsx>
          {`
            .card_wrapper {
              padding: 2rem 6rem;
              text-align: center;
              box-shadow: 0px 4px 80px rgba(224, 224, 224, 0.38);
              border-radius: 8px;
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 1rem;
              flex-direction: column;
              cursor: pointer;
              position: relative;
              z-index: 1;
              position: relative;
              overflow: hidden;

              h4 {
                text-transform: capitalize;
                transition: color 0.3s ease;
              }

              .img_wrapper {
                width: 115px;
                height: 115px;
                background-color: var(--light-secondary);
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #ffd5bf;
                transition: all 0.3s ease;

                img {
                  width: 45px;
                  height: 70px;
                  object-fit: contain;
                }
              }

              &::before {
                position: absolute;
                content: "";
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background-image: linear-gradient(to bottom, #ffa669, #f39e9e);
                z-index: -1;
                transition: all 0.3s linear;
                opacity: 0;
                border-radius: 8px;
                transform: translateY(10px);
              }

              &:hover::before {
                opacity: 1;
                transform: translateY(0);
              }

              &:hover {
                .img_wrapper {
                  background-color: #fff;
                }

                h4 {
                  color: #fff;
                }
              }
            }
          `}
        </style>
      </div>
    </Link>
  );
}

export default CategoryCard;
