import { useRouter } from "next/router";
import React, { useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import VerificationInput from "../../components/VerificationInput/VerificationInput";
import FormsLayout from "../../layout/formsLayout";
import { motion } from "framer-motion";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["login"])),
    },
  };
}

function Verification() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <motion.div
      exit={{ opacity: 0, x: 20 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <h1>{t("login:code_entering")}</h1>
      <VerificationInput
        length={6}
        label={t("login:code_entering_info")}
        loading={loading}
        onComplete={(code) => {
          setLoading(true);
          console.log(code);
          setTimeout(() => setLoading(false), 10000);
        }}
      />
      <CustomButton
        text={t("login:submit")}
        color="secondary-box"
        style={{
          width: "100%",
          padding: "1.5rem 0",
          backgroundColor: "#e44c00",
        }}
        click={() => router.push("/login/changepassword")}
      />
    </motion.div>
  );
}
Verification.getLayout = function getLayout(page) {
  return (
    <FormsLayout ar="إدخال الكود" en="Code Entering">
      {page}
    </FormsLayout>
  );
};
export default Verification;
