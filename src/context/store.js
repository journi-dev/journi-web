import { configureStore } from "@reduxjs/toolkit";
import appearanceReducer from "./features/Appearance";
import businessHoursReducer from "./features/BusinessHours";
import getStartedReducer from "./features/GetStarted";
import languageReducer from "./features/Language";
import settingsReducer from "./features/Settings";
import specialAndTempHoursReducer from "./features/SpecialAndTempHours";
import supportHoursReducer from "./features/SupportHours";
import userReducer from "./features/User";

export default configureStore({
  reducer: {
    appearance: appearanceReducer,
    businessHours: businessHoursReducer,
    getStarted: getStartedReducer,
    language: languageReducer,
    settings: settingsReducer,
    specialAndTempHours: specialAndTempHoursReducer,
    supportHours: supportHoursReducer,
    user: userReducer,
  },
});
