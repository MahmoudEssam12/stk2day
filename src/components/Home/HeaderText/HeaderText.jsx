import React from "react";
import style from "./HeaderText.module.scss";

function HeaderText({ subHeader, mainHeader }) {
  return (
    <section className={"header_text"}>
      <h2 className={"main_header"}>{mainHeader}</h2>
      <picture>
        <img
          src="/images/under_line.png"
          width="150"
          height="100"
          alt="stk2day"
        />
      </picture>
      <style jsx>
        {`
          .header_text {
            text-align: center;
            margin: 2rem 0;

            .sub_header {
              color: var(--grey-color);
            }

            .main_header {
              font-size: 2rem;
              margin-bottom: 10px;
              text-transform: capitalize;
              color: var(--default-color);
            }

            img {
              width: 130px;
              height: 11px;
            }
          }
        `}
      </style>
    </section>
  );
}

export default HeaderText;
