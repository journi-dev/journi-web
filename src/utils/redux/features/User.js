import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  firstName: "",
  lastName: "",
  displayName: "",
  email: "",
  password: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    createUser: (state, action) => {
      state.value = action.payload;
    },
    logOut: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const { createUser, logOut } = userSlice.actions;
export default userSlice.reducer;
