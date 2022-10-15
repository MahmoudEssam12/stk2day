import React from "react";
import Link from "next/link";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import CustomButton from "../CustomButton/CustomButton";
import { useRouter } from "next/router";
import registerStyles from "../../styles/Register.module.scss";
import { useTranslation } from "next-i18next";
import styles from "../../styles/Login.module.scss";

function Step1({ values, errors, validate, handleChange, footer }) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <>
      <div className="names_wrapper">
        <span
          className={`p-float-label ${
            router.locale === "en" && "p-input-icon-left"
          } input_wrapper`}
        >
          <i
            className={`pi pi-user "inputIcons" ${
              errors.firstname && "invalid_color"
            } ${router.locale === "en" ? "icon_en" : ""}`}
          ></i>
          <InputText
            value={values.firstname}
            onChange={handleChange}
            onKeyUp={(e) => validate(e.target.name, e.target.value)}
            name="firstname"
            className={errors.firstname && "p-invalid"}
          />
          <label
            htmlFor="firstname"
            className={errors.firstname && "invalid_color"}
          >
            {t("register:register_firstname")}
          </label>
          {errors.firstname && (
            <small id="firstname-help" className="p-error block">
              {errors.firstname}
            </small>
          )}
        </span>
        <span
          className={`p-float-label ${
            router.locale === "en" && "p-input-icon-left"
          } input_wrapper`}
        >
          <i
            className={`pi pi-user inputIcons ${
              errors.lastname && "invalid_color"
            } ${router.locale === "en" ? "icon_en" : ""}`}
          ></i>
          <InputText
            value={values.lastname}
            onChange={handleChange}
            onKeyUp={(e) => validate(e.target.name, e.target.value)}
            name="lastname"
            className={errors.lastname && "p-invalid"}
          />
          <label
            htmlFor="lastname"
            className={errors.lastname && "invalid_color"}
          >
            {t("register:register_lastname")}
          </label>
          {errors.lastname && (
            <small id="lastname-help" className="p-error block">
              {errors.lastname}
            </small>
          )}
        </span>
      </div>

      <span
        className={`p-float-label ${
          router.locale === "en" && "p-input-icon-left"
        } ${"input_wrapper"}`}
      >
        <i
          className={`pi pi-user inputIcons ${
            errors.username && "invalid_color"
          } ${router.locale === "en" ? "icon_en" : ""}`}
        ></i>
        <InputText
          value={values.username}
          onChange={handleChange}
          onKeyUp={(e) => validate(e.target.name, e.target.value)}
          name="username"
          className={errors.username && "p-invalid"}
        />
        <label
          htmlFor="username"
          className={errors.username && "invalid_color"}
        >
          {t("register:register_username")}
        </label>
        {errors.username && (
          <small id="email-help" className="p-error block">
            {errors.username}
          </small>
        )}
      </span>

      <span
        className={`p-float-label ${
          router.locale === "en" && "p-input-icon-left"
        } password input_wrapper`}
      >
        <i
          className={`pi pi-envelope inputIcons ${
            errors.email && "invalid_color"
          } ${router.locale === "en" ? "icon_en" : ""}`}
        ></i>
        <InputText
          value={values.email}
          onChange={handleChange}
          //   onKeyUp={(e) => validate(e.target.name, e.target.value)}
          name="email"
          className={errors.email && "p-invalid"}
        />
        <label htmlFor="email" className={errors.email && "invalid_color"}>
          {t("register:register_email")}
        </label>
        {errors.email && (
          <small id="email-help" className="p-error block">
            {errors.email}
          </small>
        )}
      </span>
      {/* mobile number inputs */}
      <div className={"number_wrapper"}>
        {/* <DropdownList /> */}
        <span
          className={`p-float-label ${
            router.locale === "en" && "p-input-icon-left"
          } password input_wrapper`}
          style={{ width: "100%" }}
        >
          <i
            className={`pi pi-mobile inputIcons ${
              errors.mobilenumber && "invalid_color"
            } ${router.locale === "en" ? "icon_en" : ""}`}
          ></i>
          <InputText
            value={values.mobilenumber}
            onChange={handleChange}
            onKeyUp={(e) => validate(e.target.name, e.target.value)}
            name="mobilenumber"
            className={errors.mobilenumber && "p-invalid"}
          />
          <label
            htmlFor="mobilenumber"
            className={errors.mobilenumber && "invalid_color"}
          >
            {t("register:register_number")}
          </label>
          {errors.mobilenumber && (
            <small id="mobilenumber-help" className="p-error block">
              {errors.mobilenumber}
            </small>
          )}
        </span>
      </div>

      <span
        className={`p-float-label ${
          router.locale === "en" && "p-input-icon-left"
        } password input_wrapper`}
      >
        <i
          className={`pi pi-lock inputIcons ${
            errors.password && "invalid_color"
          } ${router.locale === "en" ? "icon_en" : ""}`}
        ></i>
        <Password
          value={values.password}
          onChange={handleChange}
          onKeyUp={(e) => validate(e.target.name, e.target.value)}
          name="password"
          style={{ width: "100%" }}
          className={`${errors.password && "p-invalid"} ${
            router.locale === "en" ? "password_en" : ""
          }`}
          footer={footer}
          toggleMask
        />
        <label
          htmlFor="password"
          className={errors.password && "invalid_color"}
        >
          {t("register:register_password")}
        </label>
        {errors.password && (
          <small id="password-help" className="p-error block">
            {errors.password}
          </small>
        )}
      </span>
      {/* <CustomButton
        text={t("register:register_continue")}
        color="secondary-box"
        style={{
          width: "100%",
          padding: "1.5rem 0",
          backgroundColor: "#e44c00",
        }}
        type="button"
      /> */}

      <div className={"register"}>
        <span>
          {router.locale === "en" ? "you have account? " : "لديك حساب؟ "}
        </span>
        <Link href="/login">
          {router.locale === "en" ? "Login" : "تسجيل الدخول"}
        </Link>
      </div>

      <style jsx>
        {`
          .names_wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;

            span {
              width: 45%;
              gap: 1rem;
            }

            @media (max-width: 500px) {
              span {
                width: 100%;
              }
            }
          }

          .foundusfrom {
            background-color: #f6f6f6;
            padding: 1rem;
            border-radius: 8px;
            border: 1px solid #dadada;

            i {
              display: inline-block;
              margin-left: 5px;
            }
          }

          .selectButton {
            display: flex;
            justify-content: space-between;
            gap: 1rem;

            div {
              border: 1px solid #dadada !important;
              border-radius: 8px !important;
              background-color: #f6f6f6 !important;
              color: #03014c;
              font-weight: normal !important;
            }

            & > [class~="p-highlight"] {
              background-color: #fadbcc !important;
              color: #03014c;
            }

            & > [class~="p-focus"] {
              box-shadow: 0 0 0 2px #ffff, 0 0 0 4px #fadbcc, 0 1px 2px 0 black;
            }
          }

          .option {
            // background-color: #f6f6f6;
          }

          .checkboxs_wrapper {
            display: flex;
            justify-content: space-between;
            margin: 2rem 0 1rem;
            flex-wrap: wrap;
            gap: 1rem;

            input {
              display: none;
            }

            label {
              position: relative;
              pointer-events: all;
              display: block;
              width: 100%;
              height: 100%;
              padding: 2rem;
              word-wrap: anywhere;
              border-radius: 8px;
              background-color: #f6f6f6;
              transition: all 0.3s ease;
              right: unset;
              top: unset;
              cursor: pointer;
            }

            .invalid_border {
              color: var(--invalid-color);
            }

            input:checked ~ label {
              background-color: #fadbcc;
            }

            .checkbox_wrapper {
              overflow: hidden;
              border-radius: 8px;
              width: calc(400px / 3);
            }
          }
          .login_form {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin: 2rem 0;
            padding-left: 1rem;
          }

          input {
            width: 100%;
            margin-top: 0 !important;
            background-color: #f6f6f6;
            padding-right: 2.3rem;
            padding-left: 2.3rem;

            &:focus {
              background-color: #fff;
            }
          }

          label {
            right: 40px;
            top: 22px;
            color: #03014c;
            text-transform: capitalize;
          }

          .inputIcons {
            position: absolute;
            top: 13px;
            right: 14px;
            left: unset;
            z-index: 1;
            cursor: auto;
            pointer-events: none;
          }

          .password {
            .inputIcons {
              position: absolute;
              top: 15px;
              right: 14px;
              left: unset;
              z-index: 1;
            }

            .icon_en {
              left: 14px;
              right: unset;
              top: 22px;
            }
          }

          .icon_en {
            left: 14px;
            right: unset;
            top: 22px;
          }

          a {
            margin-top: -15px;
            text-align: left;
            color: var(--secondary-color);
            text-transform: capitalize;
          }

          .register {
            text-align: center;
            color: #263238;

            a:hover {
              color: #bb3e00;
            }
          }

          .password {
            i {
              top: 39%;
              left: 25px;
              right: unset;
              cursor: pointer;
            }
          }

          .password_en {
            i {
              right: 25px;
              left: unset;
            }
          }

          .input_wrapper {
            margin: 12px 0;
          }

          .invalid_color {
            color: var(--invalid-color);
          }

          .login_form.en {
            padding-left: 0;
            padding-right: 1rem;
          }
          @media (max-width: 970px) {
            .col:last-child {
              width: 30%;
            }

            .col:first-child {
              width: 70%;
            }

            .login_form {
              padding: 0;
            }

            .login_form.en {
              padding: 0;
            }
          }

          @media (max-width: 768px) {
            .login_wrapper {
              flex-wrap: wrap;
            }

            .col:last-child {
              width: 100%;
              order: 1;
            }

            .col:first-child {
              order: 2;
              justify-content: flex-start;
              width: 100%;
            }
          }
          .password-footer li {
            transition: all 0.6s ease;
          }
        `}
      </style>
    </>
  );
}

export default Step1;
