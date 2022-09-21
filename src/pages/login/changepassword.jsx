import React from "react";
import { Password } from "primereact/password";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useFormik } from "formik";
import * as yup from "yup";
import Head from "next/head";
import styles from "../../styles/Login.module.scss";
import { useRouter } from "next/router";
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
const validationSchema = yup.object({
  password: yup.string("").required("يجب إدخال كلمة المرور الجديدة!"),
  confirmpassword: yup.string("").when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("password")], "يجب أن تدخل نفس كلمة المرور مرة أخرى"),
  }),
});

function ChangePassword() {
  const { t } = useTranslation();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmpassword: "",
    },
    onSubmit: () => {
      console.log("submitted");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
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
      <h1>{t("login:restore_password_title")}</h1>
      <p>{t("login:change_password_info")}</p>

      <form
        onSubmit={formik.handleSubmit}
        className={`${styles.login_form} ${
          router.locale === "en" ? styles.en : " "
        }`}
      >
        <span
          className={`p-float-label  ${
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
            style={{
              color: formik.errors.password && formik.touched.password && "red",
            }}
          >
            {t("login:password")}
          </label>
          {formik.errors.password && formik.touched.password && (
            <small id="password-help" className="p-error block">
              {formik.errors.password}
            </small>
          )}
        </span>

        <span
          className={`p-float-label  ${
            router.locale === "en" && "p-input-icon-left"
          } ${styles.password} ${styles.input_wrapper}`}
        >
          <i
            className={`pi pi-lock ${styles.inputIcons} ${
              formik.errors.confirmpassword &&
              formik.touched.confirmpassword &&
              styles.invalid_color
            } ${router.locale === "en" ? styles.icon_en : ""}`}
          ></i>
          <Password
            value={formik.values.confirmpassword}
            onChange={formik.handleChange}
            name="confirmpassword"
            style={{ width: "100%" }}
            className={`${
              formik.errors.confirmpassword &&
              formik.touched.confirmpassword &&
              "p-invalid"
            } ${router.locale === "en" ? styles.password_en : ""}`}
            feedback={false}
            toggleMask
          />
          <label
            htmlFor="confirmpassword"
            style={{
              color:
                formik.errors.confirmpassword &&
                formik.touched.confirmpassword &&
                "red",
            }}
          >
            {t("login:confirm_password")}
          </label>
          {formik.errors.confirmpassword && formik.touched.confirmpassword && (
            <small id="confirmpassword-help" className="p-error block">
              {formik.errors.confirmpassword}
            </small>
          )}
        </span>
        <CustomButton
          text={t("login:submit")}
          color="secondary-box"
          style={{
            width: "100%",
            padding: "1.5rem 0",
            backgroundColor: "#e44c00",
          }}
        />
      </form>
    </motion.div>
  );
}
ChangePassword.getLayout = function getLayout(page) {
  return (
    <FormsLayout ar="تغيير كلمة المرور" en="Change Password">
      {page}
    </FormsLayout>
  );
};
export default ChangePassword;
