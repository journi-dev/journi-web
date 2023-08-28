import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sunday: [[null, null]],
  monday: [[null, null]],
  tuesday: [[null, null]],
  wednesday: [[null, null]],
  thursday: [[null, null]],
  friday: [[null, null]],
  saturday: [[null, null]],
};

export const hoursSlice = createSlice({
  name: "hours",
  initialState,
  reducers: {
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
  },
});

export const {
  reset,
  setSunday,
  setMonday,
  setTuesday,
  setWednesday,
  setThursday,
  setFriday,
  setSaturday,
} = hoursSlice.actions;
export default hoursSlice.reducer;
