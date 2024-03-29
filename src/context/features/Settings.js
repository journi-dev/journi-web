import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isEditActive: false,
  error: null,
  itemIds: [],
  activeCategory: "",
  activeSubcategory: "",
  menuCount: 0,
  lastUpdated: 0,
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
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setActiveSubcategory: (state, action) => {
      state.activeSubcategory = action.payload;
    },
    setMenuCount: (state, action) => {
      state.menuCount = action.payload;
    },
    setLastUpdated: (state, action) => {
      state.lastUpdated = action.payload;
    },
  },
});

export const {
  reset,
  setIsLoading,
  setIsEditActive,
  setError,
  setItemIds,
  setActiveCategory,
  setActiveSubcategory,
  setMenuCount,
  setLastUpdated,
} = settingsSlice.actions;
export default settingsSlice.reducer;
