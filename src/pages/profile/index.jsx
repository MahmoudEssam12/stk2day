import React, { useState } from "react";
import { useRouter } from "next/router";
import { InputText } from "primereact/inputtext";
import { MainLayout } from "../../layout/mainLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "../../styles/Profile.module.scss";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import { Avatar } from "primereact/avatar";
import { useTranslation } from "next-i18next";
import CustomButton from "../../components/CustomButton/CustomButton";
import inputStyles from "../../styles/Inputs.module.scss";
import { Password } from "primereact/password";
import { motion } from "framer-motion";

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

const emailRegex =
  /(?:\d{11}|^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8}(\.[a-z]{2,8})?)$)/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const validationSchema = yup.object({
  email: yup
    .string("")
    .matches(emailRegex, "أدخل إيميل أو رقم الهاتف الخاص بك بشكل صحيح")
    .required("يجب إدخال الإيميل أو رقم الهاتف"),
  password: yup.string(""),
  username: yup.string("").required("لايمكن ان تترك اسم المستخدمم فارغ"),
  name: yup.string("").required("لايمكن ان تترك الإسم فارغ"),
  mobileNumber: yup.string("").required("لايمكن ان تترك الرقم فارغ"),
  newPassword: yup
    .string("")
    .matches(
      passwordRegex,
      "كلمة المرور يجب انت تتكون من حرف كبير و صغير و رقم ولا تقل عن 8 احرف"
    ),
  confirmNewPassword: yup.string("").when("newPassword", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup
      .string("")
      .oneOf(
        [yup.ref("newPassword")],
        "you should enter the new password again"
      )
      .required("you should enter the new password again"),
  }),
});

function Profile() {
  const { t } = useTranslation();
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [edit, setEdit] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  };

  const formik = useFormik({
    initialValues: {
      email: "ahmedmousa@yahoo.com",
      username: "marwan785",
      name: "marwan mousa",
      mobileNumber: "01149835766",
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    onSubmit: (val) => {
      setFormData(val);
      console.log("submitted");
      console.log(val);
      setEdit(false);
    },
    validationSchema,
  });
  return (
    <motion.div
      exit={{ opacity: 0, y: 20 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <section className={styles.wrapper}>
        <form
          onSubmit={formik.handleSubmit}
          className={inputStyles.form_styles}
        >
          <div className={styles.avatar_wrapper}>
            <div className={styles.avatar_image}>
              <Avatar
                image={imageUrl}
                icon="pi pi-user"
                className="mr-2"
                size="xlarge"
                shape="circle"
              />

              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                name="imagePicker"
                id="imagepicker"
                disabled={edit ? false : true}
              />
              <label htmlFor="imagepicker">
                {" "}
                <i className="pi pi-user-edit"></i>
              </label>
            </div>

            <span
              className={`p-float-label ${
                router.locale === "en" && "p-input-icon-left"
              } ${inputStyles.input_wrapper} ${styles.input}`}
            >
              <i
                className={`pi pi-user ${inputStyles.inputIcons} ${
                  router.locale === "en" ? inputStyles.icon_en : ""
                }`}
              ></i>
              <InputText
                value={formik.values.name}
                onChange={formik.handleChange}
                name="name"
                id="name"
                className={
                  formik.errors.name && formik.touched.name && "p-invalid"
                }
                disabled={edit ? false : true}
              />
              <label htmlFor="name">{t("profile:name_label")}</label>

              {formik.errors.name && formik.touched.name && (
                <small id="name-help" className="p-error block">
                  {formik.errors.name}
                </small>
              )}
            </span>
          </div>
          {/* after avatar */}
          <div className={styles.divider}></div>
          <span
            className={`p-float-label ${
              router.locale === "en" && "p-input-icon-left"
            } ${inputStyles.input_wrapper} ${styles.input}`}
          >
            <i
              className={`pi pi-user ${inputStyles.inputIcons} ${
                router.locale === "en" ? inputStyles.icon_en : ""
              }`}
            ></i>
            <InputText
              value={formik.values.username}
              onChange={formik.handleChange}
              name="username"
              id="username"
              className={
                formik.errors.username && formik.touched.username && "p-invalid"
              }
              disabled={edit ? false : true}
            />
            <label htmlFor="username">{t("profile:username_label")}</label>

            {formik.errors.username && formik.touched.username && (
              <small id="username-help" className="p-error block">
                {formik.errors.username}
              </small>
            )}
          </span>
          <span
            className={`p-float-label ${
              router.locale === "en" && "p-input-icon-left"
            } ${inputStyles.input_wrapper} ${styles.input}`}
          >
            <i
              className={`pi pi-envelope ${inputStyles.inputIcons} ${
                router.locale === "en" ? inputStyles.icon_en : ""
              }`}
            ></i>
            <InputText
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
              id="email"
              className={
                formik.errors.email && formik.touched.email && "p-invalid"
              }
              disabled={edit ? false : true}
            />
            <label htmlFor="email">{t("profile:email_label")}</label>

            {formik.errors.email && formik.touched.email ? (
              <small id="email-help" className="p-error block">
                {formik.errors.email}
              </small>
            ) : (
              ""
            )}
          </span>
          <span
            className={`p-float-label ${
              router.locale === "en" && "p-input-icon-left"
            } ${inputStyles.input_wrapper} ${styles.input} `}
          >
            <i
              className={`pi pi-envelope ${inputStyles.inputIcons} ${
                router.locale === "en" ? inputStyles.icon_en : ""
              }`}
            ></i>
            <InputText
              value={formik.values.mobileNumber}
              onChange={formik.handleChange}
              name="mobileNumber"
              id="mobileNumber"
              className={
                formik.errors.mobileNumber &&
                formik.touched.email &&
                "p-invalid"
              }
              disabled={edit ? false : true}
            />
            <label htmlFor="mobileNumber">{t("profile:phone_label")}</label>

            {formik.errors.mobileNumber && formik.touched.mobileNumber ? (
              <small id="email-help" className="p-error block">
                {formik.errors.mobileNumber}
              </small>
            ) : (
              ""
            )}
          </span>
          <span
            className={`p-float-label ${
              router.locale === "en" && "p-input-icon-left"
            } ${inputStyles.input_wrapper} ${styles.input}  ${
              !edit && styles.disabled_input
            }`}
          >
            <i
              className={`pi pi-lock ${inputStyles.inputIcons} ${
                router.locale === "en" ? inputStyles.icon_en : ""
              }`}
            ></i>
            <Password
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              id="password"
              className={`${
                formik.errors.password && formik.touched.password && "p-invalid"
              }
                ${router.locale !== "en" ? styles.password_ar : ""}
                `}
              style={{ width: "100%" }}
              disabled={edit ? false : true}
              toggleMask
              feedback={false}
            />
            <label htmlFor="email">{t("profile:password_label")}</label>

            {formik.errors.password && formik.touched.password ? (
              <small id="email-help" className="p-error block">
                {formik.errors.password}
              </small>
            ) : (
              ""
            )}
          </span>
          <span
            className={`p-float-label ${
              router.locale === "en" && "p-input-icon-left"
            } ${inputStyles.input_wrapper} ${styles.input} ${
              !edit && styles.disabled_input
            }`}
          >
            <i
              className={`pi pi-lock ${inputStyles.inputIcons} ${
                router.locale === "en" ? inputStyles.icon_en : ""
              }`}
            ></i>
            <Password
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              name="newPassword"
              id="newPassword"
              className={`${
                formik.errors.newPassword &&
                formik.touched.newPassword &&
                "p-invalid"
              }
                ${router.locale !== "en" ? styles.password_ar : ""}
                `}
              disabled={edit ? false : true}
              style={{ width: "100%" }}
              toggleMask
            />
            <label htmlFor="newPassword">{t("profile:new_password")}</label>

            {formik.errors.newPassword && formik.touched.newPassword ? (
              <small id="email-help" className="p-error block">
                {formik.errors.newPassword}
              </small>
            ) : (
              ""
            )}
          </span>
          <span
            className={`p-float-label ${
              router.locale === "en" && "p-input-icon-left"
            } ${inputStyles.input_wrapper} ${styles.input}  ${
              !edit && styles.disabled_input
            }`}
          >
            <i
              className={`pi pi-lock ${inputStyles.inputIcons} ${
                router.locale === "en" ? inputStyles.icon_en : ""
              }`}
            ></i>
            <Password
              value={formik.values.confirmNewPassword}
              onChange={formik.handleChange}
              name="confirmNewPassword"
              id="confirmNewPassword"
              className={`${
                formik.errors.confirmNewPassword &&
                formik.touched.confirmNewPassword &&
                "p-invalid"
              }
                ${router.locale !== "en" ? styles.password_ar : ""}
                `}
              disabled={edit ? false : true}
              style={{ width: "100%" }}
              toggleMask
              feedback={false}
            />
            <label htmlFor="confirmNewPassword">
              {t("profile:confirm_password")}
            </label>

            {formik.errors.confirmNewPassword &&
            formik.touched.confirmNewPassword ? (
              <small id="confirmNewPassword-help" className="p-error block">
                {formik.errors.confirmNewPassword}
              </small>
            ) : (
              ""
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
              change
            </button>
          )}
        </form>
      </section>
    </motion.div>
  );
}
Profile.getLayout = function getLayout(page) {
  return (
    <MainLayout en="Profile" ar="الحساب الشخصي">
      <ProfileSidebar> {page}</ProfileSidebar>
    </MainLayout>
  );
};
export default Profile;
