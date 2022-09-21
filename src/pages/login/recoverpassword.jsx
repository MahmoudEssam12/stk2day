import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useFormik } from "formik";
import * as yup from "yup";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Login.module.scss";
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
const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8}(\.[a-z]{2,8})?)$/;

const validationSchema = yup.object({
  email: yup
    .string("")
    .matches(emailRegex, "أدخل البريد الإلكتروني الخاص بك بشكل صحيح")
    .required("يجب إدخال البريد الإلكتروني!"),
});

function RecoverPassword() {
  const { t } = useTranslation();
  const [recoverd, setRecoverd] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      console.log("submitted", values.email);
      setRecoverd(true);
      //it should not route to the verification page
      // email sent to the user's mail should has a link
      // will redirect him to the /login/verification
      setTimeout(() => {
        router.push("/login/verification");
      }, 3000);
    },
    validationSchema,
  });
  return (
    <>
      <Head>
        <meta
          name="description"
          content="استعادة كلمة المرور لموقع ستوك تو داي - stk2day"
        />
      </Head>
      <h1>{t("login:restore_password_title")}</h1>
      {recoverd ? (
        <motion.div
          exit={{ opacity: 0, x: 100 }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <p style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <i
              className="pi pi-check-circle"
              style={{ color: "green", marginTop: "5px" }}
            ></i>
            {t("login:restore_msg")}
          </p>
        </motion.div>
      ) : (
        <motion.div
          exit={{ opacity: 0, x: 100 }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ width: "100%" }}
        >
          <p>{t("login:restore_msg")}</p>
          <form
            onSubmit={formik.handleSubmit}
            className={`${styles.login_form} ${
              router.locale === "en" ? styles.en : " "
            }`}
          >
            <span
              className={`p-float-label ${
                router.locale === "en" && "p-input-icon-left"
              } ${styles.input_wrapper}`}
            >
              <i
                className={`pi pi-envelope ${styles.inputIcons} ${
                  formik.errors.email &&
                  formik.touched.email &&
                  styles.invalid_color
                } ${router.locale === "en" ? styles.icon_en : ""}`}
              ></i>
              <InputText
                value={formik.values.email}
                onChange={formik.handleChange}
                name="email"
                className={
                  formik.errors.email && formik.touched.email && "p-invalid"
                }
              />
              <label
                htmlFor="email"
                style={{
                  color: formik.errors.email && formik.touched.email && "red",
                }}
              >
                {t("login:restore_email")}
              </label>
              {formik.errors.email && formik.touched.email && (
                <small id="lastname-help" className="p-error block">
                  {formik.errors.email}
                </small>
              )}
            </span>

            <CustomButton
              text={t("login:send_code")}
              color="secondary-box"
              style={{
                width: "100%",
                padding: "1.5rem 0",
                backgroundColor: "#e44c00",
              }}
            />
            <div className={styles.register}>
              <span>{router.locale === "en" ? "Return " : "العودة"}</span>
              <Link href="/login">
                {router.locale === "en" ? "to login ?" : "لتسجيل الدخول؟"}
              </Link>
            </div>
          </form>
        </motion.div>
      )}
    </>
  );
}

RecoverPassword.getLayout = function getLayout(page) {
  return (
    <FormsLayout ar="إستعادة كلمة المرور" en="Password Recovery">
      {page}
    </FormsLayout>
  );
};

export default RecoverPassword;
