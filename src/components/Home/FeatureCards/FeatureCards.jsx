import React from "react";
import Card from "../FeatureCard/Card";
import { useTranslation } from "next-i18next";
import styles from "./FeatureCards.module.scss";
function FeatureCards() {
  const { t } = useTranslation();

  return (
    <section className={styles.feature_cards}>
      <Card text={t("home:shipping_feature")} />
      <Card image="/images/icon-2.png" text={t("common:storing_feature")} />
      <Card image="/images/icon-3.png" text={t("common:prices_feature")} />
      <Card image="/images/icon-4.png" text={t("common:payment_feature")} />
      <Card image="/images/icon-5.png" text={t("common:support_feature")} />
      <Card image="/images/icon-6.png" text={t("common:dashboard_feature")} />
      {/* <FeatureCard />
      <FeatureCard
        color="light_blue"
        image="/images/icon-2.png"
        text="خدمة تخزين وحماية 
المنتجات من التلف"
      />
      <FeatureCard
        color="dark_blue"
        image="/images/icon-3.png"
        text="نقدم لك منتجات كثيره باسعار ارخص من الجملة بخامه وجوده عالية"
      />
      <FeatureCard
        color="blue"
        image="/images/icon-4.png"
        text="استلام أرباحك بعد تسليم الأوردر مباشرة."
      />
      <FeatureCard
        color="orange"
        image="/images/icon-5.png"
        text="دعم فنى متواجد دائما للمتابعه معك"
      />
      <FeatureCard
        color="purple"
        image="/images/icon-6.png"
        text="نقدم لوحة مسوق متنوعة تقدر من خلالها تشاهد تقارير تفصيلية وأحدث طلبات الإحالة وملخص شهري، وإدارة الدفعات، وروابط احالة وسجل النقرات، والمزيد!"
      /> */}
    </section>
  );
}

export default FeatureCards;
