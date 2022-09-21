import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem, selectCartItem } from "../store/slices/cartSlice";

export function useAddToCart(product, message) {
    const dispatch = useDispatch();
    const cart = useSelector(selectCartItem)
    const toaster = message;

    const showMessage = (type, summary, detail) => {
        toaster.current.show({
            severity: type,
            summary,
            detail,
            life: 3000,
        });
    };
    const addToCart = (product) => {
        // validations if the user added the same product to the cart
        // show him a message that the product already exists in the cart
        const duplicate = cart.find((cartItem) => cartItem.id === product.id);
        if (!duplicate) {
            dispatch(setCartItem(product));
            showMessage("success", "added to cart", "successfully added to cart");
        }
        else {
            showMessage(
                "info",
                "Duplicate item",
                "This item already exists in cart. \nif you want to increase quantity do it from cart"
            );
        }
    };
    const handleAdding = () => {
        addToCart(product);
    };

    return handleAdding;
}