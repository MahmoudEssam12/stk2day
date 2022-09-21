import gsap from "gsap";
import React, { useEffect } from "react";
import style from "./Header.module.scss";
function Header() {
  let tl = gsap.timeline({});
  useEffect(() => {
    const headers = document.querySelectorAll("h2");
    // tl.from("h2", { y: 20, stagger: 0.8, duration: 0.5 });
  }, []);

  return (
    <header className={style.header_wrapper}>
      <div className={style.col}>
        <h2>Ame</h2>
        <h2>Baltic</h2>
        <h2>Snorri</h2>
        <h2>Orvar</h2>
      </div>
      <div className={style.col}>
        <picture>
          <img src="/images/header_image.png" alt="stk2day shopping image" />
        </picture>
        <picture>
          <img src="/images/header_image.png" alt="stk2day shopping image" />
        </picture>
        <picture>
          <img src="/images/header_image.png" alt="stk2day shopping image" />
        </picture>
        <picture>
          <img src="/images/header_image.png" alt="stk2day shopping image" />
        </picture>
      </div>
    </header>
  );
}

export default Header;
