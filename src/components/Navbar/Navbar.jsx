import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Dropdown } from "primereact/dropdown";
import { useSelector, useDispatch } from "react-redux";
import { selectLanguage, setLanguage } from "../../store/slices/languageSlice";
import { selectRegion, setRegion } from "../../store/slices/regionSlice";
import { useRouter } from "next/router";
import style from "./NavBar.module.css";
import { useTranslation } from "next-i18next";
// import { useTranslation } from "next-i18next/dist/types";

const languages = [
  { name: "عربي", code: "ar", flag: "egypt" },
  { name: "English", code: "en", flag: "english" },
];
const regions = [
  { name: "مصر", code: "eg", flag: "egypt" },
  { name: "الإمارات", code: "uae", flag: "uae" },
];

const navLinks = [
  { href: "/", name: "main" },
  { href: "/products", name: "products" },
  { href: "/profile", name: "profile" },
  { href: "/contact-us", name: "contact-us" },
  { href: "/login", name: "login" },
  { href: "/register", name: "register" },
];
function Navbar({}) {
  const [navListState, setNavListState] = useState(false);
  const language = useSelector(selectLanguage);
  const mainRegion = useSelector(selectRegion);
  const dispatch = useDispatch();
  const [region] = useState(mainRegion);
  const router = useRouter();
  const [lang, setLang] = useState(language);
  const { t } = useTranslation();
  const top = useRef();
  const mid = useRef();
  const bottom = useRef();
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
  }, []);
  const [menuTl] = useState(gsap.timeline({ paused: true }));

  function toggleNavMenu() {
    setNavListState((prev) => !prev);
    menuTl.reversed(!menuTl.reversed());
    // control active state for navlinks
    // hide navbar after navigating to anothor page
  }

  useEffect(() => {
    menuTl
      .to(top.current, { rotate: 45, opacity: 0, duration: 0.2 })
      .to(mid.current, { rotate: 50, duration: 0.2 }, "<")
      .to(bottom.current, { rotate: 125, x: -1, y: -8, duration: 0.2 }, "<")
      .reverse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onLaguageChange = (e) => {
    setLang(e.value);
    localStorage.setItem("lang", JSON.stringify(e.value));
    const locale = e.value.code;
    router.push(router.pathname, router.asPath, { locale });
  };
  const onRegionChange = (e) => {
    setRegion(e.value);
    dispatch(setRegion(e.value));
    if (typeof window !== "undefined") {
      localStorage.setItem("region", JSON.stringify(e.value));
    }
  };

  const handleClose = (e) => {
    if (navListState) {
      setNavListState(false);
      menuTl.reversed(!menuTl.reversed());
    }
  };

  useEffect(() => {
    if (localStorage.getItem("lang")) {
      const language = JSON.parse(localStorage.getItem("lang"));
      console.log(language, "language");
      setLang(language);

      if (Object.keys(router.components)[0] === "/404") {
        router.push(router.asPath, "/404", { locale: language.code });
      } else {
        // find a way to detect if the page is 404
        router.push(router.asPath, router.asPath, { locale: language.code });
      }
    } else {
      const language = JSON.parse(localStorage.getItem("lang"));
      setLang(language);
    }
    if (localStorage.getItem("region")) {
      dispatch(setRegion(JSON.parse(localStorage.getItem("region"))));
    }
    // setLang(languages.find((lang) => lang.code === router.locale));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedTemplate = (option, props) => {
    if (option) {
      return (
        <div
          className={`country-item country-item-value ${style.dropdown_style}`}
        >
          <picture>
            <img
              alt={option.name}
              src={`/images/${option.flag}-flag.png`}
              className={`flag flag-${option.code.toLowerCase()}`}
            />
          </picture>
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const optionTemplate = (option) => {
    return (
      // <Link href={router.asPath} locale={option.code}>
      <div className={`country-item ${style.dropdown_style}`}>
        <picture>
          <img
            alt={option.name}
            src={`/images/${option.flag}-flag.png`}
            className={`flag flag-${option.code.toLowerCase()}`}
          />
        </picture>

        <div>{option.name}</div>
      </div>
      // </Link>
    );
  };

  return (
    <nav
      className={`navigation-bar ${style.nav} ${sticky ? style.sticky : " "}`}
    >
      <div className={`c-container ${style.nav__container}`}>
        <div
          className={style.burgerMenu}
          id="burgerMenu"
          onClick={toggleNavMenu}
        >
          <span ref={top}></span>
          <span ref={mid}></span>
          <span ref={bottom}></span>
        </div>
        <Link href="/">
          <picture style={{ cursor: "pointer" }} className={style.pic}>
            <img src="/images/logo.png" alt="stk2day logo - ستوك تو جاي لوجو" />
          </picture>
        </Link>
        <div
          className={`${style.navBarLinks} ${navListState ? style.active : ""}`}
        >
          <ul id="navList">
            {navLinks.map((link) =>
              link.name !== "register" ? (
                <li
                  key={link.name}
                  className={
                    "/" + router.pathname.split("/")[1] === link.href
                      ? style.link_active
                      : " "
                  }
                >
                  <Link href={link.href} passHref>
                    <a onClick={handleClose}>{t(`navbar:${link.name}`)}</a>
                  </Link>
                </li>
              ) : (
                <li className={style.registerBtn} key={link.name}>
                  <Link href="/register" passHref>
                    <a>{t("navbar:register")}</a>
                  </Link>
                </li>
              )
            )}
          </ul>
          <div className={style.dropdowns}>
            <Link href="/favourits">
              <i
                className="pi pi-heart-fill"
                style={{
                  fontSize: "1.4rem",
                  color: "#ff6c72",
                  cursor: "pointer",
                }}
                onClick={handleClose}
              ></i>
            </Link>
            <Link href="/cart">
              <picture style={{ cursor: "pointer" }} className={style.pic}>
                <img
                  src="/images/cart-sm.png"
                  onClick={handleClose}
                  alt="stk2day - cart"
                />
              </picture>
            </Link>
            <div
              className={style.dropdowns_wrapper}
              style={{ direction: router.locale === "en" ? "rtl" : "rtl" }}
            >
              <Dropdown
                value={lang}
                options={languages}
                onChange={onLaguageChange}
                optionLabel="name"
                placeholder="Select Language"
                valueTemplate={selectedTemplate}
                itemTemplate={optionTemplate}
                style={{ width: "84px", height: "55px" }}
                className={style.first_dropdown}
              />

              <Dropdown
                value={mainRegion}
                options={regions}
                onChange={onRegionChange}
                optionLabel="name"
                placeholder="Select Region"
                valueTemplate={selectedTemplate}
                itemTemplate={optionTemplate}
                style={{ width: "84px", height: "55px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
