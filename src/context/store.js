import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/User";
import appearanceReducer from "./features/Appearance";
import languageReducer from "./features/Language";
import settingsReducer from "./features/Settings";

export default configureStore({
  reducer: {
    appearance: appearanceReducer,
    language: languageReducer,
    settings: settingsReducer,
    user: userReducer,
  },
});
