import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isEditActive: false,
  error: null,
  itemIds: [],
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsEditActive: (state, action) => {
      state.isEditActive = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setItemIds: (state, action) => {
      state.itemIds = action.payload;
    },
  },
});

export const { reset, setIsLoading, setIsEditActive, setError, setItemIds } =
  settingsSlice.actions;
export default settingsSlice.reducer;
