import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  // displayName: "",
  isLoading: false,
  authenticated: false,
  errors: {},
  lastUpdated: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setLastUpdated: (state, action) => {
      state.lastUpdated = action.payload;
    },
  },
});

export const {
  reset,
  setIsLoading,
  setAuthenticated,
  setErrors,
  setLastUpdated,
} = userSlice.actions;
export default userSlice.reducer;

export const signUpUser = (newUserData) => (dispatch) => {
  dispatch(setIsLoading(true));

  axios
    .post("/createUser", newUserData)
    .then((response) => {
      // setAuthorizationHeader(response.data.token);
      dispatch(setIsLoading(false));
      dispatch(setLastUpdated(new Date().getTime()));
      // dispatch(setAuthenticated(true));
    })
    .catch((err) => {
      console.error(err);
      dispatch(setErrors(err.response.data.errors));
      dispatch(setIsLoading(false));
    });
};

export const logInWithEmail = (userData, navigate, from) => (dispatch) => {
  dispatch(setIsLoading(true));
  axios
    .post("/login/email", userData)
    .then((response) => {
      setAuthorizationHeader(response.data.token);
      dispatch(setIsLoading(false));
      dispatch(setAuthenticated(true));
      navigate(from, { replace: true });
    })
    .catch((err) => {
      console.error(err);
      dispatch(setErrors(err.response.data.errors));
      dispatch(setIsLoading(false));
    });
};

export const logOutUser = (navigate) => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch(setAuthenticated(false));
  navigate("/login");
};

export const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
