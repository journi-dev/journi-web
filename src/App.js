import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import Home from "./pages/Home/Home";
import Updates from "./pages/Updates/Updates";
import Analytics from "./pages/Analytics/Analytics";
import Social from "./pages/Social/Social";
import Support from "./pages/Support/Support";
import AllSettings from "./pages/Settings/AllSettings";
import NotFound from "./pages/Error/NotFound";
import Welcome from "./pages/Welcome/Welcome";
import Products from "./pages/Products/Products";
import Pricing from "./pages/Pricing/Pricing";
import AboutUs from "./pages/AboutUs/AboutUs";
import LogIn from "./pages/LogIn/LogIn";
import Demo from "./pages/Demo/Demo";
import Layout from "./components/ui/Layout";
import { setAuthenticated } from "./context/features/User";
import BusinessInfo from "./pages/Settings/BusinessInfo/BusinessInfo";
import MenuAndRetail from "./pages/Settings/MenuAndRetail/MenuAndRetail";
import UsersAndPatrons from "./pages/Settings/UsersAndPatrons/UsersAndPatrons";
import AppAndWebsite from "./pages/Settings/AppAndWebsite";
import Integrations from "./pages/Settings/Integrations";
import GiftCards from "./pages/Settings/GiftCards";
import Billing from "./pages/Settings/Billing";
import Developers from "./pages/Settings/Developers";
import MyAccount from "./pages/Settings/MyAccount";
import ComingSoon from "./pages/ComingSoon/ComingSoon";
import WATTSNSettings from "./pages/Settings/WATTSNSettings";
import { useEffect } from "react";
import { changeAppearance, toggleDrawer } from "./context/features/Appearance";
import RequireAuth from "./components/ui/RequireAuth";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f5f5f5",
      paper: "#fff",
    },
    primary: {
      main: "#fc6",
      light: "#fc6",
      dark: "#fc6",
    },
    secondary: {
      // main: "#fe8a7e",
      main: "#ffc1b2",
    },
    tertiary: {
      main: "#c1554d",
    },
    welcomeAppBar: {
      main: "#fff",
    },
    customBackgroundColor: {
      main: "#e7e7e7",
    },
    placeholderColor: {
      main: "#ffebd2",
    },
    appBarButtonColor: {
      main: "#121212",
    },
    sideDrawerIconColor: {
      main: "#121212",
    },
    iconButton: {
      main: "#ff0000",
    },
  },
  typography: {
    fontFamily: "'avenir_nextregular', 'Arial', 'sans-serif'",
    h1: {
      fontFamily: "'avenir_nextheavy', 'Arial', 'sans-serif'",
    },
    h2: {
      fontFamily: "'avenir_nextbold', 'Arial', 'sans-serif'",
    },
    h3: {
      fontFamily: "'avenir_nextdemi_bold', 'Arial', 'sans-serif'",
    },
    h4: {
      fontFamily: "'avenir_nextmedium', 'Arial', 'sans-serif'",
    },
    /* h5: {
      fontFamily: "'avenir_nextregular', 'Arial', 'sans-serif'",
    },
    h6: {
      fontFamily: "'avenir_nextultra_light', 'Arial', 'sans-serif'",
    }, */
    h5: {
      fontFamily: "'avenir_nextdemi_bold', 'Arial', 'sans-serif'",
    },
    h6: {
      fontFamily: "'avenir_nextmedium', 'Arial', 'sans-serif'",
    },
    subtitle1: {
      fontFamily: "'avenir_nextdemi_bold', 'Arial', 'sans-serif'",
    },
    caption: {
      fontFamily: "'avenir_nextregular', 'Arial', 'sans-serif'",
    },
    appBarText: {
      fontFamily: "'avenir_nextdemi_bold', 'Arial', 'sans-serif'",
      color: "#000",
    },
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fc6",
      light: "#fc6",
      dark: "#fc6",
    },
    secondary: {
      // main: "#fe8a7e",
      main: "#ffc1b2",
    },
    tertiary: {
      main: "#3399ff",
    },
    quaternary: {
      main: "#c1554d",
    },
    welcomeAppBar: {
      main: "#0d0d0d",
    },
    customBackgroundColor: {
      main: "#2a2a2a",
    },
    placeholderColor: {
      main: "#2a2a2a",
    },
    appBarButtonColor: {
      main: "#fff",
    },
    sideDrawerIconColor: {
      main: "#fc6",
    },
    iconButton: {
      main: "#fff",
    },
  },
  typography: {
    fontFamily: "'avenir_nextregular', 'Arial', 'sans-serif'",
    h1: {
      fontFamily: "'avenir_nextheavy', 'Arial', 'sans-serif'",
    },
    h2: {
      fontFamily: "'avenir_nextbold', 'Arial', 'sans-serif'",
    },
    h3: {
      fontFamily: "'avenir_nextdemi_bold', 'Arial', 'sans-serif'",
    },
    h4: {
      fontFamily: "'avenir_nextmedium', 'Arial', 'sans-serif'",
    },
    /* h5: {
      fontFamily: "'avenir_nextregular', 'Arial', 'sans-serif'",
    },
    h6: {
      fontFamily: "'avenir_nextultra_light', 'Arial', 'sans-serif'",
    }, */
    h5: {
      fontFamily: "'avenir_nextdemi_bold', 'Arial', 'sans-serif'",
    },
    h6: {
      fontFamily: "'avenir_nextmedium', 'Arial', 'sans-serif'",
    },
    subtitle1: {
      fontFamily: "'avenir_nextdemi_bold', 'Arial', 'sans-serif'",
    },
    caption: {
      fontFamily: "'avenir_nextregular', 'Arial', 'sans-serif'",
    },
    appBarText: {
      fontFamily: "'avenir_nextdemi_bold', 'Arial', 'sans-serif'",
      color: "#000",
    },
  },
});

function App() {
  let dispatch = useDispatch();
  let authenticated = useSelector((state) => state.user.authenticated);
  const token = localStorage.FBIdToken;
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      // window.location.assign("/login"); // The token has expired.
      // history.push("/login"); // The token has expired.
      dispatch(setAuthenticated(false));
    } else {
      dispatch(setAuthenticated(true));
    }
  }

  const isDark = useSelector((state) => state.appearance.isDark);
  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    const localAppearance = localStorage.getItem("Appearance");
    const localIsDrawerExpanded = localStorage.getItem("isDrawerExpanded");
    if (localAppearance)
      dispatch(changeAppearance(JSON.parse(localAppearance)));
    if (localIsDrawerExpanded)
      dispatch(toggleDrawer(JSON.parse(localIsDrawerExpanded)));
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Box className="App">
            <Routes>
              {/* Home Route */}
              <Route
                path="/"
                element={<Layout authenticated={authenticated} />}
              >
                {/* Public Routes */}
                <Route path="welcome" element={<Welcome />} />
                <Route path="products" element={<Products />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="login" element={<LogIn />} />
                <Route path="demo" element={<Demo />} />

                {/* Protected Routes */}
                <Route element={<RequireAuth />}>
                  <Route path="home" element={<Home />} />
                  <Route path="updates" element={<Updates />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="social" element={<Social />} />
                  <Route path="support" element={<Support />} />

                  {/* Settings Route and Subroutes */}
                  <Route path="settings" element={<AllSettings />}>
                    <Route path="business-info" element={<BusinessInfo />} />
                    <Route path="menu" element={<MenuAndRetail />} />
                    <Route path="users" element={<UsersAndPatrons />} />
                    <Route path="my-app" element={<AppAndWebsite />} />
                    <Route path="integrations" element={<Integrations />} />
                    <Route path="gift-cards" element={<GiftCards />} />
                    <Route path="billing" element={<Billing />} />
                    <Route path="develop" element={<Developers />} />
                    <Route path="my-account" element={<MyAccount />} />
                    <Route
                      path="platform-settings"
                      element={<WATTSNSettings />}
                    />
                    <Route path="help" element={<ComingSoon />} />
                    <Route path="tasks" element={<ComingSoon />} />
                  </Route>
                </Route>

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
