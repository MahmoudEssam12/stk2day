import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: { name: "مصر", code: "eg", flag: "egypt" },

}

export const regionSlice = createSlice({
    name: "region",
    initialState,
    reducers: {
        setRegion: (state, action) => {
            state.name = action.payload
        }
    }
});

export const { setRegion } = regionSlice.actions;
export const selectRegion = (state) => state.region.name;
export default regionSlice.reducer;