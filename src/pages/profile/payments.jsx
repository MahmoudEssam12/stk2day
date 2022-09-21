import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import styles from "../../styles/Profile.module.scss";
import ProfileTable from "../../components/ProfileTable/ProfileTable";
import { MainLayout } from "../../layout/mainLayout";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
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

function Payments() {
  const { t } = useTranslation();

  return (
    <div className={styles.payments}>
      <div>
        <p>
          {" "}
          {t("profile:unpaid_commission")}:<span>0 </span>{" "}
          <span className="currency">جنية</span>
        </p>
        <p>
          {" "}
          {t("profile:pending_batch")}:<span>0 </span>{" "}
          <span className="currency">جنية</span>
        </p>
        <p>{t("profile:empty_commission")}</p>
        <h2>{t("profile:completed_payments")}</h2>
        <ProfileTable />
      </div>
    </div>
  );
}

Payments.getLayout = function getLayout(page) {
  return (
    <MainLayout en="Payments" ar="المدفوعات">
      <ProfileSidebar>{page}</ProfileSidebar>
    </MainLayout>
  );
};

export default Payments;
