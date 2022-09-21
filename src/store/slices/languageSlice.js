import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lang: { name: "عربي", code: "ar", flag: "egypt" }
}

export const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.lang = action.payload
        }
    }
});

export const { setLanguage } = languageSlice.actions;
export const selectLanguage = (state) => state.language.lang;
export default languageSlice.reducer;