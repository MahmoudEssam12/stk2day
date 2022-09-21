import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Rating } from "primereact/rating";
import { useTranslation } from "next-i18next";
import { Toast } from "primereact/toast";
import styles from "./ProductCard.module.scss";
import { Ripple } from "primereact/ripple";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFavourit,
  setFavourits,
  removeFavourit,
} from "../../store/slices/favourtisSlice";
import { useAddToCart } from "../../utilities/addToCart";
function ProductCard({ id = "", img, name, merchant, price, rating = 4 }) {
  const { t } = useTranslation();
  const [fav, setFav] = useState(false);
  const favourits = useSelector(selectFavourit);
  const dispatch = useDispatch();
  const toaster = useRef(null);
  const showMessage = (type, summary, detail) => {
    toaster.current.show({
      severity: type,
      summary,
      detail,
      life: 3000,
    });
  };

  const addProductToLocalStorage = (product) => {
    const items = JSON.parse(window.localStorage.getItem("favs"));
    if (items) {
      const checkForDuplicate = items.find((item) => item.id === product.id);
      if (!checkForDuplicate) {
        const favedProducts = [...items, product];
        localStorage.setItem("favs", JSON.stringify(favedProducts));
        dispatch(setFavourits(product));
        setFav(true);
        showMessage(
          "success",
          t("products:message_success_summary"),
          t("products:message_success_detail")
        );
      } else {
        showMessage(
          "error",
          t("products:message_error_summary"),
          t("products:message_error_detail")
        );
      }
    } else {
      localStorage.setItem("favs", JSON.stringify([product]));
      dispatch(setFavourits(product));
      setFav(true);
      showMessage(
        "success",
        t("products:message_success_summary"),
        t("products:message_success_detail")
      );
    }
  };

  const removeProductFromLocalStorage = (product) => {
    const items = JSON.parse(localStorage.getItem("favs"));
    if (items) {
      const favedProducts = items.filter((item) => item.id !== product.id);
      localStorage.setItem("favs", JSON.stringify(favedProducts));
      dispatch(removeFavourit(product.id));
      setFav(false);
      showMessage(
        "info",
        t("products:message_info_summary"),
        t("products:message_info_detail")
      );
    }
  };

  const handleFavouritProduct = () => {
    // add the object to the store
    //add the product to localstorage
    // fetch it in the store
    const favedProduct = { id, img, name, merchant, price, rating };
    if (fav) {
      removeProductFromLocalStorage(favedProduct);
    } else {
      addProductToLocalStorage(favedProduct);
    }
  };
  const test = useAddToCart(
    { id, img, name, price, merchant, rating, quantity: 1 },
    toaster
  );
  useEffect(() => {
    if (favourits.find((product) => product.id === id)) {
      setFav(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.product_card}>
      <Toast ref={toaster} position="bottom-left" />
      <div className={styles.img_wrapper}>
        <picture>
          <img src={`/images/Rectangle ${img}.png`} alt={name} />
        </picture>
      </div>
      <h4 className={styles.product_name}>
        <Link href={`/products/product/${name}`}>{name}</Link>
      </h4>
      <Link href="/merchant" className={styles.merchant}>
        {merchant}
      </Link>
      <div className={styles.rating}>
        <Rating value={rating} readOnly stars={5} cancel={false} />
      </div>
      <div className={styles.card_footer}>
        <div className={styles.price}>
          <span>{t("products:price")}</span>
          <p>
            {price} {t("products:currency")}
          </p>
        </div>
        <button className={styles.add_to_cart} onClick={test}>
          {t("products:add_to_cart")} <i className="pi pi-shopping-cart"></i>
          <Ripple />
        </button>
      </div>
      <button
        className={`${styles.heart} ${fav && styles.faved}`}
        onClick={handleFavouritProduct}
      >
        <i className="pi pi-heart-fill"></i>
        <Ripple />
      </button>
    </div>
  );
}

export default ProductCard;
