/** @format */

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Vacancy } from "../../types/vacancy";

interface VacanciesState {
  items: Vacancy[];
  loading: boolean;
  error: string | null;
}

const initialState: VacanciesState = {
  items: [],
  loading: false,
  error: null,
};

const vacanciesSlice = createSlice({
  name: "vacancies",
  initialState,
  reducers: {
    fetchVacanciesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchVacanciesSuccess(state, action: PayloadAction<Vacancy[]>) {
      state.items = action.payload;
      state.loading = false;
    },
    fetchVacanciesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchVacanciesStart,
  fetchVacanciesSuccess,
  fetchVacanciesFailure,
} = vacanciesSlice.actions;

export default vacanciesSlice.reducer;
