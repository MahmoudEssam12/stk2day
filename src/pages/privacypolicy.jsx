import React from "react";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import styles from "../styles/Privacypolicy.module.scss";
import { MainLayout } from "../layout/mainLayout";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "privacypolicy",
        "footer",
        "navbar",
      ])),
    },
  };
}
function PrivacyPolicy() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();
  const { locale } = useRouter();
  return (
    <motion.div
      exit={{ opacity: 0, y: 20 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`c-container ${styles.main}`}
    >
      <h1>{t("privacypolicy:title")}</h1>
      <section>
        <h4>{t("privacypolicy:comments")}</h4>
        <p>{t("privacypolicy:comments_policy")}</p>
      </section>
      <section>
        <h4>{t("privacypolicy:media")}</h4>
        <p>{t("privacypolicy:media_policy")}</p>
      </section>
      <section>
        <h4>{t("privacypolicy:cookies")}</h4>
        <p>{t("privacypolicy:cookies_policy")}</p>
      </section>
      <section>
        <h4>{t("privacypolicy:embedded_content")}</h4>
        <p>{t("privacypolicy:embedded_content_policy")}</p>
      </section>
      <section>
        <h4>{t("privacypolicy:data_sharing")}</h4>
        <p>{t("privacypolicy:data_sharing_policy")}</p>
      </section>
      <section>
        <h4>{t("privacypolicy:data_keeping")}</h4>
        <p>{t("privacypolicy:data_keeping_policy")}</p>
      </section>
      <section>
        <h4>{t("privacypolicy:user_rights")}</h4>
        <p>{t("privacypolicy:user_rights_policy")}</p>
      </section>
    </motion.div>
  );
}
PrivacyPolicy.getLayout = function getLayout(page) {
  return (
    <MainLayout en="Privacy Policy" ar="سياسة الخصوصية">
      {page}
    </MainLayout>
  );
};
export default PrivacyPolicy;
