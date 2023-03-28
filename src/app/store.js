import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/api/apiSlice";
import projectsSlice from "../features/projects/projectsSlice";
import searchSlice from "../features/search/searchSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        projects: projectsSlice.reducer,
        search: searchSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})