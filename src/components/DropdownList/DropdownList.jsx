import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";

function DropdownList() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [test, setTest] = useState({});
  const onCountryChange = (e) => {
    setSelectedCountry(e.value);
  };
  const countries = [
    { name: "Australia", code: "AU" },
    { name: "Brazil", code: "BR" },
    { name: "China", code: "CN" },
    { name: "Egypt", code: "EG" },
    { name: "France", code: "FR" },
    { name: "Germany", code: "DE" },
    { name: "India", code: "IN" },
    { name: "Japan", code: "JP" },
    { name: "Spain", code: "ES" },
    { name: "United States", code: "US" },
  ];
  //   async function fetchCountries() {
  //     let res = await fetch("http://country.io/phone.json");
  //     let data = await res.json();
  //     console.log(data);
  //   }

  //   useEffect(() => {
  //     // fetchCountries();
  //     axios
  //       .get("http://country.io/phone.json")
  //       .then((res) => console.log(res))
  //       .catch((err) => console.log(err));
  //   }, []);

  const selectedCountryTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <picture width="50" height="50">
            <img
              alt={option.name}
              src="images/flag/flag_placeholder.png"
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              className={`flag flag-${option.code.toLowerCase()}`}
              width="50"
              height="50"
            />
          </picture>
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const countryOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <picture width="50" height="50">
          <img
            alt={option.name}
            src="images/flag/flag_placeholder.png"
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            className={`flag flag-${option.code.toLowerCase()}`}
            width="50"
            height="50"
          />
        </picture>
        <div>{option.name}</div>
      </div>
    );
  };
  return (
    <Dropdown
      value={selectedCountry}
      options={countries}
      onChange={onCountryChange}
      optionLabel="name"
      filter
      showClear
      filterBy="name"
      placeholder="Select a Country"
      valueTemplate={selectedCountryTemplate}
      itemTemplate={countryOptionTemplate}
    />
  );
}

export default DropdownList;
