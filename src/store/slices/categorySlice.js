import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: "ملابس رجالي"
}

export const categorySLice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.name = action.payload
        }
    }
});


export const { setCategory } = categorySLice.actions;
export const selectCategory = (state) => state.category.name;
export default categorySLice.reducer