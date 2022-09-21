import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import styles from "../styles/Privacypolicy.module.scss";
import { MainLayout } from "../layout/mainLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "returnpolicy",
        "footer",
        "navbar",
      ])),
    },
  };
}
function ReturnPolicy() {
  const { locale } = useRouter();
  const { t } = useTranslation();

  return (
    <motion.div
      exit={{ opacity: 0, x: 100 }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className={`c-container ${styles.main}`}
    >
      <h1>{t("returnpolicy:title")}</h1>
      <p>{t("returnpolicy:policy_info")}</p>
      <section>
        <h4>{t("returnpolicy:note")}</h4>
        <p>{t("returnpolicy:note_info")}</p>
      </section>
      <section>
        <h4>{t("returnpolicy:terms_title")}</h4>
        {locale === "en" ? (
          <ul>
            <li>There is a manufacturer defect or damaged product</li>
            <li>Attach the original invoice</li>
            <li>
              The product must be in its original condition, unopened and unused
            </li>
            <li>
              Availability of all accessories belonging to the original product,
              if any.
            </li>
            <li>
              You can apply for replacement / return through your account on the
              site through requests. Wishing you a pleasant shopping experience!
            </li>
          </ul>
        ) : (
          <ul>
            <li>وجود عيب مصنعي أو منتج تالف</li>
            <li>إرفاق الفاتورة الأصلية</li>
            <li>أن يكون المنتج مغلف بحالته الأصلية غير مفتوح وغير مستخدم</li>
            <li>وافر جميع الملحقات التابعة للمنتج الأصل ان وجدت.</li>
            <li>
              مكنك التقدم بطلب الإستبدال / الإسترجاع عبر حسابكم بالموقع عن طريق
              الطلبات . مع تمنياتنا بتجربة تسوق ممتعة!
            </li>
          </ul>
        )}
      </section>
    </motion.div>
  );
}
ReturnPolicy.getLayout = function getLayout(page) {
  return (
    <MainLayout en="Return Policy" ar="سياسة الإسترجاع">
      {page}
    </MainLayout>
  );
};
export default ReturnPolicy;
