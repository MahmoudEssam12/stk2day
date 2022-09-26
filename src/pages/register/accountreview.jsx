import React from "react";
import Head from "next/head";
import FormsLayout from "../../layout/formsLayout";
import { motion } from "framer-motion";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["register"])),
    },
  };
}
function AccountReview() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <motion.div
      exit={{ opacity: 0, x: 20 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <h1>{t("register:account_review_title")}</h1>
      <p style={{ marginBottom: "4rem" }}>
        {t("register:account_review_info")}
      </p>
      <div className="img_wrapper">
        <picture>
          <img src="/images/accountreview.png" alt="ستوك تو داي - stk2day" />
        </picture>
        {/* <picture>
          <img src="/images/clock.png" alt="stk2day - ستوك تو داي " />
        </picture> */}
      </div>
    </motion.div>
  );
}
AccountReview.getLayout = function getLayout(page) {
  return (
    <FormsLayout ar="مراجعة الحساب" en="Account Review">
      {page}
    </FormsLayout>
  );
};

export default AccountReview;
