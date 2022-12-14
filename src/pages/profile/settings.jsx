import React, { useState } from "react";
import { Chips } from "primereact/chips";
import inputStyles from "../../styles/Inputs.module.scss";
import { useRouter } from "next/router";
import { MainLayout } from "../../layout/mainLayout";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { useFormik } from "formik";
import * as yup from "yup";
import { InputText } from "primereact/inputtext";
import styles from "../../styles/Profile.module.scss";
import CustomButton from "../../components/CustomButton/CustomButton";
import { motion } from "framer-motion";
const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8}(\.[a-z]{2,8})?)$/;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "login",
        "footer",
        "navbar",
        "common",
        "profile",
      ])),
    },
  };
}

const options = [{ name: "vodafone cash" }, { name: "etisalat cash" }];

function Settings() {
  const [values2, setValues2] = useState([
    "dev.mahmoud.essam@gmail.com",
    "essamm65@yahoo.com",
  ]);
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);
  const [edit, setEdit] = useState(false);
  const validationSchema = yup.object({
    emails: yup.array(
      yup.string("").matches(emailRegex, t("common:email_check"))
    ),
    checked: yup.boolean(""),
    method: yup.object("").shape({
      name: yup.string(""),
    }),
    phonenumber: yup.string(""),
  });
  const formik = useFormik({
    initialValues: {
      emails: ["dev.mahmoud.essam@gmail.com", "essamm65@yahoo.com"],
      checked: false,
      method: { name: "vodafone cash" },
      phonenumber: "01149835766",
    },
    onSubmit: (values) => {
      console.log(values);
      setEdit(false);
    },
    validationSchema,
  });
  const router = useRouter();
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`c-container ${styles.settings} ${
        router.locale === "en" && styles.en
      }`}
    >
      <h1>{t("profile:settings_title")}</h1>
      <form onSubmit={formik.handleSubmit}>
        <span
          className={`p-float-label ${
            router.locale === "en" && "p-input-icon-left"
          } ${inputStyles.input_wrapper} ${styles.input} ${
            styles.input_settings
          }`}
        >
          <Chips
            value={formik.values.emails}
            onChange={formik.handleChange}
            separator=","
            name="emails"
            className={` ${styles.settings_input}`}
            disabled={edit ? false : true}
          />
          <label htmlFor="campaign">
            {t("profile:settings_emails_placeholder")}
          </label>

          {formik.errors.emails && formik.touched.emails && (
            <small id="emails-help" className="p-error block">
              {formik.errors.emails}
            </small>
          )}
        </span>
        <div className="field-checkbox">
          <Checkbox
            inputId="binary"
            checked={formik.values.checked}
            onChange={formik.handleChange}
            name="checked"
            className={styles.settings_checkbox}
            disabled={edit ? false : true}
          />
          <label htmlFor="binary">
            {t("profile:settings_emails_checkbox")}
          </label>
        </div>

        <span
          className={`p-float-label ${
            router.locale === "en" && "p-input-icon-left"
          } ${inputStyles.input_wrapper} ${styles.input} ${
            styles.settings_inputs
          }`}
        >
          <Dropdown
            value={formik.values.method}
            options={options}
            onChange={formik.handleChange}
            optionLabel="name"
            name="method"
            placeholder={t("profile:referral_campaign")}
            className={styles.state_list}
            // id="orderState"
            disabled={edit ? false : true}
          />
          <label htmlFor="orderState">
            {t("profile:settings_paying_method")}
          </label>

          {formik.errors.method && formik.touched.method && (
            <small id="method-help" className="p-error block">
              {formik.errors.method}
            </small>
          )}
        </span>

        <span
          className={`p-float-label ${
            router.locale === "en" && "p-input-icon-left"
          } ${inputStyles.input_wrapper} ${styles.input}`}
        >
          <InputText
            value={formik.values.phonenumber}
            onChange={formik.handleChange}
            name="phonenumber"
            className={styles.state_list}
            // id="orderState"
            disabled={edit ? false : true}
          />
          <label htmlFor="phonenumber">{t("profile:settings_vod_num")}</label>

          {formik.errors.phonenumber && formik.touched.phonenumber && (
            <small id="phonenumber-help" className="p-error block">
              {formik.errors.phonenumber}
            </small>
          )}
        </span>

        {edit ? (
          <CustomButton
            text={t("profile:save_change")}
            color="secondary-box"
            style={{
              width: "100%",
              padding: "1.5rem 0",
              backgroundColor: "#28a745",
              textTransform: "capitalize",
            }}
          />
        ) : (
          <button
            type="button"
            className={styles.edit_btn}
            onClick={() => setEdit(true)}
          >
            {t("profile:change_btn")}
          </button>
        )}
      </form>
    </motion.div>
  );
}

Settings.getLayout = function getLayout(page) {
  return (
    <MainLayout en="settings" ar="??????????????????">
      <ProfileSidebar>{page}</ProfileSidebar>
    </MainLayout>
  );
};

export default Settings;
