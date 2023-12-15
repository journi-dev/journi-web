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
import WATSONSettings from "./pages/Settings/WATSONSettings";
import { useEffect } from "react";
import { changeAppearance, toggleDrawer } from "./context/features/Appearance";
import RequireAuth from "./components/ui/RequireAuth";

const sharedPalette = {
  primary: {
    main: "#fc6",
  },
  secondary: {
    main: "#001427",
  },
  tertiary: {
    main: "#ef233c",
  },
  quaternary: {
    main: "#7f95d1",
  },
  buttonStatic: {
    main: "#000",
  },
};
const sharedTypography = {
  fontFamily: "'avenir_nextregular', 'Arial', 'sans-serif'",
  h1: {
    fontFamily: "'avenir_nextbold', 'Arial', 'sans-serif'",
  },
  h2: {
    fontFamily: "'avenir_nextbold', 'Arial', 'sans-serif'",
  },
  h3: {
    fontFamily: "'avenir_nextdemi_bold', 'Arial', 'sans-serif'",
  },
  h4: {
    fontFamily: "'avenir_nextbold', 'Arial', 'sans-serif'",
  },
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
  buttonTextLight: {
    fontFamily: "'avenir_nextbold', 'Arial', 'sans-serif'",
    color: "#fff",
  },
  buttonTextDark: {
    fontFamily: "'avenir_nextbold', 'Arial', 'sans-serif'",
    color: "#000",
  },
};
const lightTheme = createTheme({
  palette: {
    mode: "light",
    ...sharedPalette,
    background: {
      default: "#fff",
      paper: "#f5f5f5",
    },
    appBar: {
      main: "#fff",
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
    button: {
      main: "#000",
    },
    footer: {
      main: "#f5f5f5",
    },
  },
  typography: {
    ...sharedTypography,
    appBarText: {
      fontFamily: "'avenir_nextmedium', 'Arial', 'sans-serif'",
      color: "#000",
    },
    buttonText: {
      fontFamily: "'avenir_nextbold', 'Arial', 'sans-serif'",
      color: "#fff",
    },
    coloredText1: {
      fontFamily: "'avenir_nextbold', 'Arial', 'sans-serif'",
      color: sharedPalette.secondary.main,
    },
    coloredText2: {
      fontFamily: "'avenir_nextbold', 'Arial', 'sans-serif'",
      color: sharedPalette.tertiary.main,
    },
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    ...sharedPalette,
    background: {
      default: sharedPalette.secondary.main,
      // paper: "#fff",
    },
    appBar: {
      main: sharedPalette.secondary.main,
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
    button: {
      main: "#fff",
    },
    footer: {
      main: "#001122",
    },
  },
  typography: {
    ...sharedTypography,
    appBarText: {
      fontFamily: "'avenir_nextmedium', 'Arial', 'sans-serif'",
      color: "#fff",
    },
    buttonText: {
      fontFamily: "'avenir_nextbold', 'Arial', 'sans-serif'",
      color: "#000",
    },
    coloredText1: {
      fontFamily: "'avenir_nextbold', 'Arial', 'sans-serif'",
      color: "#fff",
    },
    coloredText2: {
      fontFamily: "'avenir_nextbold', 'Arial', 'sans-serif'",
      color: sharedPalette.primary.main,
    },
  },
});

function App() {
  let dispatch = useDispatch();
  const isDark = useSelector((state) => state.appearance.isDark);
  const theme = isDark ? darkTheme : lightTheme;
  const authenticated = useSelector((state) => state.user.authenticated);

  useEffect(() => {
    const localAppearance = localStorage.getItem("Appearance");
    const localIsDrawerExpanded = localStorage.getItem("isDrawerExpanded");
    const token = localStorage.FBIdToken;
    if (localAppearance)
      dispatch(changeAppearance(JSON.parse(localAppearance)));
    if (localIsDrawerExpanded)
      dispatch(toggleDrawer(JSON.parse(localIsDrawerExpanded)));
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
  }, [dispatch]);

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
                <Route path="/" element={<Welcome />} />
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
                      element={<WATSONSettings />}
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
