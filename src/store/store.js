import { configureStore } from "@reduxjs/toolkit";
import categorySLice from "./slices/categorySlice";
import languageSlice from "./slices/languageSlice";
import regionSlice from "./slices/regionSlice";
import favouritsSlice from "./slices/favourtisSlice"
import cartSlice from "./slices/cartSlice";
export default configureStore({
    reducer: {
        category: categorySLice,
        language: languageSlice,
        region: regionSlice,
        favourit: favouritsSlice,
        cart: cartSlice
    }
})