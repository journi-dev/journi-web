import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/User";
import appearanceReducer from "./features/Appearance";
import settingsReducer from "./features/Settings";

export default configureStore({
  reducer: {
    appearance: appearanceReducer,
    user: userReducer,
    settings: settingsReducer,
  },
});
