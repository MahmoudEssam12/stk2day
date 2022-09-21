import Link from "next/link";
import React from "react";
import style from "./Footer.module.scss";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

function Footer() {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const copyrights =
    locale === "en"
      ? `Copyright © ${new Date().getFullYear()} All rights reserved to STK2Day`
      : `حقوق الطبع والنشر © ${new Date().getFullYear()} جميع الحقوق محفوظة لـ STK2Day`;
  return (
    <footer className="footer_container">
      <div className={style.footer__content}>
        <div className={style.col}>
          <Link href="/">
            <picture>
              <img src="/images/logo.png" alt="stk2day" />
            </picture>
          </Link>
          <p>{t("footer:about_us")}</p>
        </div>
        <div className={style.col}>
          <h5>{t("footer:help")}</h5>
          <ul className={style.links}>
            <li>
              <Link href="/returnpolicy">{t("footer:return_policy")}</Link>
            </li>
            <li>
              <Link href="/privacypolicy">{t("footer:privacy_policy")}</Link>
            </li>
          </ul>
        </div>
        <div className={style.col}>
          <h5>{t("footer:contact_us")}</h5>
          <ul>
            <li>
              <i className="pi pi-facebook"></i>
              @STK2DAY1
            </li>
            <li className={style.mail}>
              <i className="pi pi-envelope"></i>
              <a href="mailto:stk2day1@yahoo.com">STK2DAY1@Yahoo.com</a>
            </li>
            <li>
              <i className="pi pi-phone"></i>
              +2012358992
            </li>
            <li>
              <i className="pi pi-phone"></i>
              +1235478952
            </li>
          </ul>
        </div>
      </div>
      <div className={style.copyright}>{copyrights}</div>
    </footer>
  );
}

export default Footer;
