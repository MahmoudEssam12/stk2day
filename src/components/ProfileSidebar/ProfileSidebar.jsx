import React, { useState } from "react";
import styles from "./ProfileSidebar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

function ProfileSidebar({ children }) {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const links = [
    { name: t("profile:account"), href: "/profile" },
    { name: t("profile:dashboard"), href: "/profile/dashboard" },
    { name: t("profile:orders"), href: "/profile/orders" },
    { name: t("profile:address"), href: "/profile/address" },
    { name: t("profile:settings"), href: "/profile/settings" },
    { name: t("profile:statistics"), href: "/profile/statistics" },
    { name: t("profile:payments"), href: "/profile/payments" },
    { name: t("profile:referral_link"), href: "/profile/referrallink" },
  ];
  return (
    <div className={`c-container ${styles.profile_wrapper}`}>
      <nav className={styles.sidebar}>
        <button
          className={styles.links_button}
          onClick={() => setVisible((prev) => !prev)}
        >
          {t("profile:profile_pages")}
        </button>
        <div className={`${styles.links} ${visible && styles.visible}`}>
          {links.map((link, i) => (
            <Link href={`${link.href}`} passHref key={i}>
              <a
                className={
                  router.pathname === link.href ? styles.link_active : " "
                }
              >
                {link.name}
              </a>
            </Link>
          ))}

          <button>{t("profile:logout")}</button>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}

export default ProfileSidebar;
