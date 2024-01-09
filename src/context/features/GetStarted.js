import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: null,
  lastName: null,
  phone: "+1",
  email: "",
  jobTitle: null,
  leadSource: "",
  // -------------------- //
  selectedPlatforms: [],
  hasApp: "",
  hasWeb: "",
  isRequestingMarketing: "",
  // -------------------- //
  orgName: "",
  orgSize: "",
  selectedCategories: [],
  locationCount: 1,
  // -------------------- //
  isStep1Complete: false,
  isStep2Complete: false,
  isStep3Complete: false,
};

export const getStartedSlice = createSlice({
  name: "getStarted",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setJobTitle: (state, action) => {
      state.jobTitle = action.payload;
    },
    setLeadSource: (state, action) => {
      state.leadSource = action.payload;
    },
    // ------------------------------ //
    setSelectedPlatforms: (state, action) => {
      state.selectedPlatforms = action.payload;
    },
    setHasApp: (state, action) => {
      state.hasApp = action.payload;
    },
    setHasWeb: (state, action) => {
      state.hasWeb = action.payload;
    },
    setIsRequestingMarketing: (state, action) => {
      state.isRequestingMarketing = action.payload;
    },
    // ------------------------------ //
    setOrgName: (state, action) => {
      state.orgName = action.payload;
    },
    setOrgSize: (state, action) => {
      state.orgSize = action.payload;
    },
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
    },
    setLocationCount: (state, action) => {
      state.locationCount = action.payload;
    },
    // ------------------------------ //
    setIsStep1Complete: (state, action) => {
      state.isStep1Complete = action.payload;
    },
    setIsStep2Complete: (state, action) => {
      state.isStep2Complete = action.payload;
    },
    setIsStep3Complete: (state, action) => {
      state.isStep3Complete = action.payload;
    },
  },
});

export const {
  reset,
  setFirstName,
  setLastName,
  setPhone,
  setEmail,
  setJobTitle,
  setLeadSource,
  setSelectedPlatforms,
  setHasApp,
  setHasWeb,
  setIsRequestingMarketing,
  setIsStep1Complete,
  setIsStep2Complete,
  setIsStep3Complete,
  setOrgName,
  setOrgSize,
  setSelectedCategories,
  setLocationCount,
  setRequiresPlatformPerLocation,
} = getStartedSlice.actions;
export default getStartedSlice.reducer;
