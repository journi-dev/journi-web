import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedLanguage: "en-US",
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
