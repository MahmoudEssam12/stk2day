import React, { useState } from "react";
import ProfileSidebar from "../../../components/ProfileSidebar/ProfileSidebar";
import { MainLayout } from "../../../layout/mainLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import styles from "../../../styles/Profile.module.scss";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useRouter } from "next/router";
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

function Address() {
  const router = useRouter();
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  const [editBillAddress, setEditBillAddress] = useState(false);
  const [deliverAddress, setDeliverAddress] = useState({
    address: " ميامي جمال عبدالناصر الشارع المقابل لجزارة اللؤلؤه",
    country: "مصر",
    gov: "الاسكندرية",
  });
  const [billAddress, setBillAddress] = useState({
    address: "ميامي جمال عبدالناصر الشارع المقابل لجزارة اللؤلؤه",
    country: "مصر",
    gov: "الاسكندرية",
  });
  const handleChange = (e) => {
    setDeliverAddress((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleBillAdressChange = (e) => {
    setBillAddress((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.address}
    >
      <div>
        <h4>{t("profile:shipping_address")}</h4>

        <p>
          <span>{deliverAddress.address}</span>
          <span>{deliverAddress.gov}</span>
          <span>{deliverAddress.country}</span>
        </p>
        <CustomButton
          text="تحرير"
          color="secondary-box"
          style={{
            padding: "0.5rem 0",
            backgroundColor: "var(--light-secondary)",
            textTransform: "capitalize",
            maxHeight: "50px",
            color: "black",
            width: "125px",
          }}
          click={() => router.push(`/profile/address/shippingaddress`)}
        />
      </div>
      <div>
        <h4>{t("profile:billing_address")}</h4>
        <p>
          <span>{billAddress.address}</span>
          <span>{billAddress.gov}</span>
          <span>{billAddress.country}</span>
        </p>
        <CustomButton
          text="تحرير"
          color="secondary-box"
          style={{
            padding: "0.5rem 0",
            backgroundColor: "var(--light-secondary)",
            textTransform: "capitalize",
            maxHeight: "50px",
            color: "black",
            width: "125px",
          }}
          click={() => router.push(`/profile/address/billingaddress`)}
        />
      </div>
    </motion.div>
  );
}

Address.getLayout = function getLayout(page) {
  return (
    <MainLayout en="Address" ar="العنوان">
      <ProfileSidebar>{page}</ProfileSidebar>
    </MainLayout>
  );
};

export default Address;
