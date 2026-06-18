/** @format */

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface FiltersState {
  search: string;
  city: string;
  skills: string[];
}

const initialState: FiltersState = {
  search: "",
  city: "",
  skills: ["JavaScript", "React", "Redux", "Python"],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    addSkill(state, action: PayloadAction<string>) {
      const skill = action.payload.trim();
      if (skill && !state.skills.includes(skill)) {
        state.skills.push(skill);
      }
    },
    removeSkill(state, action: PayloadAction<string>) {
      state.skills = state.skills.filter((s) => s !== action.payload);
    },
    setSkills(state, action: PayloadAction<string[]>) {
      state.skills = action.payload;
    },
  },
});

export const { setSearch, setCity, addSkill, removeSkill, setSkills } =
  filtersSlice.actions;
export default filtersSlice.reducer;
