import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useFormik, Formik } from "formik";
import * as yup from "yup";
import Head from "next/head";
import Link from "next/link";
import FormsLayout from "../../layout/formsLayout";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/Login.module.scss";
import registerStyles from "../../styles/Register.module.scss";
import Step2 from "../../components/Register/Step2";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import useMultiStepForm from "../../utilities/useMultiStepForm";
import Step1 from "../../components/Register/Step1";
import { useEffect } from "react";
import { Button } from "primereact/button";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["register", "common"])),
    },
  };
}
const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8}(\.[a-z]{2,8})?)$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

function Register2() {
  const { t } = useTranslation();
  const router = useRouter();
  const [initialValues, setInitialValues] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    mobilenumber: "",
    password: "",
    websiteLink: "",
    method: "",
    foundusfrom: [],
    conditions: false,
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validationSchema = yup.object({
    firstname: yup.string("").required(t("register:firstname_validation")),
    lastname: yup.string("").required(t("register:lastname_validation")),
    username: yup.string("").required(t("register:username_validation")),
    email: yup
      .string("")
      .matches(emailRegex, t("common:email_check"))
      .required(t("common:email_validation")),
    mobilenumber: yup
      .string("")
      // .matches(/^[0-9]{11}$/, "أدخل رقم هاتف صحيح")
      .min(8)
      .required(t("register:number_validation")),
    password: yup
      .string("")
      .matches(passwordRegex, t("common:password_validation"))
      .required(t("common:password_validation")),
    websiteLink: yup
      .string("")
      .url(t("common:register_websiteLink"))
      .nullable(),
    method: yup.string("").required(t("register:promote_validation")),
    foundusfrom: yup
      .array()
      .min(1, t("register:options_validation"))
      // .oneOf(convertObjects(options), "إختر إختيار او أكثر أين سمعت عنا؟")
      .required(t("register:options_validation")),
    conditions: yup.bool().oneOf([true], t("register:terms_validation")),
  });
  const testRegex = (name, value) => {
    if (name === "email") {
      return emailRegex.test(value);
    }
    if (name === "password") {
      return passwordRegex.test(value);
    }
  };

  const passwordRegexTest = (regex) => {
    return regex.test(initialValues.password);
  };

  const validate = (name, value) => {
    switch (name) {
      case "firstname":
        if (value.length < 1) {
          setErrors((prev) => {
            return { ...prev, [name]: t("register:firstname_validation") };
          });
        } else {
          setErrors((prev) => {
            let obj = { ...prev };
            delete obj.firstname;
            return obj;
          });
        }
        break;
      case "lastname":
        if (value.length < 1) {
          setErrors((prev) => {
            return { ...prev, [name]: t("register:lastname_validation") };
          });
        } else {
          setErrors((prev) => {
            let obj = { ...prev };
            delete obj.lastname;
            return obj;
          });
        }
        break;
      case "username":
        if (value.length < 3) {
          setErrors((prev) => {
            return { ...prev, [name]: t("register:username_validation") };
          });
        } else {
          setErrors((prev) => {
            let obj = { ...prev };
            delete obj.username;
            return obj;
          });
        }
        break;
      case "email":
        if (!testRegex("email", value) && value.length < 1) {
          setErrors((prev) => {
            return { ...prev, [name]: t("common:email_check") };
          });
        } else {
          setErrors((prev) => {
            let obj = { ...prev };
            delete obj.email;
            return obj;
          });
        }
        break;
      case "mobilenumber":
        if (value.length < 3) {
          setErrors((prev) => {
            return { ...prev, [name]: t("register:number_validation") };
          });
        } else {
          setErrors((prev) => {
            let obj = { ...prev };
            delete obj.mobilenumber;
            return obj;
          });
        }
        break;
      case "password":
        if (!testRegex("password", value) && value.length < 1) {
          setErrors((prev) => {
            return { ...prev, [name]: t("common:password_validation") };
          });
        } else {
          setErrors((prev) => {
            let obj = { ...prev };
            delete obj.password;
            return obj;
          });
        }
        break;
      case "method":
        if (value.length < 3) {
          setErrors((prev) => {
            return { ...prev, [name]: t("register:promote_validation") };
          });
        } else {
          setErrors((prev) => {
            let obj = { ...prev };
            delete obj.method;
            return obj;
          });
        }
        break;
      case "foundusfrom":
        if (value.length < 1) {
          setErrors((prev) => {
            return { ...prev, [name]: t("register:options_validation") };
          });
        } else {
          setErrors((prev) => {
            let obj = { ...prev };
            delete obj.foundusfrom;
            return obj;
          });
        }
        break;
      case "conditions":
        if (value !== true) {
          setErrors((prev) => {
            return { ...prev, [name]: t("register:terms_validation") };
          });
        } else {
          setErrors((prev) => {
            let obj = { ...prev };
            delete obj.conditions;
            return obj;
          });
        }
        break;

      default:
        break;
    }
    // if(name )
  };

  // const [errors, setErrors] = useState({});

  const inputChange = (e) => {
    const inputName = e.target.name;
    if (inputName === "foundusfrom") {
      setInitialValues((prev) => {
        const arr = [...prev.foundusfrom];
        if (e.target.checked) {
          arr.push(e.target.value);
        } else {
          arr.splice(arr.indexOf(e.target.value), 1);
        }
        return { ...prev, foundusfrom: arr };
      });
    } else {
      setInitialValues((prev) => {
        if (inputName === "conditions") {
          return { ...prev, [inputName]: e.checked };
        }
        return { ...prev, [inputName]: e.target.value };
      });
    }

    if (inputName === "conditions") {
      validate(inputName, e.checked);
    } else {
      validate(inputName, e.target.value);
    }

    if (!Object.keys(errors).length) {
      setIsValid(true);
    }
  };
  const footer = () => {
    let upperCaseValid = passwordRegexTest(/[A-Z]{1}/);
    let lowerCaseValid = passwordRegexTest(/[a-z]{1}/);
    let numericValid = passwordRegexTest(/[0-9]{1}/);
    let valid = testRegex("password", initialValues.password);
    return (
      <React.Fragment>
        <Divider />
        <p className="mt-2">{t("common:password_template")}</p>
        <ul
          className="pl-2 ml-2 mt-0 password-footer"
          style={{ lineHeight: "1.5" }}
        >
          <li style={{ color: lowerCaseValid ? "green" : "black" }}>
            {t("common:lowercase_validation")}
          </li>
          <li style={{ color: upperCaseValid ? "green" : "black" }}>
            {t("common:uppercase_validation")}
          </li>
          <li style={{ color: numericValid ? "green" : "black" }}>
            {t("common:numeric_validation")}
          </li>
          <li style={{ color: valid ? "green" : "black" }}>
            {t("common:minimum_validation")}
          </li>
        </ul>
      </React.Fragment>
    );
  };
  const { steps, step, currentStepIndex, next, back } = useMultiStepForm(
    [
      <Step1
        key={1}
        values={initialValues}
        errors={errors}
        handleChange={inputChange}
        validate={validate}
        footer={footer}
      />,
      <Step2
        key={2}
        handleChange={inputChange}
        handleErrors={errors}
        handleValues={initialValues}
        valid={setIsValid}
      />,
    ],
    initialValues
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let prop in initialValues) {
      validate(prop, initialValues[prop]);
    }
    if (isValid) {
      console.log(initialValues);
      console.log("submitted");
    } else {
      console.log("error");
      console.log(errors);
    }
  };

  // useEffect(() => {
  //   if (Object.keys(errors).length) {
  //     setIsValid(false);
  //   } else {
  //     setIsValid(true);
  //   }
  // }, [errors]);
  useEffect(() => {
    setIsValid(false);
  }, []);
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

      <h1>{t("register:title")}</h1>
      <p>{t("register:register_info")}</p>
      {currentStepIndex === 1 && (
        <Button
          icon="pi pi-arrow-left"
          className="p-button-rounded p-button-warning"
          aria-label="Notification"
          onClick={back}
          style={{ background: "#f65200" }}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepIndex}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <form
            onSubmit={handleSubmit}
            className={`${styles.login_form} ${
              router.locale === "en" ? styles.en : " "
            }`}
          >
            {step}
            {currentStepIndex === 0 && (
              <CustomButton
                text={t("register:register_continue")}
                color="secondary-box"
                style={{
                  width: "100%",
                  padding: "1.5rem 0",
                  backgroundColor: "#e44c00",
                }}
                type="button"
                click={() => {
                  const obj = Object.fromEntries(
                    Object.entries(initialValues).slice(0, 6)
                  );
                  for (let field in obj) {
                    validate(field, initialValues[field]);
                  }
                  if (!Object.keys(errors).length) {
                    setIsValid(true);
                  }
                  if (isValid) {
                    next();
                  }
                }}
              />
            )}
          </form>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

Register2.getLayout = function getLayout(page) {
  return (
    <FormsLayout en="Register" ar="إنشاء حساب">
      {page}
    </FormsLayout>
  );
};

export default Register2;
