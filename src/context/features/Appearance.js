import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { mode: "light", isDark: false };

export const appearanceSlice = createSlice({
  name: "appearance",
  initialState: { value: initialStateValue },
  reducers: {
    changeAppearance: (state, action) => {
      state.value = {
        ...state,
        mode: action.payload,
        isDark:
          (window.matchMedia("(prefers-color-scheme:dark)").matches &&
            action.payload === "system") ||
          action.payload === "dark",
      };
    },
  },
});

export const { changeAppearance } = appearanceSlice.actions;
export default appearanceSlice.reducer;
