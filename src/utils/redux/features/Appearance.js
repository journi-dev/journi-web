import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = "light";

export const appearanceSlice = createSlice({
  name: "appearance",
  initialState: { value: initialStateValue },
  reducers: {
    changeAppearance: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeAppearance } = appearanceSlice.actions;
export default appearanceSlice.reducer;
