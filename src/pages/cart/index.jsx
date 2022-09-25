import React, { useState, useEffect } from "react";
import CartItem from "../../components/CartItem/CartItem";
import { MainLayout } from "../../layout/mainLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { InputText } from "primereact/inputtext";
import inputStyles from "../../styles/Inputs.module.scss";
import { useRouter } from "next/router";
import styles from "../../styles/Cart.module.scss";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useSelector } from "react-redux";
import { selectCartItem } from "../../store/slices/cartSlice";
import { motion } from "framer-motion";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "footer",
        "navbar",
        "common",
        "products",
        "cart",
      ])),
    },
  };
}
function Cart() {
  const { t } = useTranslation();
  const router = useRouter();
  const [voucherValue, setVoucherValue] = useState("");
  const [step, setStep] = useState(1);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const handleChange = (e) => {
    setVoucherValue(e.target.value);
  };

  // make a slice in the store for the cart
  // implement the add to cart btn in the product page and the button of the product cart
  // fetch the data from the store in this file
  // create an array of prices and quantites from the array of products
  const items = useSelector(selectCartItem);
  const getTotalOrderCost = () => {
    if (items.length) {
      let arrayOfPrices = items.map(
        (item) => Number(item.price) * Number(item.quantity)
      );
      let orderPrice = arrayOfPrices.reduce((prev, current) => prev + current);
      return orderPrice;
    }
    return 0;
  };
  const getTotalCost = () => {
    // create an array of numbers from items array
    // with reduce method accumelate the arr of numbers
    //then return that number to the total cost div
    if (items.length) {
      let arrayOfPrices = items.map(
        (item) => Number(item.price) * Number(item.quantity)
      );
      let orderPrice = arrayOfPrices.reduce((prev, current) => prev + current);
      // add the delivery cost on the order price
      return orderPrice;
    }
    return 0;
  };

  // useEffect to update the total cost when quantity changes
  useEffect(() => {
    getTotalOrderCost();
    getTotalCost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <section>
        <div className={styles.img_wrapper}>
          <picture>
            <img src="/images/cart-lg.png" alt="stk2day - cart" />
          </picture>
        </div>
        {step === 1 ? (
          <div className={`c-container ${styles.products_wrapper}`}>
            <h1>{t("cart:cart_title")}</h1>
            <div className={styles.products}>
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  merchant={item.merchant}
                  rating={item.rating}
                  price={item.price}
                  img={item.img}
                  quantity={item.quantity}
                />
              ))}

              <div className={styles.order_details}>
                <div>
                  <h5>{t("cart:cart_total")}</h5>
                  <h5>{t("cart:delivery_cost")}</h5>
                </div>
                <div>
                  <h5>{getTotalOrderCost()} جنية</h5>
                  <h5>0 جنية</h5>
                </div>
              </div>
            </div>
            <div className={styles.voucher_wrapper}>
              <span
                className={`p-float-label  ${
                  router.locale === "en" && "p-input-icon-left"
                } ${inputStyles.input_wrapper} ${styles.input_search} ${
                  router.locale === "en" ? " " : styles.ar
                }`}
              >
                <InputText
                  value={voucherValue}
                  name="search"
                  id="search"
                  onChange={handleChange}
                />

                <label htmlFor="search">{t("cart:voucher")}</label>
              </span>
              <div className={router.locale === "en" ? " " : styles.ar}>
                <CustomButton
                  text={t("cart:add_code_btn")}
                  color="secondary-box"
                  style={{
                    padding: "1rem 0",
                    backgroundColor: "var(--secondary-color)",
                    textTransform: "capitalize",
                  }}
                />
              </div>
            </div>
            <div className={`${styles.order_details} ${styles.order_total}`}>
              <div>
                <h5>{t("cart:cart_total")}</h5>
                <h5>
                  {t("cart:delivery_date")} <span> 12 يونيو 2022</span>
                </h5>
              </div>
              <div>
                <h5>{getTotalCost()} جنية</h5>
              </div>
            </div>
            <CustomButton
              text={t("cart:continue")}
              color="secondary-box"
              style={{
                padding: "1rem 0",
                backgroundColor: "var(--secondary-color)",
                textTransform: "capitalize",
                width: "100%",
                marginTop: "1rem",
              }}
              click={() => setStep(2)}
            />
          </div>
        ) : (
          <div className="c-container" style={{ padding: "2rem 0" }}>
            <span
              className={`p-float-label  ${
                router.locale === "en" && "p-input-icon-left"
              } ${inputStyles.input_wrapper} ${styles.input_search} ${
                router.locale === "en" ? " " : styles.ar
              }`}
            >
              <InputText
                value={address1}
                name="shipping-address"
                id="shipping-address"
                onChange={handleChange}
              />

              <label htmlFor="shipping-address">
                {t("cart:shipping_address")}
              </label>
            </span>
            <span
              className={`p-float-label  ${
                router.locale === "en" && "p-input-icon-left"
              } ${inputStyles.input_wrapper} ${styles.input_search} ${
                router.locale === "en" ? " " : styles.ar
              }`}
            >
              <InputText
                value={address2}
                name="bill-address"
                id="bill-address"
                onChange={handleChange}
              />

              <label htmlFor="bill-address">{t("cart:bill_address")}</label>
            </span>
            <CustomButton
              text={t("cart:confirm")}
              color="secondary-box"
              style={{
                padding: "1rem 0",
                backgroundColor: "var(--secondary-color)",
                textTransform: "capitalize",
                width: "100%",
                marginTop: "1rem",
              }}
            />
          </div>
        )}
      </section>
    </motion.div>
  );
}

Cart.getLayout = function getLayout(page) {
  return (
    <MainLayout en="Cart" ar="سلة التسوق">
      {page}
    </MainLayout>
  );
};
export default Cart;
