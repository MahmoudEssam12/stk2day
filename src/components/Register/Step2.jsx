import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import CustomButton from "../CustomButton/CustomButton";
import { useFormik } from "formik";
import * as yup from "yup";
import Link from "next/link";
import { Checkbox } from "primereact/checkbox";
import { Ripple } from "primereact/ripple";
import styles from "../../styles/Login.module.scss";
import registerStyles from "../../styles/Register.module.scss";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

// checking i'm on server or client
const isSSR = () => typeof window === "undefined";

// function to convert objects inside arr into arr of string values
function convertObjects(arr) {
  let arrayOfStrings = [];
  arr.forEach((obj) => {
    arrayOfStrings.push(obj.value);
  });
  return arrayOfStrings;
}

// regex for url validation
const urlRegex =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\\=]*)/;

function Step2({ handleChange, valid, handleErrors, handleValues }) {
  const router = useRouter();
  const { t } = useTranslation();
  const options = [
    { value: t("register:register_option1") },
    { value: t("register:register_option2") },
    { value: t("register:register_option3") },
  ];

  // t("common:register_websiteLink");
  //validation schema
  // const validationSchema = yup.object({
  //   websiteLink: yup
  //     .string("")
  //     .url(t("common:register_websiteLink"))
  //     .nullable(),
  //   method: yup.string("").required(t("register:promote_validation")),
  //   foundusfrom: yup
  //     .array()
  //     .min(1, t("register:options_validation"))
  //     // .oneOf(convertObjects(options), "إختر إختيار او أكثر أين سمعت عنا؟")
  //     .required(t("register:options_validation")),
  //   conditions: yup.bool().oneOf([true], t("register:terms_validation")),
  // });
  // const formik = useFormik({
  //   initialValues: {
  //     websiteLink: "",
  //     method: "",
  //     foundusfrom: [],
  //     conditions: false,
  //   },
  //   onSubmit: (val) => {
  //     console.log("submitted");
  //     console.log(val);
  //     router.push("/register/verification");
  //   },

  //   validationSchema,
  // });
  useEffect(() => {
    valid(false);
  }, []);

  return (
    <>
      <span
        className={`p-float-label ${
          router.locale === "en" && "p-input-icon-left"
        } ${styles.input_wrapper}`}
      >
        <i
          className={`pi pi-question ${styles.inputIcons} ${
            handleErrors.websiteLink && styles.invalid_color
          } ${router.locale === "en" ? styles.icon_en : ""}`}
        ></i>
        <InputText
          value={handleValues.websiteLink}
          onChange={handleChange}
          name="websiteLink"
          className={handleErrors.websiteLink && "p-invalid"}
        />
        <label
          htmlFor="websiteLink"
          className={handleErrors.websiteLink && styles.invalid_color}
        >
          {t("register:register_link")}
        </label>

        {handleErrors.websiteLink && (
          <small id="websiteLink-help" className="p-error block">
            {handleErrors.websiteLink}
          </small>
        )}
      </span>

      <span
        className={`p-float-label ${
          router.locale === "en" && "p-input-icon-left"
        } ${styles.input_wrapper}`}
      >
        <i
          className={`pi pi-question ${styles.inputIcons} ${
            handleErrors.method && styles.invalid_color
          } ${router.locale === "en" ? styles.icon_en : ""}`}
        ></i>
        <InputText
          value={handleValues.method}
          onChange={handleChange}
          name="method"
          className={handleErrors.method && "p-invalid"}
        />
        <label
          htmlFor="method"
          className={handleErrors.method && styles.invalid_color}
        >
          {t("register:register_promote")}
        </label>

        {handleErrors.method && (
          <small id="method-help" className="p-error block">
            {handleErrors.method}
          </small>
        )}
      </span>
      <div className={"p-float-label" + " " + styles.input_wrapper}>
        <p className={registerStyles.foundusfrom}>
          <i className="pi pi-question"></i> {t("register:register_foundus")}
        </p>
        <div
          role="group"
          className={registerStyles.checkboxs_wrapper}
          aria-labelledby="checkbox-group"
        >
          {options.map((option) => (
            <div key={option.value} className={registerStyles.checkbox_wrapper}>
              <input
                type="checkbox"
                name="foundusfrom"
                onChange={handleChange}
                value={option.value}
                id={option.value}
                checked={handleValues.foundusfrom.indexOf(option.value) !== -1}
              />
              <label
                htmlFor={option.value}
                className={
                  handleErrors.foundusfrom ? registerStyles.invalid_border : " "
                }
                style={{
                  padding: "2rem 0.5rem",
                  textAlign: "center",
                  lineHeight: "1.4",
                }}
              >
                {option.value}
                {!isSSR() && <Ripple />}
              </label>
            </div>
          ))}
        </div>
        {handleErrors.foundusfrom && (
          <small id="method-help" className="p-error block">
            {handleErrors.foundusfrom}
          </small>
        )}
      </div>
      <div className="field-checkbox">
        <Checkbox
          inputId="conditions"
          checked={handleValues.conditions}
          onChange={handleChange}
          name="conditions"
          style={{
            marginLeft: router.locale === "en" ? "0" : "10px",
            marginRight: router.locale === "en" ? "10px" : "0",
          }}
        />
        <label htmlFor="conditions">{t("register:register_terms")}</label>
        {handleErrors.conditions && (
          <small
            id="method-help"
            className="p-error block"
            style={{ display: "block", marginTop: "1rem" }}
          >
            {handleErrors.conditions}
          </small>
        )}
      </div>
      <CustomButton
        text={router.locale === "en" ? "Create Account" : "إنشاء حساب"}
        color="secondary-box"
        style={{
          width: "100%",
          padding: "1.5rem 0",
          backgroundColor: "#e44c00",
        }}
      />
      <div className={styles.register}>
        <span>
          {router.locale === "en" ? "you have account? " : "لديك حساب؟ "}
        </span>
        <Link href="/login">
          {router.locale === "en" ? "Login" : "تسجيل الدخول"}
        </Link>
      </div>
    </>
  );
}

export default Step2;
