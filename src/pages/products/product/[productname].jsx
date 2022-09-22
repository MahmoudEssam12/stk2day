import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { MainLayout } from "../../../layout/mainLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Rating } from "primereact/rating";
import Link from "next/link";
import styles from "../../../styles/Product.module.scss";
import { Ripple } from "primereact/ripple";
import { useTranslation } from "next-i18next";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import Slider from "../../../components/Slider/Slider";
import ProductsRow from "../../../components/ProductsRow/ProductsRow";
import { Carousel } from "primereact/carousel";
import { InputTextarea } from "primereact/inputtextarea";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomButton from "../../../components/CustomButton/CustomButton";
import inputStyles from "../../../styles/Inputs.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItem, setCartItem } from "../../../store/slices/cartSlice";
import { Toast } from "primereact/toast";
import { useAddToCart } from "../../../utilities/addToCart";
import { useAddToFavs } from "../../../utilities/useAddToFavs";

export async function getStaticPaths() {
  return {
    paths: [{ params: { productname: "عباية مطرزة" } }],
    fallback: false,
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

const reviews = [
  { name: "Ahmed Ali", text: "cool", rating: 4, img: "Ellipse 1.png" },
  { name: "Manar", text: "Nice", rating: 3, img: "Ellipse 2.png" },
  {
    name: "Marwan Mousa",
    text: "حاسس انه مش هينفع",
    rating: 1,
    img: "Ellipse 3.png",
  },
  {
    name: "Flex ",
    text: "تلاشاني علشان دي دماغي بتزك  ",
    rating: 5,
    img: "Ellipse 1.png",
  },
  {
    name: "Moscow",
    text: "مفيش مابينا رابط حتى جوة الجيم كل طلقة مني صابت",
    rating: 1,
  },
];

const productTemplate = (review) => {
  return (
    <div className={`product-item ${styles.review_item}`}>
      <div className="product-item-content">
        <div>
          <p className={`product-badge status`}>{review.text}</p>

          <div className="mt-0 mb-3">
            <Rating value={review.rating} readOnly stars={5} cancel={false} />
          </div>
          <h4 className="mb-1">{review.name}</h4>
        </div>
        <div className={`mb-3 ${styles.img_wrapper}`}>
          <picture>
            <img
              src={`/images/${review.img}`}
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt={review.name}
              className="product-image"
            />
          </picture>
        </div>
      </div>
    </div>
  );
};
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
    breakpoint: "480px",
    numVisible: 1,
    numScroll: 1,
  },
];

function Product() {
  let router = useRouter();
  let { productname } = router.query;
  const [count, setCount] = useState(1);
  const [sizes, setSizes] = useState("L");
  const [colors, setColors] = useState("black");
  const [value2, setValue2] = useState("");
  const [ratingVal, setRatingVal] = useState(null);
  const { t } = useTranslation();
  const tabs = [
    {
      label: t("products:description"),
      text: `هذه العباءة الرسمية الجميلة السوداء المطرزة بالخرز والمكونة من طبقتين 
    من قماش الشيفون الفرسان المميز مطرزة بوردات ملونة صنعت بدقة لتناسب 
    ذوقك العالي في المقدمة ومن الأعلى ، وعلى الأكمام الطويلة الواسعة والمعصم
    و ياقة دائرية يجمع بين المظهر الإسلامي الحديث والأنيق لحد الكمال`,
    },
    { label: t("products:ratings"), text: `إدي جامد` },
  ];
  const [selectedDetailsTab, setSelectedDetailsTab] = useState(tabs[0]);
  const cart = useSelector(selectCartItem);
  const dispatch = useDispatch();
  const toaster = useRef(null);
  const addToCart = useAddToCart(
    {
      id: 78,
      name: productname,
      price: "244",
      quantity: count,
      color: colors,
      size: sizes,
      merchant: "ahmed mahmoud",
    },
    toaster
  );

  const addToFavourits = useAddToFavs(
    {
      id: 78,
      name: productname,
      price: "244",
      quantity: count,
      color: colors,
      size: sizes,
      merchant: "ahmed mahmoud",
    },
    toaster
  );

  return (
    <>
      <Head>
        <title>
          {router.locale === "en"
            ? `stk2day - ${productname}`
            : `ستوك تو داي - ${productname}`}
        </title>
      </Head>
      <Toast ref={toaster} position="bottom-left" />

      <div className={`c-container ${styles.product_wrapper}`}>
        <div className={`${styles.col}`}>
          <Slider />
        </div>
        <div className={styles.col}>
          <h1>{productname}</h1>
          <div className={styles.product_rating}>
            <Rating value={4} readOnly stars={5} cancel={false} />
            <Link href="/">أحمد محمود</Link>
          </div>
          <div className={styles.product_details}>
            <div className={`${styles.product_detail}`}>
              <span className={styles.key}>{t("products:product_code")}</span>
              <span>#625836</span>
            </div>
            <div className={`${styles.product_detail}`}>
              <span className={styles.key}>{t("products:sizes")}</span>
              <span>L, XL, XXL</span>
            </div>
            <div className={`${styles.product_detail}`}>
              <span className={styles.key}>{t("products:colors")}</span>
              <span>بني, أصفر و دهبي</span>
            </div>
            <div className={`${styles.product_detail}`}>
              <span className={styles.key}>{t("products:material")}</span>
              <span>حرير فاخر</span>
            </div>
          </div>
          <div className={styles.options}>
            <div
              className={`${styles.colors} ${
                router.locale !== "en" && styles.ar
              }`}
            >
              <button
                className={`p-ripple ${
                  colors === "black" ? styles.active : ""
                }`}
                onClick={() => setColors("black")}
              >
                <Ripple />
              </button>
              <button
                className={`p-ripple ${
                  colors === "orange" ? styles.active : ""
                }`}
                onClick={() => setColors("orange")}
              >
                <Ripple />
              </button>
              <button
                className={`p-ripple ${
                  colors === "green" ? styles.active : ""
                }`}
                onClick={() => setColors("green")}
              >
                <Ripple />
              </button>
            </div>
            <div
              className={`${styles.sizes} ${
                router.locale !== "en" && styles.ar
              }`}
            >
              <button
                className={`p-ripple orange ${
                  sizes === "L" ? styles.active : ""
                }`}
                onClick={() => setSizes("L")}
              >
                L <Ripple />
              </button>
              <button
                className={`p-ripple orange ${
                  sizes === "XL" ? styles.active : ""
                }`}
                onClick={() => setSizes("XL")}
              >
                XL <Ripple />
              </button>
              <button
                className={`p-ripple orange ${
                  sizes === "XXL" ? styles.active : ""
                }`}
                onClick={() => setSizes("XXL")}
              >
                XXL <Ripple />
              </button>
            </div>
            <div className={styles.count}>
              <button
                className="p-ripple orange"
                onClick={() => setCount((prev) => prev + 1)}
              >
                +<Ripple />
              </button>
              <span>{count}</span>

              <button
                className="p-ripple orange"
                onClick={() => count > 0 && setCount((prev) => prev - 1)}
              >
                -<Ripple />
              </button>
            </div>
            <span
              style={{ textAlign: router.locale === "en" ? "right" : "left" }}
            >
              800 جنية
            </span>
          </div>
          <div className={styles.buttons}>
            <button className="p-ripple" onClick={addToFavourits}>
              {t("products:add_to_fav")}
              <Ripple />
            </button>
            <button className="p-ripple" onClick={addToCart}>
              {t("products:add_to_cart")}
              <Ripple />
            </button>
          </div>
          <div className={styles.details}>
            <ul>
              {tabs.map((item) => (
                <li
                  key={item.label}
                  className={
                    item.label === selectedDetailsTab.label
                      ? styles.selected
                      : ""
                  }
                  onClick={() => setSelectedDetailsTab(item)}
                >
                  {item.label}
                </li>
              ))}
              <li
                style={{
                  display:
                    selectedDetailsTab.label === t("products:ratings")
                      ? "block"
                      : "none",
                }}
              >
                <button onClick={() => setSelectedDetailsTab({ label: "add" })}>
                  +
                </button>
              </li>
            </ul>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDetailsTab ? selectedDetailsTab.label : "empty"}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`product-details ${styles.details_description}`}
              >
                {selectedDetailsTab.label === t("products:ratings") ? (
                  <Carousel
                    value={reviews}
                    numVisible={3}
                    numScroll={1}
                    responsiveOptions={responsiveOptions}
                    className="custom-carousel"
                    circular
                    itemTemplate={productTemplate}
                    style={{ direction: "ltr" }}
                  />
                ) : selectedDetailsTab.label === "add" ? (
                  <div
                    className={`p-float-label ${
                      router.locale === "en" && "p-input-icon-left"
                    } ${inputStyles.input_wrapper}`}
                  >
                    <FontAwesomeIcon
                      icon={faCommentDots}
                      className={`${inputStyles.inputIcons} ${
                        router.locale === "en" ? inputStyles.icon_en : ""
                      }`}
                    />
                    <InputTextarea
                      value={value2}
                      onChange={(e) => setValue2(e.target.value)}
                      rows={5}
                      cols={30}
                      autoResize
                      style={{ width: "100%" }}
                      id="review"
                    />
                    <label htmlFor="review">
                      {router.locale === "en" ? "Rating" : "التقييم"}
                    </label>

                    <Rating
                      value={ratingVal}
                      cancel={false}
                      onChange={(e) => setRatingVal(e.value)}
                    />
                    <CustomButton
                      text={t("products:send_btn")}
                      color="secondary-box"
                      style={{
                        width: "100%",
                        padding: "1.5rem 0",
                        backgroundColor: "#e44c00",
                        textTransform: "capitalize",
                      }}
                    />
                  </div>
                ) : (
                  selectedDetailsTab.text
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <section className="c-container">
        <ProductsRow title={t("products:related_products")} />
      </section>
    </>
  );
}
Product.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
export default Product;
