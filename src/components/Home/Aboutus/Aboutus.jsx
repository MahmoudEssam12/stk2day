import React from "react";
import styles from "./Aboutus.module.scss";
import YouTube from "react-youtube";
import { useTranslation } from "next-i18next";

function Aboutus() {
  const { t } = useTranslation();
  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.col}>
        <h2>{t("home:about_us_title")}</h2>
        <p>{t("home:about_us")}</p>
      </div>
      <div className={styles.col}>
        <YouTube
          videoId="obox0tPZzF8"
          opts={opts}
          onReady={(e) => e.target.pauseVideo()}
        />
      </div>
    </div>
  );
}

export default Aboutus;
