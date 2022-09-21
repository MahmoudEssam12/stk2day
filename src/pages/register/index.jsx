import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useFormik } from "formik";
import * as yup from "yup";
import Head from "next/head";
import Link from "next/link";
import DropdownList from "../../components/DropdownList/DropdownList";
import FormsLayout from "../../layout/formsLayout";
import { motion } from "framer-motion";
import styles from "../../styles/Login.module.scss";
import registerStyles from "../../styles/Register.module.scss";
import Step2 from "../../components/Register/Step2";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["register", "common"])),
    },
  };
}
const footer = (
  <React.Fragment>
    <Divider />
    <p className="mt-2">Suggestions</p>
    <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
      <li>At least one lowercase</li>
      <li>At least one uppercase</li>
      <li>At least one numeric</li>
      <li>Minimum 8 characters</li>
    </ul>
  </React.Fragment>
);

const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8}(\.[a-z]{2,8})?)$/;
const password =
  /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})./;

function Register() {
  const { t } = useTranslation();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const validationSchema = yup.object({
    firstname: yup.string("").required(t("register:firstname_validation")),
    lastname: yup.string("").required(t("register:lastname_validation")),
    username: yup.string("").required(t("register:username_validation")),
    email: yup
      .string("")
      .matches(emailRegex, t("common:email_validation"))
      .required(t("common:email_validation")),
    mobilenumber: yup
      .string("")
      // .matches(/^[0-9]{11}$/, "أدخل رقم هاتف صحيح")
      .min(8)
      .required(t("register:number_validation")),
    password: yup
      .string("")
      .min(8, t("common:password_validation"))
      .required(t("common:password_validation")),
  });
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      mobilenumber: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("submitted");
      console.log(values);
      setStep(2);
    },
    validationSchema,
  });
  return (
    <motion.div
      exit={{ opacity: 0, x: 100 }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <Head>
        <meta
          name="description"
          content="صفحة تسجيل الدخول لموقع ستوك تو داي - stk2day"
        />
      </Head>

      <h1>{t("register:title")}</h1>
      <p>{t("register:register_info")}</p>
      {step === 1 ? (
        <form
          onSubmit={formik.handleSubmit}
          className={`${styles.login_form} ${
            router.locale === "en" ? styles.en : " "
          }`}
        >
          <div className={registerStyles.names_wrapper}>
            <span
              className={`p-float-label ${
                router.locale === "en" && "p-input-icon-left"
              } ${styles.input_wrapper}`}
            >
              <i
                className={`pi pi-user ${styles.inputIcons} ${
                  formik.errors.firstname &&
                  formik.touched.firstname &&
                  styles.invalid_color
                } ${router.locale === "en" ? styles.icon_en : ""}`}
              ></i>
              <InputText
                value={formik.values.firstname}
                onChange={formik.handleChange}
                name="firstname"
                className={
                  formik.errors.firstname &&
                  formik.touched.firstname &&
                  "p-invalid"
                }
              />
              <label
                htmlFor="firstname"
                className={
                  formik.errors.firstname &&
                  formik.touched.firstname &&
                  styles.invalid_color
                }
              >
                {t("register:register_firstname")}
              </label>
              {formik.errors.firstname && formik.touched.firstname && (
                <small id="firstname-help" className="p-error block">
                  {formik.errors.firstname}
                </small>
              )}
            </span>
            <span
              className={`p-float-label ${
                router.locale === "en" && "p-input-icon-left"
              } ${styles.input_wrapper}`}
            >
              <i
                className={`pi pi-user ${styles.inputIcons} ${
                  formik.errors.lastname &&
                  formik.touched.lastname &&
                  styles.invalid_color
                } ${router.locale === "en" ? styles.icon_en : ""}`}
              ></i>
              <InputText
                value={formik.values.lastname}
                onChange={formik.handleChange}
                name="lastname"
                className={
                  formik.errors.lastname &&
                  formik.touched.lastname &&
                  "p-invalid"
                }
              />
              <label
                htmlFor="lastname"
                className={
                  formik.errors.lastname &&
                  formik.touched.lastname &&
                  styles.invalid_color
                }
              >
                {t("register:register_lastname")}
              </label>
              {formik.errors.lastname && formik.touched.lastname && (
                <small id="lastname-help" className="p-error block">
                  {formik.errors.lastname}
                </small>
              )}
            </span>
          </div>

          <span
            className={`p-float-label ${
              router.locale === "en" && "p-input-icon-left"
            } ${styles.input_wrapper}`}
          >
            <i
              className={`pi pi-user ${styles.inputIcons} ${
                formik.errors.username &&
                formik.touched.username &&
                styles.invalid_color
              } ${router.locale === "en" ? styles.icon_en : ""}`}
            ></i>
            <InputText
              value={formik.values.username}
              onChange={formik.handleChange}
              name="username"
              className={
                formik.errors.username && formik.touched.username && "p-invalid"
              }
            />
            <label
              htmlFor="username"
              className={
                formik.errors.username &&
                formik.touched.username &&
                styles.invalid_color
              }
            >
              {t("register:register_username")}
            </label>
            {formik.errors.username && formik.touched.username && (
              <small id="email-help" className="p-error block">
                {formik.errors.username}
              </small>
            )}
          </span>

          <span
            className={`p-float-label ${
              router.locale === "en" && "p-input-icon-left"
            } ${styles.password} ${styles.input_wrapper}`}
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
              className={
                formik.errors.email &&
                formik.touched.email &&
                styles.invalid_color
              }
            >
              {t("register:register_email")}
            </label>
            {formik.errors.email && formik.touched.email && (
              <small id="email-help" className="p-error block">
                {formik.errors.email}
              </small>
            )}
          </span>
          {/* mobile number inputs */}
          <div className={registerStyles.number_wrapper}>
            {/* <DropdownList /> */}
            <span
              className={`p-float-label ${
                router.locale === "en" && "p-input-icon-left"
              } ${styles.password} ${styles.input_wrapper}`}
              style={{ width: "100%" }}
            >
              <i
                className={`pi pi-mobile ${styles.inputIcons} ${
                  formik.errors.mobilenumber &&
                  formik.touched.mobilenumber &&
                  styles.invalid_color
                } ${router.locale === "en" ? styles.icon_en : ""}`}
              ></i>
              <InputText
                value={formik.values.mobilenumber}
                onChange={formik.handleChange}
                name="mobilenumber"
                className={
                  formik.errors.mobilenumber &&
                  formik.touched.mobilenumber &&
                  "p-invalid"
                }
              />
              <label
                htmlFor="mobilenumber"
                className={
                  formik.errors.mobilenumber &&
                  formik.touched.mobilenumber &&
                  styles.invalid_color
                }
              >
                {t("register:register_number")}
              </label>
              {formik.errors.mobilenumber && formik.touched.mobilenumber && (
                <small id="mobilenumber-help" className="p-error block">
                  {formik.errors.mobilenumber}
                </small>
              )}
            </span>
          </div>

          <span
            className={`p-float-label ${
              router.locale === "en" && "p-input-icon-left"
            } ${styles.password} ${styles.input_wrapper}`}
          >
            <i
              className={`pi pi-lock ${styles.inputIcons} ${
                formik.errors.password &&
                formik.touched.password &&
                styles.invalid_color
              } ${router.locale === "en" ? styles.icon_en : ""}`}
            ></i>
            <Password
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              style={{ width: "100%" }}
              className={`${
                formik.errors.password && formik.touched.password && "p-invalid"
              } ${router.locale === "en" ? styles.password_en : ""}`}
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
              {t("register:register_password")}
            </label>
            {formik.errors.password && formik.touched.password && (
              <small id="password-help" className="p-error block">
                {formik.errors.password}
              </small>
            )}
          </span>
          <CustomButton
            text={t("register:register_continue")}
            color="secondary-box"
            style={{
              width: "100%",
              padding: "1.5rem 0",
              backgroundColor: "#e44c00",
            }}
            type="submit"
          />

          <div className={styles.register}>
            <span>
              {router.locale === "en" ? "you have account? " : "لديك حساب؟ "}
            </span>
            <Link href="/login">
              {router.locale === "en" ? "Login" : "تسجيل الدخول"}
            </Link>
          </div>
        </form>
      ) : step === 2 ? (
        <Step2 />
      ) : (
        ""
      )}
    </motion.div>
  );
}

Register.getLayout = function getLayout(page) {
  return (
    <FormsLayout en="Register" ar="إنشاء حساب">
      {page}
    </FormsLayout>
  );
};

export default Register;
