import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useFormik } from "formik";
import * as yup from "yup";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import FormsLayout from "../../layout/formsLayout";
import styles from "../../styles/Login.module.scss";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["login", "common"])),
    },
  };
}

const emailRegex =
  /(?:\d{11}|^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8}(\.[a-z]{2,8})?)$)/;

function Index() {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const validationSchema = yup.object({
    email: yup
      .string("")
      .matches(emailRegex, t("common:email_check"))
      .required(t("common:email_validation")),
    password: yup.string("").required(t("common:password_validation")),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (val) => {
      console.log("submitted");
      console.log(val);
    },
    validationSchema,
  });
  const [value3, setValue3] = useState("");
  return (
    <motion.div
      exit={{ opacity: 0, x: 20 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <Head>
        <meta
          name="description"
          content="صفحة تسجيل الدخول لموقع ستوك تو داي - stk2day"
        />
      </Head>

      <h1>{t("login:title")}</h1>
      <p>{t("login:info")}</p>

      <form
        onSubmit={formik.handleSubmit}
        className={`${styles.login_form} ${locale === "en" ? styles.en : " "}`}
      >
        <span
          className={`p-float-label ${locale === "en" && "p-input-icon-left"} ${
            styles.input_wrapper
          }`}
        >
          <i
            className={`pi pi-envelope ${styles.inputIcons} ${
              formik.errors.email &&
              formik.touched.email &&
              styles.invalid_color
            } ${locale === "en" ? styles.icon_en : ""}`}
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
            className={
              formik.errors.email &&
              formik.touched.email &&
              styles.invalid_color
            }
          >
            {t("login:email")}
          </label>

          {formik.errors.email && formik.touched.email && (
            <small id="email-help" className="p-error block">
              {formik.errors.email}
            </small>
          )}
        </span>

        <span
          className={`p-float-label ${locale === "en" && "p-input-icon-left"} ${
            styles.password
          } ${styles.input_wrapper}`}
        >
          <i
            className={`pi pi-lock ${styles.inputIcons} ${
              formik.errors.password &&
              formik.touched.password &&
              styles.invalid_color
            } ${locale === "en" ? styles.icon_en : ""}`}
          ></i>
          <Password
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
            style={{ width: "100%" }}
            className={`${
              formik.errors.password && formik.touched.password && "p-invalid"
            } ${locale === "en" ? styles.password_en : ""}`}
            feedback={false}
            toggleMask
          />
          <label
            htmlFor="password"
            className={
              formik.errors.password &&
              formik.touched.password &&
              styles.invalid_color
            }
          >
            {t("login:password")}
          </label>
          {formik.errors.password && formik.touched.password && (
            <small id="lastname-help" className="p-error block">
              {formik.errors.password}
            </small>
          )}
        </span>
        <Link href="/login/recoverpassword">{t("login:forget")}</Link>
        <CustomButton
          text={t("login:title")}
          color="secondary-box"
          style={{
            width: "100%",
            padding: "1.5rem 0",
            backgroundColor: "#e44c00",
            textTransform: "capitalize",
          }}
        />
        <div className={styles.register}>
          <span>
            {locale === "en" ? "You don't have account?" : " ليس لديك حساب؟"}
          </span>
          <Link href="/register">
            {locale === "en" ? "Create account" : "إنشاء حساب"}
          </Link>
        </div>
      </form>
    </motion.div>
  );
}

Index.getLayout = function getLayout(page) {
  return (
    <FormsLayout ar="تسجيل الدخول" en="Login">
      {page}
    </FormsLayout>
  );
};

export default Index;
