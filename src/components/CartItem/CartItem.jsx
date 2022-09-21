import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Rating } from "primereact/rating";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CartItem.module.scss";
import { Ripple } from "primereact/ripple";
import { useDispatch, useSelector } from "react-redux";
import {
  quantityHandler,
  selectCartItem,
  removeCartItem,
} from "../../store/slices/cartSlice";
import { useTranslation } from "next-i18next";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

function CartItem({ img, id, name, merchant, rating, price, quantity }) {
  const [qty, setQty] = useState(quantity);
  const disptach = useDispatch();
  const cartItems = useSelector(selectCartItem);
  const { t } = useTranslation();

  const accept = () => {
    disptach(removeCartItem(id));
  };

  const reject = () => {};
  // function to delete the cartitem from cart when quantity is 0

  const confirm = () => {
    confirmDialog({
      message: t("cart:remove_confirmation_body"),
      header: t("cart:remove_confirmation_header"),
      icon: "pi pi-exclamation-triangle",
      accept,
      reject,
    });
  };
  const getQuantity = () => {
    let product = cartItems.find((item) => item.id === id);
    setQty(product.quantity);
  };

  const updateQuantity = () => {
    disptach(quantityHandler({ type: "add", id }));
  };

  const removeOne = () => {
    if (qty > 1) {
      disptach(quantityHandler({ type: "remove", id }));
    } else {
      confirm();
    }
  };

  // handle delete cart item button
  const handleRemove = () => {
    confirm();
  };
  useEffect(() => {
    getQuantity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);
  return (
    <div className={styles.cart_item}>
      <ConfirmDialog />
      <div className={styles.col}>
        <div className={styles.img}>
          <picture>
            <img src={`/images/Rectangle ${img}.png`} alt="product" />
          </picture>
        </div>
        <div className={styles.product_details}>
          <h4>{name}</h4>
          <Link href="/">
            <span>{merchant}</span>
          </Link>
          <Rating value={rating} readOnly stars={5} cancel={false} />
        </div>
      </div>
      <div className={styles.col}>
        <div className={styles.quantity}>
          <button className="p-ripple orange" onClick={updateQuantity}>
            +<Ripple />
          </button>

          <span>{qty}</span>

          <button className="p-ripple orange" onClick={removeOne}>
            -<Ripple />
          </button>
        </div>
      </div>
      <div className={styles.col}>
        <button onClick={handleRemove}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        <p>{price * qty} جنية</p>
      </div>
    </div>
  );
}

export default CartItem;
