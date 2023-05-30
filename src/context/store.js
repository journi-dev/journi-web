import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/User";
import appearanceReducer from "./features/Appearance";

export default configureStore({
  reducer: {
    appearance: appearanceReducer,
    user: userReducer,
  },
});
