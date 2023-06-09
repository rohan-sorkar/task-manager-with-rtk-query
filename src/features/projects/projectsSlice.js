import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projectItems: ['Scoreboard', 'Flight Booking', 'Product Cart', 'Book Store', 'Blog Application', 'Job Finder']
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProjectItem: (state, action) => {
            const isExits = state.projectItems.includes(action.payload)
            if(isExits) {
                state.projectItems = state.projectItems.filter((item) => item !== action.payload)
            } else {
                state.projectItems = [...state.projectItems, action.payload]
            }
        } 
    }
});

export const {addProjectItem} = projectsSlice.actions;
export default projectsSlice;