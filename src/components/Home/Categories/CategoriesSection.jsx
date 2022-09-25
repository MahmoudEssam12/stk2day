import React, { useState, useEffect, useRef } from "react";
import CustomButton from "../../CustomButton/CustomButton";
import { Carousel } from "primereact/carousel";
import styles from "./CategoriesSection.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCategory,
  setCategory,
} from "./../../../store/slices/categorySlice";

function CategoriesSection() {
  const categoryName = useSelector(selectCategory);
  const dispatch = useDispatch();
  const changeCategory = (text) => {
    dispatch(setCategory(text));
  };
  const noProductsMsg = useRef();
  const [products, setProducts] = useState([
    {
      name: "شورت بحر",
      price: "50",
      image: "slide-1.png",
      inventoryStatus: "instock",
      category: "ملابس رجالي",
    },
    {
      name: "بلوزة بحر",
      price: "115",
      image: "slide-2.png",
      inventoryStatus: "instock",
      category: "ملابس رجالي",
    },
    {
      name: "شورت بحر",
      price: "95",
      image: "slide-3.png",
      inventoryStatus: "out of stock",
      category: "أحذية",
    },
    {
      name: "شورت بحر",
      price: "95",
      image: "slide-4.png",
      inventoryStatus: "out of stock",
      category: "أطفال",
    },
    {
      name: "بلوزة بحر",
      price: "115",
      image: "slide-5.png",
      inventoryStatus: "instock",
      category: "ملابس رجالي",
    },
  ]);
  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: "768px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "600px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "480px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const categoryFilter = () => {
    return products.filter((product) => product.category === categoryName);
  };

  const productTemplate = (product) => {
    return (
      <div className={`product-item`}>
        <div className={`product-item-content ${styles.product_item_card}`}>
          <div className={`mb-1 ${styles.product_image}`}>
            <picture>
              <img
                src={`/images/${product.image}`}
                onError={(e) =>
                  (e.target.src =
                    "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                }
                alt={product.name}
                className="product-image"
              />
            </picture>
          </div>
          <div>
            <h4 className="mb-1">{product.name}</h4>
            <h6 className="mt-0 mb-3">${product.price}</h6>
            <span
              className={`product-badge status-${product.inventoryStatus.toLowerCase()}`}
            >
              {product.inventoryStatus}
            </span>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    noProductsMsg.current?.show({
      severity: "info",
      summary: "Info",
      detail: "There No products here",
      sticky: true,
    });
  }, [noProductsMsg]);
  return (
    <section>
      <div className={`btns-container ${styles.buttons_container}`}>
        <CustomButton
          text="ملابس رجالي"
          color="secondary-box"
          changeCategory
          click={() => changeCategory("ملابس رجالي")}
        />
        <CustomButton
          text="أحذية"
          color="secondary-box"
          click={() => changeCategory("أحذية")}
        />
        <CustomButton
          text="أطفال"
          color="secondary-box"
          click={() => changeCategory("أطفال")}
        />
        <CustomButton
          text="حقائب"
          color="secondary-box"
          click={() => changeCategory("حقائب")}
        />
      </div>
      <div className={`${styles.slider_container} carousel-container`}>
        <div
          className="card"
          id="test"
          style={{ maxWidth: "900px", margin: "auto" }}
        >
          {categoryFilter().length ? (
            <Carousel
              value={categoryFilter()}
              numVisible={3}
              numScroll={1}
              responsiveOptions={responsiveOptions}
              className="custom-carousel"
              circular
              itemTemplate={productTemplate}
            />
          ) : (
            <h2 className={styles.info_text} style={{ direction: "rtl" }}>
              <i
                className="pi pi-inbox"
                style={{ fontSize: "2rem", marginLeft: "1rem" }}
              ></i>
              لا يوجد <span>{categoryName}</span>
            </h2>
          )}
        </div>
      </div>
      <style jsx>
        {`
          .buttons_container {
            display: flex;
            justify-content: space-around;
            gap: 1rem;
            flex-wrap: wrap;
          }

          .slider_container {
            direction: ltr;
            margin: 2rem 0;
          }

          .product_item_card {
            background-color: #fff8f3;
            overflow: hidden;
          }

          .info_text {
            direction: rtl;
            background-color: var(--secondary-color);
            padding: 1.5rem;
            border-radius: 8px;
            color: #fff;
          }
        `}
      </style>
    </section>
  );
}

export default CategoriesSection;
