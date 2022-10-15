import React, { useEffect } from "react";
import HeaderText from "./HeaderText/HeaderText";
import Aboutus from "./Aboutus/Aboutus";
import ProductsGrid from "./ProductsGrid/ProductsGrid";
import FeatureCards from "./FeatureCards/FeatureCards";
import { useTranslation } from "next-i18next";
import Header from "./Header/Header";

import QA from "./QA/QA";
import { useRouter } from "next/router";
function Home() {
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation();

  let greeting =
    locale === "en-US"
      ? "Create unique world as marketer"
      : locale == "ar-EG"
      ? "اصنع لك عالم مميز كمسوق"
      : "";

  return (
    <main>
      <div className="c-container">
        {/* <Header /> */}
        {/* <HeaderText mainHeader={t("common:main_text")} /> */}
        <ProductsGrid />
      </div>
      <Aboutus />
      <div className="c-container">
        <HeaderText mainHeader={t("common:features")} />
        <FeatureCards />
        <HeaderText mainHeader={t("common:common_qa")} />
        <QA />
      </div>
      {/* <HeaderText subHeader="تسوق الأن" mainHeader="أشتري الأن ما تريد" />
      <CategoriesSection /> */}
    </main>
  );
}

export default Home;
