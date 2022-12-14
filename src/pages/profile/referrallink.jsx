import React, { useState, useRef } from "react";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import { MainLayout } from "../../layout/mainLayout";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import inputStyles from "../../styles/Inputs.module.scss";
import styles from "../../styles/Profile.module.scss";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useQRCode } from "next-qrcode";
import StatisticCard from "../../components/StatsticCard/StatisticCard";
import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";
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

const validationSchema = yup.object({
  referral: yup.object().shape({
    name: yup.string(""),
    id: yup.number(""),
  }),
  campaign: yup.string(""),
});

const options = [
  { name: "الإحالة", id: 1 },
  { name: "الإحالة", id: 2 },
  { name: "الإحالة", id: 3 },
];

function ReferralLink() {
  const toaster = useRef(null);
  const referralLink = useRef(null);
  const { t } = useTranslation();
  const { Canvas } = useQRCode();
  const [showQr, setShowQr] = useState(false);
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const formik = useFormik({
    initialValues: {
      referral: options[0],
      campaign: "",
    },
    validationSchema,
  });
  const showSuccess = () => {
    navigator.clipboard.writeText(referralLink.current.value);

    toaster.current.show({
      severity: "success",
      summary: "Link Copied",
      detail: "Referral Link copied",
      life: 3000,
    });
  };
  const handleQr = () => {
    setShowQr(true);
  };
  const handleUrl = () => {
    setShowQr(false);
    showSuccess();
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={` ${styles.referralLink}`}
    >
      <Toast ref={toaster} position="bottom-left" className={styles.toaster} />
      <div className={styles.inputs_wrapper}>
        <span
          className={`p-float-label ${
            router.locale === "en" && "p-input-icon-left"
          } ${inputStyles.input_wrapper} ${styles.input}`}
        >
          <Dropdown
            value={formik.values.referral}
            options={options}
            onChange={formik.handleChange}
            optionLabel="name"
            name="referral"
            placeholder={t("profile:referral_campaign")}
            className={styles.state_list}
            // id="orderState"
          />
          <label htmlFor="orderState">{t("profile:referral_campaign")}</label>
        </span>
        <form onSubmit={formik.handleSubmit}>
          <span
            className={`p-float-label ${
              router.locale === "en" && "p-input-icon-left"
            } ${inputStyles.input_wrapper} ${styles.input}`}
          >
            <InputText
              value={formik.values.campaign}
              options={options}
              onChange={formik.handleChange}
              name="campaign"
              className={styles.state_list}
              // id="orderState"
            />
            <label htmlFor="campaign">
              {t("profile:referral_new_campaign")}
            </label>

            {formik.errors.campaign && formik.touched.campaign && (
              <small id="campaign-help" className="p-error block">
                {formik.errors.campaign}
              </small>
            )}
          </span>
          <CustomButton
            text={t("profile:referral_add")}
            color="secondary-box"
            style={{
              padding: "1rem 0",
              backgroundColor: "var(--secondary-color)",
              textTransform: "capitalize",
              maxHeight: "60px",
            }}
          />
        </form>
      </div>

      <InputText
        value="https://stk2day.com/"
        className={styles.disabled}
        disabled
        style={{ marginTop: "1rem" }}
      />
      <div className={styles.links}>
        <div>
          {t("profile:referral_link")}
          <button onClick={handleUrl}>
            <i className="pi pi-copy"></i>
          </button>{" "}
          <button onClick={handleQr}>
            <i className="pi pi-qrcode"></i>
          </button>
        </div>
        <div>
          {showQr ? (
            <Canvas
              text={"https://twitter.com/MahmoudEssam68"}
              options={{
                type: "image/jpeg",
                quality: 0.3,
                level: "M",
                margin: 1,
                scale: 4,
                width: 100,
                color: {
                  dark: "#010599FF",
                  light: "#FFBF60FF",
                },
              }}
            />
          ) : (
            <InputText
              value="https://stk2day.com/?coupon=mousa1"
              className={styles.disabled}
              disabled
              style={{
                minWidth: "310px",
              }}
              ref={referralLink}
            />
          )}
        </div>
      </div>
      <h2>{t("profile:referral_stats")}</h2>
      <div className={styles.cards}>
        <StatisticCard
          headerText={t("profile:referral_convert")}
          description="0%"
        />
        <StatisticCard
          headerText={t("profile:referral_total")}
          description="0"
        />
        <StatisticCard
          headerText={t("profile:referral_clicks")}
          description="0 جنية"
        />
      </div>
      <h2>{t("profile:referral_latest_clicks")}</h2>
      <p>{t("profile:referral_latest_clicks_text")}</p>
      <div className="field-checkbox" style={{ marginTop: "2rem" }}>
        <Checkbox
          inputId="binary"
          checked={checked}
          onChange={(e) => setChecked(e.checked)}
        />
        <label htmlFor="binary" style={{ margin: "0 5px" }}>
          {t("profile:referral_checkbox")}
        </label>
      </div>
    </motion.div>
  );
}
ReferralLink.getLayout = function getLayout(page) {
  return (
    <MainLayout en="Referral Link" ar="رابط الإحالة">
      <ProfileSidebar>{page}</ProfileSidebar>
    </MainLayout>
  );
};
export default ReferralLink;
