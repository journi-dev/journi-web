import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  specialHours: {
    ranges: { 0: [null, null] },
    isClosed: false,
    isOpen24Hours: false,
  },
  sunday: {
    ranges: { 0: [null, null] },
    isClosed: false,
    isOpen24Hours: false,
  },
  monday: {
    ranges: { 0: [null, null] },
    isClosed: false,
    isOpen24Hours: false,
  },
  tuesday: {
    ranges: { 0: [null, null] },
    isClosed: false,
    isOpen24Hours: false,
  },
  wednesday: {
    ranges: { 0: [null, null] },
    isClosed: false,
    isOpen24Hours: false,
  },
  thursday: {
    ranges: { 0: [null, null] },
    isClosed: false,
    isOpen24Hours: false,
  },
  friday: {
    ranges: { 0: [null, null] },
    isClosed: false,
    isOpen24Hours: false,
  },
  saturday: {
    ranges: { 0: [null, null] },
    isClosed: false,
    isOpen24Hours: false,
  },
  error: null,
  isLoading: true,
  isUpdating: false,
  lastUpdated: 0,
};

export const specialAndTempHoursSlice = createSlice({
  name: "hours",
  initialState,
  reducers: {
    resetSpecialAndTempHours: (state) => {
      state = initialState;
    },
    setSpecialHours: (state, action) => {
      state.specialHours = action.payload;
    },
    setSunday: (state, action) => {
      state.sunday = action.payload;
    },
    setMonday: (state, action) => {
      state.monday = action.payload;
    },
    setTuesday: (state, action) => {
      state.tuesday = action.payload;
    },
    setWednesday: (state, action) => {
      state.wednesday = action.payload;
    },
    setThursday: (state, action) => {
      state.thursday = action.payload;
    },
    setFriday: (state, action) => {
      state.friday = action.payload;
    },
    setSaturday: (state, action) => {
      state.saturday = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsUpdating: (state, action) => {
      state.isUpdating = action.payload;
    },
    setLastUpdated: (state, action) => {
      state.lastUpdated = action.payload;
    },
  },
});

export const {
  resetSpecialAndTempHours,
  setSpecialHours,
  setSunday,
  setMonday,
  setTuesday,
  setWednesday,
  setThursday,
  setFriday,
  setSaturday,
  setError,
  setIsLoading,
  setIsUpdating,
  setLastUpdated,
} = specialAndTempHoursSlice.actions;
export default specialAndTempHoursSlice.reducer;
