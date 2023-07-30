import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  isDark: false,
  isDrawerExpanded: false,
};

export const appearanceSlice = createSlice({
  name: "appearance",
  initialState,
  reducers: {
    changeAppearance: (state, action) => {
      state.mode = action.payload;
      state.isDark =
        (window.matchMedia("(prefers-color-scheme:dark)").matches &&
          action.payload === "system") ||
        action.payload === "dark";
    },
    toggleDrawer: (state, action) => {
      state.isDrawerExpanded = action.payload;
    },
  },
});

export const { changeAppearance, toggleDrawer } = appearanceSlice.actions;
export default appearanceSlice.reducer;
