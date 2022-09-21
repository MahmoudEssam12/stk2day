import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavourits, selectFavourit } from "../store/slices/favourtisSlice";
import { useTranslation } from "next-i18next";
export function useAddToFavs(product, messageRef) {
    const { t } = useTranslation()
    const dispatch = useDispatch();
    const favourits = useSelector(selectFavourit)
    const toaster = messageRef;

    const showMessage = (type, summary, detail) => {
        toaster.current.show({
            severity: type,
            summary,
            detail,
            life: 3000,
        });
    };
    const addToFavourits = (product) => {
        // validations if the user added the same product to the favourits
        // show him a message that the product already exists in the favourits
        const duplicate = favourits.find((favouritItem) => favouritItem.id === product.id);
        if (!duplicate) {
            dispatch(setFavourits(product));
            showMessage("success", "added to favourits", "successfully added to favourits");
        }
        else {
            showMessage(
                "info",
                "Duplicate item",
                "This item already exists in favourits. \nif you want to increase quantity do it from favourits"
            );
        }
    };

    const addProductToLocalStorage = (product) => {
        const items = JSON.parse(window.localStorage.getItem("favs"));
        if (items) {
            const checkForDuplicate = items.find((item) => item.id === product.id);
            if (!checkForDuplicate) {
                const favedProducts = [...items, product];
                localStorage.setItem("favs", JSON.stringify(favedProducts));
                dispatch(setFavourits(product));
                // setFav(true);
                showMessage(
                    "success",
                    t("products:message_success_summary"),
                    t("products:message_success_detail")
                );
            } else {
                showMessage(
                    "error",
                    t("products:message_error_summary"),
                    t("products:message_error_detail")
                );
            }
        } else {
            localStorage.setItem("favs", JSON.stringify([product]));
            dispatch(setFavourits(product));
            // setFav(true);
            showMessage(
                "success",
                t("products:message_success_summary"),
                t("products:message_success_detail")
            );
        }
    };
    const handleAdding = () => {
        addProductToLocalStorage(product);
    };

    return handleAdding;
}