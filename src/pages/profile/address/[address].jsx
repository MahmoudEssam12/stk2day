import React from "react";
import ProfileSidebar from "../../../components/ProfileSidebar/ProfileSidebar";
import { MainLayout } from "../../../layout/mainLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import * as yup from "yup";
import { Dropdown } from "primereact/dropdown";
import Head from "next/head";
import CustomButton from "../../../components/CustomButton/CustomButton";
import inputStyles from "../../../styles/Inputs.module.scss";
import styles from "../../../styles/Profile.module.scss";
import governorates from "./../../../../public/static/eg-governorates.json";
import { motion } from "framer-motion";
export async function getStaticPaths() {
  return {
    paths: [
      { params: { address: "shippingaddress" } },
      { params: { address: "billingaddress" } },
    ],
    fallback: true,
  };
}

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

function AddressBill() {
  const router = useRouter();
  const { address } = router.query;
  const { t } = useTranslation();
  const validationSchema = yup.object({
    name: yup.string("").required(t("common:general_validation")),
    country: yup
      .object()
      .shape({
        name: yup.string(""),
        code: yup.string(""),
      })
      .required(t("common:general_validation")),
    gov: yup
      .object()
      .shape({
        id: yup.string(""),
        governorate_name_ar: yup.string(""),
        governorate_name_en: yup.string(""),
      })
      .required(t("common:general_validation")),
    phonenumber: yup.string("").required(t("common:general_validation")),
    zipcode: yup.string("").required(t("common:general_validation")),
    companyname: yup.string("").required(t("common:general_validation")),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      country: "",
      gov: "",
      phonenumber: "",
      zipcode: "",
      companyname: "",
    },
    onSubmit: (value) => {
      console.log(value);
    },
    validationSchema,
  });

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <section className={styles.address_bills}>
        <Head>
          <title>
            {router.locale === "en"
              ? `Stk2day - Address`
              : `العنوان - ستوك تو داي `}
          </title>
        </Head>
        {address === "shippingaddress" ? (
          router.locale === "en" ? (
            <h1>Shipping Address</h1>
          ) : (
            <h1>عنوان الشحن</h1>
          )
        ) : address === "billingaddress" && router.locale === "en" ? (
          <h1>Billing Address</h1>
        ) : (
          <h1>عنوان الفاتورة</h1>
        )}
        <form onSubmit={formik.handleSubmit} className="">
          <span
            className={`p-float-label ${
              router.locale === "en" && "p-input-icon-left"
            } ${inputStyles.input_wrapper} ${styles.input}`}
          >
            <InputText
              value={formik.values.name}
              onChange={formik.handleChange}
              name="name"
              id="name"
              className={
                formik.errors.name && formik.touched.name && "p-invalid"
              }
            />
            <label htmlFor="name">{t("common:name")}</label>

            {formik.errors.name && formik.touched.name && (
              <small id="name-help" className="p-error block">
                {formik.errors.name}
              </small>
            )}
          </span>
          <span
            className={`p-float-label ${
              router.locale === "en" && "p-input-icon-left"
            } ${inputStyles.input_wrapper} ${styles.input}`}
          >
            {/* <InputText
            value={formik.values.country}
            onChange={formik.handleChange}
            name="country"
            id="country"
            className={
              formik.errors.country && formik.touched.country && "p-invalid"
            }
          /> */}
            <Dropdown
              value={formik.values.country}
              options={[
                { name: "Egypt", code: "eg" },
                { name: "United Arabs Emirates", code: "uae" },
              ]}
              onChange={formik.handleChange}
              optionLabel="name"
              name="country"
              id="country"
              className={styles.state_list}
            />
            <label htmlFor="country">{t("common:country")}</label>

            {formik.errors.country && formik.touched.country && (
              <small id="country-help" className="p-error block">
                {formik.errors.country}
              </small>
            )}
          </span>
          <span
            className={`p-float-label ${
              router.locale === "en" && "p-input-icon-left"
            } ${inputStyles.input_wrapper} ${styles.input}`}
          >
            <Dropdown
              value={formik.values.gov}
              options={governorates}
              onChange={formik.handleChange}
              optionLabel="governorate_name_ar"
              name="gov"
              id="gov"
              className={styles.state_list}
            />
            <label htmlFor="gov">{t("common:gov")}</label>

            {formik.errors.gov && formik.touched.gov && (
              <small id="gov-help" className="p-error block">
                {formik.errors.gov}
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
              id="phonenumber"
              className={
                formik.errors.phonenumber &&
                formik.touched.phonenumber &&
                "p-invalid"
              }
            />
            <label htmlFor="phonenumber">{t("common:phonenumber")}</label>

            {formik.errors.phonenumber && formik.touched.phonenumber && (
              <small id="gov-help" className="p-error block">
                {formik.errors.phonenumber}
              </small>
            )}
          </span>
          <span
            className={`p-float-label ${
              router.locale === "en" && "p-input-icon-left"
            } ${inputStyles.input_wrapper} ${styles.input}`}
          >
            <InputText
              value={formik.values.zipcode}
              onChange={formik.handleChange}
              name="zipcode"
              id="zipcode"
              className={
                formik.errors.zipcode && formik.touched.zipcode && "p-invalid"
              }
            />
            <label htmlFor="zipcode">{t("common:zipcode")}</label>

            {formik.errors.zipcode && formik.touched.zipcode && (
              <small id="gov-help" className="p-error block">
                {formik.errors.zipcode}
              </small>
            )}
          </span>
          <span
            className={`p-float-label ${
              router.locale === "en" && "p-input-icon-left"
            } ${inputStyles.input_wrapper} ${styles.input}`}
          >
            <InputText
              value={formik.values.companyname}
              onChange={formik.handleChange}
              name="companyname"
              id="companyname"
              className={
                formik.errors.companyname &&
                formik.touched.companyname &&
                "p-invalid"
              }
            />
            <label htmlFor="companyname">{t("common:companyname")}</label>

            {formik.errors.companyname && formik.touched.companyname && (
              <small id="gov-help" className="p-error block">
                {formik.errors.companyname}
              </small>
            )}
          </span>

          <CustomButton
            text={t("common:save")}
            color="secondary-box"
            style={{
              padding: "1rem 0",
              backgroundColor: "var(--secondary-color)",
              textTransform: "capitalize",
              maxHeight: "60px",
              width: "100%",
            }}
          />
        </form>
      </section>
    </motion.div>
  );
}

AddressBill.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <ProfileSidebar>{page}</ProfileSidebar>
    </MainLayout>
  );
};
export default AddressBill;
