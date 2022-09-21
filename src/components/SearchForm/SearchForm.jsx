import React, { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import { InputText } from "primereact/inputtext";
import styles from "../../styles/Products.module.scss";
import inputStyles from "../../styles/Inputs.module.scss";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

function SearchForm() {
  let router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const { t } = useTranslation();

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <>
      <form className={styles.search_form}>
        <span
          className={`p-float-label  ${
            router.locale === "en" && "p-input-icon-left"
          } ${inputStyles.input_wrapper} ${styles.input_search} ${
            router.locale === "en" ? " " : styles.ar
          }`}
        >
          <i
            className={`pi pi-search ${inputStyles.inputIcons} ${
              router.locale === "en" ? inputStyles.icon_en : ""
            }`}
          ></i>
          <InputText
            value={searchValue}
            name="search"
            id="search"
            onChange={handleSearch}
          />

          <label htmlFor="search">{t("common:search_txt")}</label>
        </span>
        <div className={router.locale === "en" ? " " : styles.ar}>
          <CustomButton
            text={t("common:search_btn")}
            color="secondary-box"
            style={{
              padding: "1rem 0",
              backgroundColor: "var(--secondary-color)",
              textTransform: "capitalize",
            }}
          />
        </div>
      </form>
    </>
  );
}

export default SearchForm;
