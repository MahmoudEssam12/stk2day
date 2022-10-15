import React from "react";
import { Avatar } from "primereact/avatar";
import { MainLayout } from "../layout/mainLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import ProductsRow from "../components/ProductsRow/ProductsRow";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "footer",
        "navbar",
        "common",
        "categories",
        "products",
      ])),
    },
  };
}
function Seller() {
  return (
    <div className="c-container seller">
      <div className="header">
        <Avatar
          icon="pi pi-user"
          className="mr-2 avatar-circle"
          size="xlarge"
          shape="circle"
          style={{
            width: "9rem",
            height: "9rem",
            fontSize: "5rem",
            position: "relative",
            bottom: "-110px",
          }}
        />
        <h1
          style={{
            position: "relative",
            bottom: "-110px",
          }}
        >
          seller name
        </h1>
      </div>
      <div className="body c-container">
        <ProductsRow title="All products by this seller" />
      </div>
      <style jsx>
        {`
          .seller {
            display: "flex";
            flex-direction: "column";
            box-shadow: 0 0 10px 1px #ccc;
            margin-bottom: 2rem;
            margin-top: 2rem;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            .header {
              padding: 2rem 0;
              border-radius: 10px;
              background-color: var(--secondary-color);
              text-align: center;
            }
            .body {
              padding: 2rem 0;
              margin-top: 2rem;
            }
          }
          .header .avatar-circle {
            margin-top: 1rem;
          }
          .avatar-circle span {
            font-size: 3rem !important;
          }
        `}
      </style>
    </div>
  );
}

Seller.getLayout = function getLayout(page) {
  return (
    <MainLayout en="seller" ar="البائع">
      {page}
    </MainLayout>
  );
};
export default Seller;
