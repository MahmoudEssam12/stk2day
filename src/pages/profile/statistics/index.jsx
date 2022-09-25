import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import styles from "../../../styles/Profile.module.scss";
import StatisticCard from "../../../components/StatsticCard/StatisticCard";
import { MainLayout } from "../../../layout/mainLayout";
import ProfileSidebar from "../../../components/ProfileSidebar/ProfileSidebar";
import { Chart } from "primereact/chart";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
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
const getPreviousDate = (days, month) => {
  const today = new Date();
  const previousMonth = new Date(new Date().setDate(today.getDate() - month));
  const opt = {
    day: "numeric",
    month: "long",
  };

  const next5Days = new Date(
    previousMonth.setDate(previousMonth.getDate() + days)
  );
  return next5Days.toLocaleDateString("default", opt);
};
function Statistics() {
  const { t } = useTranslation();

  const data1 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: t("profile:all"),
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "#4bc0c0",
        tension: 0.4,
      },
    ],
  };

  const data2 = {
    labels: [
      getPreviousDate(0, 30),
      getPreviousDate(5, 30),
      getPreviousDate(10, 30),
      getPreviousDate(15, 30),
      getPreviousDate(20, 30),
      getPreviousDate(25, 30),
      getPreviousDate(30, 30),
    ],
    datasets: [
      {
        label: t("profile:month"),
        data: [28, 48, 40, 19, 86, 27, 50],
        fill: false,
        borderColor: "#565656",
        tension: 0.4,
      },
    ],
  };
  const data3 = {
    labels: [
      getPreviousDate(0, 7),
      getPreviousDate(1, 7),
      getPreviousDate(2, 7),
      getPreviousDate(3, 7),
      getPreviousDate(4, 7),
      getPreviousDate(5, 7),
      getPreviousDate(6, 7),
    ],
    datasets: [
      {
        label: t("profile:week"),
        data: [20, 40, 30, 45, 50, 55, 40],
        fill: false,
        borderColor: "#4bc0c0",
        tension: 0.4,
      },
    ],
  };

  const tabs = [
    {
      name: t("profile:all"),
      profit: "2000",
      total_discounts: "0",
      total_sales: "3000",
      data: data1,
    },
    {
      name: t("profile:month"),
      profit: "1000",
      total_discounts: "0",
      total_sales: "1200",
      data: data2,
    },
    {
      name: t("profile:week"),
      profit: "500",
      total_discounts: "0",
      total_sales: "750",
      data: data3,
    },
  ];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <section className={styles.statistics}>
        <h3>بيانات الكود</h3>
        <div className={styles.statistics_cards_wrapper}>
          <StatisticCard
            headerText={t("profile:commission")}
            description="من 10 لـ 50 جنيه حسب كل المنتج."
          />
          <StatisticCard headerText={t("profile:coupon")} description="3" />
          <StatisticCard
            headerText={t("profile:discount")}
            description="0 جنية"
          />
        </div>
        <ul>
          {tabs.map((tab) => (
            <li
              key={tab.name}
              className={selectedTab.name === tab.name ? styles.selected : ""}
              onClick={() => setSelectedTab(tab)}
            >
              {" "}
              {tab.name}
            </li>
          ))}
        </ul>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.name : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {selectedTab.name === t("profile:all") ? (
              <>
                <div className={styles.statistics_cards_wrapper}>
                  <StatisticCard
                    headerText={t("profile:profit")}
                    description={selectedTab.profit}
                  />
                  <StatisticCard
                    headerText={t("profile:total_discounts")}
                    description={selectedTab.total_discounts}
                  />
                  <StatisticCard
                    headerText={t("profile:total_sales")}
                    description={selectedTab.total_sales}
                  />{" "}
                </div>
                <Chart type="line" data={selectedTab.data} />
              </>
            ) : selectedTab.name === t("profile:month") ? (
              <>
                <div className={styles.statistics_cards_wrapper}>
                  <StatisticCard
                    headerText={t("profile:profit")}
                    description={selectedTab.profit}
                  />
                  <StatisticCard
                    headerText={t("profile:total_discounts")}
                    description={selectedTab.total_discounts}
                  />
                  <StatisticCard
                    headerText={t("profile:total_sales")}
                    description={selectedTab.total_sales}
                  />{" "}
                </div>
                <Chart type="line" data={selectedTab.data} />
              </>
            ) : (
              <>
                <div className={styles.statistics_cards_wrapper}>
                  <StatisticCard
                    headerText={t("profile:profit")}
                    description={selectedTab.profit}
                  />
                  <StatisticCard
                    headerText={t("profile:total_discounts")}
                    description={selectedTab.total_discounts}
                  />
                  <StatisticCard
                    headerText={t("profile:total_sales")}
                    description={selectedTab.total_sales}
                  />{" "}
                </div>
                <Chart type="line" data={selectedTab.data} />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </motion.div>
  );
}
Statistics.getLayout = function getLayout(page) {
  return (
    <MainLayout en="Statistics" ar="الإحصائيات">
      <ProfileSidebar>{page}</ProfileSidebar>
    </MainLayout>
  );
};
export default Statistics;
