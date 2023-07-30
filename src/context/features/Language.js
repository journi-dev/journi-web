import { createSlice } from "@reduxjs/toolkit";
import { languages } from "../../utils/UIObjects";

const initialState = {
  selectedLanguage: languages["en"],
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
    setLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
  },
});

export const { reset, setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
