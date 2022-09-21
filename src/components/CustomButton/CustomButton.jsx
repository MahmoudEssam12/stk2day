import React from "react";
import PrimeReact from "primereact/api";
import { Ripple } from "primereact/ripple";
import styles from "./CustomButton.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategory,
  selectCategory,
} from "./../../store/slices/categorySlice";

function CustomButton({ text, color, style = {}, type = " ", click }) {
  PrimeReact.ripple = true;
  const category = useSelector(selectCategory);
  const dispatch = useDispatch();

  const changeCategory = () => {
    dispatch(setCategory(text));
  };
  return (
    <>
      <button
        className={`c_btn ${color} p-ripple ${styles.custom_button} ${
          category === text ? styles.active : " "
        }`}
        onClick={() => (click !== undefined ? click() : " ")}
        style={style}
        type={type}
      >
        {text}
        <Ripple />
      </button>
    </>
  );
}

export default CustomButton;
