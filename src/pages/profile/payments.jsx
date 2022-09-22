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

const tableData = [
  {
    id: 1,
    orderNumber: "3037",
    date: "9/10/2022",
    status: "qulaified",
    productsCount: 4,
    products: [
      {
        id: 5,
        name: "شورت بحر وتر بروف",
        count: 2,
        price: 100,
        total_price: 200,
        commission: 50,
      },
      {
        id: 6,
        name: "شورت بحر ",
        count: 1,
        price: 100,
        total_price: 100,
        commission: 50,
      },
    ],
  },
  {
    id: 2,
    orderNumber: "3047",
    status: "rejected",
    productsCount: 1,
    date: "20/01/2022",
    products: [
      {
        id: 6,
        name: "شورت بحر ",
        count: 1,
        price: 100,
        total_price: 100,
        commission: 50,
      },
    ],
  },
  {
    id: 3,

    orderNumber: "3057",
    status: "shupped",
    productsCount: 2,
    date: "6/10/2022",
    products: [
      {
        id: 5,
        name: "شورت بحر وتر بروف",
        count: 2,
        price: 100,
        total_price: 200,
        commission: 50,
      },
      {
        id: 6,
        name: "شورت بحر ",
        count: 1,
        price: 100,
        total_price: 100,
        commission: 50,
      },
      {
        id: 7,
        name: "شورت  ",
        count: 3,
        price: 100,
        total_price: 300,
        commission: 50,
      },
    ],
  },
  {
    id: 4,
    orderNumber: "3077",
    status: "qulaified",
    productsCount: 10,
    date: "1/10/2022",
    products: [
      {
        id: 5,
        name: "شورت بحر وتر بروف",
        count: 2,
        price: 100,
        total_price: 200,
        commission: 50,
      },
      {
        id: 6,
        name: "شورت بحر ",
        count: 1,
        price: 100,
        total_price: 100,
        commission: 50,
      },
    ],
  },
];

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
        <ProfileTable data={tableData} />
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
