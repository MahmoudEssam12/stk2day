import React from "react";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import { MainLayout } from "../../layout/mainLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import styles from "../../styles/Profile.module.scss";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "login",
        "footer",
        "navbar",
        "common",
        "profile",
      ])),
    },
  };
}

function Dashboard() {
  const { t } = useTranslation();

  return (
    <section className={styles.wrapper}>
      <h3>
        {t("profile:dashboard_hello")} <span>Ahmed</span>
      </h3>
      <p style={{ marginTop: "2rem", marginBottom: "1rem" }}>
        {t("profile:dashboard_info")}
      </p>
    </section>
  );
}
Dashboard.getLayout = function getlayout(page) {
  return (
    <MainLayout en="Dashboard" ar="لوحة التحكم">
      <ProfileSidebar>{page}</ProfileSidebar>
    </MainLayout>
  );
};
export default Dashboard;
