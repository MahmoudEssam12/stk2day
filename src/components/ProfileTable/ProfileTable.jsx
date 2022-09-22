import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { CSVLink } from "react-csv";
import styles from "../../styles/Profile.module.scss";

function ProfileTable({ data }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [customers, setCustomers] = useState([...data]);
  const [expandedRows, setExpandedRows] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },

    representative: { value: null, matchMode: FilterMatchMode.IN },
    date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    productsCount: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
  });
  const representatives = [
    { name: "Amy Elsner", image: "amyelsner.png" },
    { name: "Anna Fali", image: "annafali.png" },
    { name: "Asiya Javayant", image: "asiyajavayant.png" },
    { name: "Bernardo Dominic", image: "bernardodominic.png" },
    { name: "Elwin Sharvill", image: "elwinsharvill.png" },
    { name: "Ioni Bowcher", image: "ionibowcher.png" },
    { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
    { name: "Onyama Limba", image: "onyamalimba.png" },
    { name: "Stephen Shaw", image: "stephenshaw.png" },
    { name: "XuXue Feng", image: "xuxuefeng.png" },
  ];
  const renderHeader = () => {
    return (
      <div
        className="flex justify-content-between align-items-center"
        style={{ maxWidth: "600px" }}
      >
        <h5 className={styles.tableHeader}>{t("profile:orders")}</h5>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const header = renderHeader();

  const actionBodyTemplate = (order) => {
    return (
      <Button
        type="button"
        onClick={() => router.push(`/profile/orders/${order.id}`)}
        className={styles.table_btn}
      >
        {t("profile:order_details")}
      </Button>
    );
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="orders-subtable" style={{ width: "100%" }}>
        <DataTable value={data.products} responsiveLayout="scroll">
          <Column field="name" header={t("profile:subtable_name")}></Column>
          <Column field="count" header={t("profile:subtable_count")}></Column>
          <Column
            field="total_price"
            header={t("profile:subtable_total_price")}
          ></Column>
          <Column
            field="commission"
            header={t("profile:subtable_commision")}
          ></Column>
        </DataTable>
      </div>
    );
  };
  return (
    <div>
      <DataTable
        value={customers}
        paginator
        className="p-datatable-customers"
        header={header}
        rows={10}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[10, 25, 50]}
        dataKey="id"
        rowHover
        expandedRows={expandedRows}
        onRowToggle={(e) => {
          setExpandedRows(e.data);
        }}
        rowExpansionTemplate={rowExpansionTemplate}
        filters={filters}
        filterDisplay="menu"
        responsiveLayout="scroll"
        scrollable
        scrollDirection="horizontal"
        globalFilterFields={["orderNumber", "status", "productsCount", "date"]}
        emptyMessage="No customers found."
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      >
        <Column
          headerStyle={{ textAlign: "center" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
          header={t("profile:order_details_btn")}
          expander
        />
        <Column
          field="orderNumber"
          header={t("profile:order_number")}
          sortable
        />

        <Column
          field="date"
          header={t("profile:order_date")}
          sortable
          dataType="date"
        />
        <Column
          field="productsCount"
          header={t("profile:order_count")}
          sortable
          dataType="numeric"
        />
        <Column field="status" header={t("profile:order_state")} sortable />

        <Column
          headerStyle={{ textAlign: "center" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
          body={actionBodyTemplate}
        />
      </DataTable>
      <CSVLink
        data={data}
        style={{
          backgroundColor: "var(--secondary-color)",
          borderRadius: "8px",
          padding: "1rem 2rem",
          display: "inline-block",
          color: "#fff",
        }}
      >
        {t("profile:export_btn")}
      </CSVLink>
    </div>
  );
}

export default ProfileTable;
