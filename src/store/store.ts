/** @format */

import { configureStore } from "@reduxjs/toolkit";
import vacanciesReducer from "./slices/vacanciesSlice";
import filtersReducer from "./slices/filtersSlice";
import paginationReducer from "./slices/paginationSlice";

export const store = configureStore({
  reducer: {
    vacancies: vacanciesReducer,
    filters: filtersReducer,
    pagination: paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
