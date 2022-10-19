import React from "react";
import { useTranslation } from "next-i18next";
import { Rating } from "primereact/rating";
import { Slider } from "primereact/slider";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import styles from "../../styles/Category.module.scss";
import filtersStyles from "./Filters.module.scss";
import { useEffect } from "react";
function Filters({
  products,
  priceRange,
  setPriceRange,
  ratings,
  setRatings,
  filteredProducts,
  setFilteredProducts,
  showFilters,
  setShowFilters,
  pricesInputs,
  setPricesInputs,
  categories,
  setCategories,
  category,
}) {
  const { t } = useTranslation();
  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };
  // function to handle price range change
  const priceRangeChange = (e) => {
    setPriceRange(e.value);
    if (e.value !== null) {
      setPricesInputs((prev) => {
        return {
          min: e.value[0],
          max: e.value[1],
        };
      });
    } else {
      setPricesInputs((prev) => {
        return { min: 0, max: 0 };
      });
    }
  };
  // function to handle input prices change
  const priceChange = (e) => {
    if (e.value >= 0 && e.value <= 100) {
      setPricesInputs((prev) => {
        return {
          ...prev,
          [e.originalEvent.target.name]: e.value,
        };
      });

      setPriceRange((prev) => {
        let arr = [...prev];
        if (e.originalEvent.target.name === "min") {
          arr[0] = e.value;
        } else {
          arr[1] = e.value;
        }
        return arr;
      });
    }
  };

  // function to apply filter products by price
  const filterByPrice = () => {
    let cProducts = [...products];
    if (ratings.length) {
      let filter = filteredProducts.filter((product) => {
        if (
          Number(product.price) >= priceRange[0] &&
          Number(product.price) <= priceRange[1]
        ) {
          return product;
        }
      });
      setFilteredProducts([...filter]);
    } else {
      if (priceRange[0] !== null && priceRange[1] !== null) {
        let priceFilter = cProducts.filter((product) => {
          if (
            Number(product.price) >= priceRange[0] &&
            Number(product.price) <= priceRange[1]
          ) {
            return product;
          }
        });
        setFilteredProducts([...priceFilter]);
      } else if (priceRange[0] === null && priceRange[1] === null) {
        setFilteredProducts([...products]);
      }
    }
  };

  // function to reset price filter
  const resetPriceFilter = () => {
    setFilteredProducts([...products]);
    setPriceRange([0, 500]);
    setPricesInputs((prev) => {
      return { min: 0, max: 500 };
    });
    setRatings([]);
  };

  // function to handle rating checkboxs filter changes
  const onRatingFilterChange = (e) => {
    let selectedRatings = [...ratings];

    if (e.checked) selectedRatings.push(e.value);
    else selectedRatings.splice(selectedRatings.indexOf(e.value), 1);

    setRatings(selectedRatings);
  };

  // function to apply the filters on the products
  const filterProductsByRating = () => {
    let cProducts = [...products];
    let filtered = [];
    if (ratings.length) {
      ratings.forEach((rating) => {
        let ratingsProducts = cProducts.filter((product) => {
          return product.rating === Number(rating);
        });
        filtered = [...filtered, ...ratingsProducts];
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([...products]);
    }
  };
  useEffect(() => {
    filterProductsByRating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratings]);
  return (
    <div className={"filters_wrapper"}>
      <button className={"filters_button"} onClick={toggleFilters}>
        Filters{" "}
        <FontAwesomeIcon
          icon={faAngleDown}
          className={showFilters ? "rotate_icon" : ""}
        />
      </button>
      <div className={`${"filters_wrapper"} ${showFilters ? "active" : " "}`}>
        <h4>{t("categories:title")}</h4>
        <ul className={"categories_ul"}>
          {categories.map((cate) => (
            <li
              key={cate.name}
              className={category === "link" ? "active" : " "}
            >
              <Link href={`/products/category/${cate.link}`} passHref>
                <a>
                  {cate.name} <span>300</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <h4>{t("categories:rating_title")}</h4>
        <ul>
          <li>
            <div
              className={`field-checkbox rating-checkbox ${"rating_checkbox"}`}
            >
              <Checkbox
                inputId="rating1"
                name="ratings"
                value="1"
                onChange={onRatingFilterChange}
                checked={ratings.indexOf("1") !== -1}
              />
              <label
                htmlFor="rating1"
                style={{
                  cursor: "pointer",
                  display: "block",
                  width: "100%",
                }}
              >
                <Rating value={1} readOnly stars={5} cancel={false} />
              </label>
            </div>
          </li>
          <li>
            <div
              className={`field-checkbox rating-checkbox ${"rating_checkbox"}`}
            >
              <Checkbox
                inputId="rating2"
                name="ratings"
                value="2"
                onChange={onRatingFilterChange}
                checked={ratings.indexOf("2") !== -1}
              />
              <label
                htmlFor="rating2"
                style={{
                  cursor: "pointer",
                  display: "block",
                  width: "100%",
                }}
              >
                <Rating value={2} readOnly stars={5} cancel={false} />
              </label>
            </div>
          </li>
          <li>
            <div
              className={`field-checkbox rating-checkbox ${"rating_checkbox"}`}
            >
              <Checkbox
                inputId="rating3"
                name="ratings"
                value="3"
                onChange={onRatingFilterChange}
                checked={ratings.indexOf("3") !== -1}
              />
              <label
                htmlFor="rating3"
                style={{
                  cursor: "pointer",
                  display: "block",
                  width: "100%",
                }}
              >
                <Rating value={3} readOnly stars={5} cancel={false} />
              </label>
            </div>
          </li>
          <li>
            <div
              className={`field-checkbox rating-checkbox ${"rating_checkbox"}`}
            >
              <Checkbox
                inputId="rating4"
                name="ratings"
                value="4"
                onChange={onRatingFilterChange}
                checked={ratings.indexOf("4") !== -1}
              />
              <label
                htmlFor="rating4"
                style={{
                  cursor: "pointer",
                  display: "block",
                  width: "100%",
                }}
              >
                <Rating value={4} readOnly stars={5} cancel={false} />
              </label>
            </div>
          </li>
          <li>
            <div
              className={`field-checkbox rating-checkbox ${"rating_checkbox"}`}
            >
              <Checkbox
                inputId="rating5"
                name="ratings"
                value="5"
                onChange={onRatingFilterChange}
                checked={ratings.indexOf("5") !== -1}
              />
              <label
                htmlFor="rating5"
                style={{
                  cursor: "pointer",
                  display: "block",
                  width: "100%",
                }}
              >
                <Rating value={5} readOnly stars={5} cancel={false} />
              </label>
            </div>
          </li>
        </ul>
        <h4>{t("categories:price")}</h4>
        <div>
          <div className={"range"}>
            <Slider
              value={priceRange}
              onChange={priceRangeChange}
              min={0}
              max={500}
              range
              className={"range"}
            />
          </div>
          <div className={"prices_inputs"}>
            <span className="p-float-label">
              <InputNumber
                id="min"
                name="min"
                max={pricesInputs.max}
                min={0}
                value={pricesInputs.min}
                onChange={priceChange}
                style={{ width: "100px" }}
                className={filtersStyles.filter_input}
              />
              <label htmlFor="min">{t("categories:min")}</label>
            </span>
            <span className="p-float-label">
              <InputNumber
                id="max"
                name="max"
                min={pricesInputs.min}
                max={500}
                value={pricesInputs.max}
                onChange={priceChange}
                style={{ width: "100px" }}
                className={filtersStyles.filter_input}
              />
              <label htmlFor="max">{t("categories:max")}</label>
            </span>
          </div>
          <div className={"buttons"}>
            <button onClick={filterByPrice}>{t("categories:apply")}</button>
            <button className={"reset_btn"} onClick={resetPriceFilter}>
              {t("categories:reset")}
            </button>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .filters_wrapper {
            min-width: 280px;
            padding: 1rem;
            background-color: #fffcfa;
            border-radius: 8px;

            h4 {
              text-transform: capitalize;
              color: var(--default-color);
              font-size: 1.1rem;
              margin-bottom: 1rem;
            }

            ul {
              list-style: none;
              margin: 1rem 0;

              li {
                padding: 0.5rem;
                margin-bottom: 5px;
                transition: all 0.3s ease;
                border-radius: 8px;
                cursor: pointer;

                &:hover,
                &.active {
                  background-color: #f7eeea;
                }

                a {
                  display: block;
                  width: 100%;
                }
              }
            }

            .categories_ul {
              li {
                a {
                  display: flex;
                  justify-content: space-between;

                  span {
                    color: var(--secondary-color);
                  }
                }
              }
            }

            .filters_button {
              display: block;
              width: 100%;
              height: 60px;
              font-size: 1.2rem;
              margin-bottom: 1rem;
              border: 1px solid #ccc;
              border-radius: 8px;
              color: var(--default-color);
              background-color: var(--secondary-color);
              color: #fff;
              cursor: pointer;
              display: none;

              svg {
                transition: all 0.3s ease;
              }
            }

            .filters_wrapper {
              transition: all 0.3s ease;
            }

            .rotate_icon {
              transform: rotate(180deg);
            }

            @media (max-width: 768px) {
              justify-content: center;
              flex-wrap: wrap;

              .col:first-child {
                width: 100%;
              }

              .filters_button {
                display: block;
              }

              .filters_wrapper {
                max-height: 0;
                overflow: hidden;

                &.active {
                  max-height: 1000px;
                  padding: 1rem 0;
                }
              }
            }
          }

          .rating_checkbox {
            display: flex;
            gap: 1rem;
            cursor: pointer;
          }

          .prices_inputs,
          .buttons {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 2rem 0 1rem;
            gap: 1rem;

            input {
              width: 100px;
            }

            label {
              text-transform: capitalize;
            }
          }

          .buttons {
            button {
              height: 60px;
              border: 1px solid rgb(228, 228, 228);
              background-color: var(--secondary-color);
              color: #fff;
              padding: 0 2rem;
              cursor: pointer;
              border-radius: 8px;
              text-transform: capitalize;
            }

            .reset_btn {
              background-color: var(--light-secondary-color);
              color: var(--secondary-color);
              transition: all 0.3s ease;

              &:hover {
                background-color: var(--secondary-color);
                color: #fff;
              }
            }
          }
          .filter-input input {
            width: 100px;
          }
          .range {
            padding: 0rem 1rem;
          }
        `}
      </style>
    </div>
  );
}

export default Filters;
