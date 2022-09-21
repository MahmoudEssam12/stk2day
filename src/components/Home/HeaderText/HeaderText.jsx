import React from "react";
import style from "./HeaderText.module.scss";

function HeaderText({ subHeader, mainHeader }) {
  return (
    <section className={style.header_text}>
      <h2 className={style.main_header}>{mainHeader}</h2>
      <picture>
        <img
          src="/images/under_line.png"
          width="150"
          height="100"
          alt="stk2day"
        />
      </picture>
    </section>
  );
}

export default HeaderText;
