import { configureStore } from "@reduxjs/toolkit";
import appearanceReducer from "./features/Appearance";
import hoursReducer from "./features/Hours";
import languageReducer from "./features/Language";
import settingsReducer from "./features/Settings";
import userReducer from "./features/User";

export default configureStore({
  reducer: {
    appearance: appearanceReducer,
    hours: hoursReducer,
    language: languageReducer,
    settings: settingsReducer,
    user: userReducer,
  },
});
