import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
}

export const favouritsSlice = createSlice({
    name: "favourits",
    initialState,
    reducers: {
        setFavourits: (state, action) => {
            state.products = [...state.products, action.payload]
        },
        removeFavourit: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload)
        },
        addMultiFavs: (state, action) => {
            //check for the uniqness of the array
            state.products = [...state.products, ...action.payload]
        }
    }
});

export const { setFavourits, removeFavourit, addMultiFavs } = favouritsSlice.actions;
export const selectFavourit = (state) => state.favourit.products;
export default favouritsSlice.reducer