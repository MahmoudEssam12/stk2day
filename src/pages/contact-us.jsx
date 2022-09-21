import React from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import CustomButton from "../components/CustomButton/CustomButton";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import { MainLayout } from "../layout/mainLayout";
import styles from "../styles/Contactus.module.scss";
import inputStyles from "../styles/Inputs.module.scss";
import { useRouter } from "next/router";
import Head from "next/head";
import { motion } from "framer-motion";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8}(\.[a-z]{2,8})?)$/;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "contactus",
        "footer",
        "navbar",
        "common",
      ])),
    },
  };
}
function ContactUs() {
  const { t } = useTranslation();
  const router = useRouter();
  const validationSchema = yup.object({
    username: yup.string("").required(t("contactus:username_validation")),
    email: yup
      .string("")
      .matches(emailRegex, t("common:email_validation"))
      .required(t("common:email_validation")),
    message: yup.string("").min(20).required(t("contactus:msg_validation")),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      message: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema,
  });
  return (
    <motion.div
      exit={{ opacity: 0, y: 100 }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className={`c-container ${styles.contactus}`}
    >
      <section className={styles.col}>
        <form
          onSubmit={formik.handleSubmit}
          className={inputStyles.form_styles}
        >
          <span
            className={`p-float-label  ${
              router.locale === "en" && "p-input-icon-left"
            } ${inputStyles.input_wrapper}`}
          >
            <i
              className={`pi pi-user ${inputStyles.inputIcons} ${
                router.locale === "en" ? inputStyles.icon_en : ""
              }`}
            ></i>
            <InputText
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            <label htmlFor="username">{t("contactus:username")}</label>
            {formik.errors.username && formik.touched.username && (
              <small id="username-help" className="p-error block">
                {formik.errors.username}
              </small>
            )}
          </span>
          <span
            className={`p-float-label ${
              router.locale === "en" && "p-input-icon-left"
            } ${inputStyles.input_wrapper}`}
          >
            <i
              className={`pi pi-envelope ${inputStyles.inputIcons} ${
                router.locale === "en" ? inputStyles.icon_en : ""
              }`}
            ></i>
            <InputText
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <label htmlFor="email">{t("contactus:email")}</label>
            {formik.errors.email && formik.touched.email && (
              <small id="email-help" className="p-error block">
                {formik.errors.email}
              </small>
            )}
          </span>
          <span
            className={`p-float-label ${
              router.locale === "en" && "p-input-icon-left"
            } ${inputStyles.input_wrapper}`}
          >
            <FontAwesomeIcon
              icon={faCommentDots}
              className={`${inputStyles.inputIcons} ${
                router.locale === "en" ? inputStyles.icon_en : ""
              }`}
            />
            {/* <i
              className={`fa-regular fa-comment-dots  ${
                inputStyles.inputIcons
              } ${router.locale === "en" ? inputStyles.icon_en : ""}`}
            ></i> */}
            <InputTextarea
              value={formik.values.message}
              onChange={formik.handleChange}
              id="message"
              // className={`p-float-label ${inputStyles.input_wrapper}`}
              rows={5}
              cols={30}
              autoResize
            />
            <label htmlFor="message">{t("contactus:msg")}</label>
            {formik.errors.message && formik.touched.message && (
              <small id="message-help" className="p-error block">
                {formik.errors.message}
              </small>
            )}
          </span>
          <CustomButton
            text={t("contactus:send_btn")}
            color="secondary-box"
            style={{
              width: "100%",
              padding: "1.5rem 0",
              backgroundColor: "#e44c00",
              textTransform: "capitalize",
            }}
          />
        </form>
      </section>
      <section
        style={{ backgroundImage: `url(/images/contact-bg.png)` }}
        className={styles.col}
      >
        <div className={styles.contact_info_wrapper}>
          <h1>{t("contactus:title")}</h1>
          <p>{t("contactus:info")}</p>
          <ul>
            <li>
              <i
                className={`pi pi-facebook ${
                  router.locale === "en" ? styles.en : " "
                }`}
              ></i>
              @STK2DAY1
            </li>
            <li className={styles.mail}>
              <i
                className={`pi pi-envelope ${
                  router.locale === "en" ? styles.en : " "
                }`}
              ></i>
              <a href="mailto:stk2day1@yahoo.com">STK2DAY1@Yahoo.com</a>
            </li>
            <li>
              <i
                className={`pi pi-phone ${
                  router.locale === "en" ? styles.en : " "
                }`}
              ></i>
              +2012358992
            </li>
            <li>
              <i
                className={`pi pi-phone ${
                  router.locale === "en" ? styles.en : " "
                }`}
              ></i>
              +1235478952
            </li>
          </ul>
        </div>
      </section>
    </motion.div>
  );
}
ContactUs.getLayout = function getLayout(page) {
  return (
    <MainLayout en="Contact us" ar="إتصل بنا">
      {page}
    </MainLayout>
  );
};
export default ContactUs;
