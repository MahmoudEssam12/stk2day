import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import ProfileSidebar from "../../../components/ProfileSidebar/ProfileSidebar";
import { MainLayout } from "../../../layout/mainLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import { Calendar } from "primereact/calendar";
import inputStyles from "../../../styles/Inputs.module.scss";
import styles from "../../../styles/Profile.module.scss";
import { useRouter } from "next/router";
import { Dropdown } from "primereact/dropdown";
import CustomButton from "../../../components/CustomButton/CustomButton";
import ProfileTable from "../../../components/ProfileTable/ProfileTable";
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

const tableData = [
  {
    id: 1,
    orderNumber: "3037",
    date: "9/10/2022",
    status: "qulaified",
    productsCount: 4,
    products: [
      {
        id: 5,
        name: "شورت بحر وتر بروف",
        count: 2,
        price: 100,
        total_price: 200,
        commission: 50,
      },
      {
        id: 6,
        name: "شورت بحر ",
        count: 1,
        price: 100,
        total_price: 100,
        commission: 50,
      },
    ],
  },
  {
    id: 2,
    orderNumber: "3047",
    status: "rejected",
    productsCount: 1,
    date: "20/01/2022",
    products: [
      {
        id: 6,
        name: "شورت بحر ",
        count: 1,
        price: 100,
        total_price: 100,
        commission: 50,
      },
    ],
  },
  {
    id: 3,

    orderNumber: "3057",
    status: "shupped",
    productsCount: 2,
    date: "6/10/2022",
    products: [
      {
        id: 5,
        name: "شورت بحر وتر بروف",
        count: 2,
        price: 100,
        total_price: 200,
        commission: 50,
      },
      {
        id: 6,
        name: "شورت بحر ",
        count: 1,
        price: 100,
        total_price: 100,
        commission: 50,
      },
      {
        id: 7,
        name: "شورت  ",
        count: 3,
        price: 100,
        total_price: 300,
        commission: 50,
      },
    ],
  },
  {
    id: 4,
    orderNumber: "3077",
    status: "qulaified",
    productsCount: 10,
    date: "1/10/2022",
    products: [
      {
        id: 5,
        name: "شورت بحر وتر بروف",
        count: 2,
        price: 100,
        total_price: 200,
        commission: 50,
      },
      {
        id: 6,
        name: "شورت بحر ",
        count: 1,
        price: 100,
        total_price: 100,
        commission: 50,
      },
    ],
  },
];

const validationSchema = yup.object({
  mobileNumber: yup.string(""),
  orderNumber: yup.string(""),
  orderDate: yup.string(""),
  orderState: yup.object().shape({
    name: yup.string(""),
    color: yup.string(""),
    value: yup.string(""),
  }),
  orderCount: yup
    .object()
    .shape({
      num: yup.number(""),
      value: yup.string(""),
    })
    .nullable(),
});

function Orders() {
  const { t } = useTranslation();
  const [dates2, setDates2] = useState(null);
  const [orders, setOrders] = useState([1]);
  const router = useRouter();
  const orderStates = [
    { name: t("profile:placeholder"), color: "" },
    { name: t("profile:state1"), color: "" },
    { name: t("profile:state2"), color: "" },
    { name: t("profile:state3"), color: "" },
    { name: t("profile:state4"), color: "" },
    { name: t("profile:state5"), color: "" },
    { name: t("profile:state6"), color: "" },
    { name: t("profile:state7"), color: "" },
    { name: t("profile:state8"), color: "" },
    { name: t("profile:state9"), color: "" },
  ];
  const ordersCount = [
    { num: t("profile:placeholder") },
    { num: 5 },
    { num: 10 },
    { num: 15 },
    { num: 20 },
    { num: 50 },
    { num: 100 },
  ];
  const formik = useFormik({
    initialValues: {
      mobileNumber: "",
      orderNumber: "",
      orderDate: "",
      orderState: orderStates[0],
      orderCount: ordersCount[0],
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema,
  });

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <section className={styles.orders_wrapper}>
        <form onSubmit={formik.handleSubmit} className={styles.filters}>
          <span
            className={`p-float-label ${
              router.locale === "en" && "p-input-icon-left"
            } ${inputStyles.input_wrapper} ${styles.input}`}
          >
            <InputText
              value={formik.values.mobileNumber}
              onChange={formik.handleChange}
              name="mobileNumber"
              id="mobileNumber"
              className={
                formik.errors.username &&
                formik.touched.mobileNumber &&
                "p-invalid"
              }
            />
            <label htmlFor="mobileNumber">
              {t("profile:order_mobilenumber")}
            </label>

            {formik.errors.mobileNumber && formik.touched.mobileNumber && (
              <small id="mobileNumber-help" className="p-error block">
                {formik.errors.mobileNumber}
              </small>
            )}
          </span>
          <span
            className={`p-float-label ${
              router.locale === "en" && "p-input-icon-left"
            } ${inputStyles.input_wrapper} ${styles.input}`}
          >
            <InputText
              value={formik.values.orderNumber}
              onChange={formik.handleChange}
              name="orderNumber"
              id="orderNumber"
              className={
                formik.errors.orderNumber &&
                formik.touched.orderNumber &&
                "p-invalid"
              }
            />
            <label htmlFor="orderNumber">{t("profile:order_number")}</label>

            {formik.errors.orderNumber && formik.touched.orderNumber && (
              <small id="orderNumber-help" className="p-error block">
                {formik.errors.orderNumber}
              </small>
            )}
          </span>
          <div
            className={` ${inputStyles.input_wrapper}  ${styles.input} ${styles.calendar}`}
          >
            {/* <label htmlFor="range">Date Range</label> */}
            <Calendar
              id="range"
              value={dates2}
              onChange={(e) => setDates2(e.value)}
              selectionMode="range"
              className={`${styles.calendar_input} ${
                router.locale === "en" && styles.en
              }`}
              readOnlyInput
              showIcon
              placeholder={t("profile:order_date")}
              maxDate={new Date()}
              tooltip={t("profile:calendar_range")}
            />
          </div>
          <span
            className={`p-float-label ${
              router.locale === "en" && "p-input-icon-left"
            } ${inputStyles.input_wrapper} ${styles.input}`}
          >
            <Dropdown
              value={formik.values.orderState}
              options={orderStates}
              onChange={formik.handleChange}
              optionLabel="name"
              name="orderState"
              placeholder={t("profile:order_state")}
              className={styles.state_list}
              // id="orderState"
            />
            <label htmlFor="orderState">{t("profile:order_state")}</label>

            {formik.errors.orderState && formik.touched.orderState && (
              <small id="orderState-help" className="p-error block">
                {formik.errors.orderState}
              </small>
            )}
          </span>
          <span
            className={`p-float-label ${
              router.locale === "en" && "p-input-icon-left"
            } ${inputStyles.input_wrapper} ${styles.input}`}
          >
            <Dropdown
              value={formik.values.orderCount}
              options={ordersCount}
              onChange={formik.handleChange}
              optionLabel="num"
              name="orderCount"
              placeholder={t("profile:order_state")}
              className={styles.state_list}
              // defaultValue={ordersCount[0]}
              // id="orderCount"
            />
            <label htmlFor="orderCount">{t("profile:order_count")}</label>

            {formik.errors.orderCount && formik.touched.orderCount && (
              <small id="orderCount-help" className="p-error block">
                {formik.errors.orderCount}
              </small>
            )}
          </span>
          <CustomButton
            text={t("profile:order_btn")}
            color="secondary-box"
            style={{
              padding: "1rem 0",
              backgroundColor: "var(--secondary-color)",
              textTransform: "capitalize",
              maxHeight: "60px",
            }}
          />
        </form>
        <div className={styles.table_wrapper}>
          {orders.length ? (
            <ProfileTable data={tableData} />
          ) : (
            <div className={styles.empty_orders}>
              <h2>لم يتم تنفيذ أي طلب بعد.</h2>
              <CustomButton
                text={t("profile:to_shopping")}
                color="secondary-box"
                style={{
                  padding: "1rem 0",
                  backgroundColor: "var(--secondary-color)",
                  textTransform: "capitalize",
                  maxHeight: "60px",
                }}
                click={() => router.push("/products")}
              />
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
Orders.getLayout = function getLayout(page) {
  return (
    <MainLayout en="Orders" ar="الطلبات">
      <ProfileSidebar>{page}</ProfileSidebar>
    </MainLayout>
  );
};
export default Orders;
