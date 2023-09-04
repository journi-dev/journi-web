import { configureStore } from "@reduxjs/toolkit";
import appearanceReducer from "./features/Appearance";
import businessHoursReducer from "./features/BusinessHours";
import languageReducer from "./features/Language";
import settingsReducer from "./features/Settings";
import supportHoursReducer from "./features/SupportHours";
import userReducer from "./features/User";

export default configureStore({
  reducer: {
    appearance: appearanceReducer,
    businessHours: businessHoursReducer,
    language: languageReducer,
    settings: settingsReducer,
    supportHours: supportHoursReducer,
    user: userReducer,
  },
});
