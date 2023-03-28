import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchTerm: ''
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchInputChange: (state, action) => {
            state.searchTerm = action.payload
        }
    }
});

export const {searchInputChange} = searchSlice.actions;
export default searchSlice;