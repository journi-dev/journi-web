import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import LoggedInLayout from "./components/LoggedInLayout";
import Home from "./pages/Home";
import Updates from "./pages/Updates";
import Analytics from "./pages/Analytics";
import Social from "./pages/Social";
import Support from "./pages/Support";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import { useSelector } from "react-redux";
import LoggedOutLayout from "./components/LoggedOutLayout";
import Welcome from "./pages/Welcome";
import Products from "./pages/Products";
import Pricing from "./pages/Pricing";
import AboutUs from "./pages/AboutUs";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Demo from "./pages/Demo";
import jwtDecode from "jwt-decode";
import AuthRoute from "./utils/AuthRoute";

const lightThemeLoggedIn = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#fff8f0",
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
      main: "#000000",
    },
    customBackgroundColor: {
      main: "#e7e7e7",
    },
    placeholderColor: {
      main: "#ffebd2",
    },
    appBarButtonColor: {
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
      main: "#c1554d",
    },
    welcomeAppBar: {
      main: "#000000",
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
    caption: {
      fontFamily: "'avenir_nextregular', 'Arial', 'sans-serif'",
    },
    appBarText: {
      fontFamily: "'avenir_nextdemi_bold', 'Arial', 'sans-serif'",
      color: "#000",
    },
  },
});

const lightThemeLoggedOut = createTheme({
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
      main: "#000000",
    },
    customBackgroundColor: {
      main: "#e7e7e7",
    },
    placeholderColor: {
      main: "#ffebd2",
    },
    appBarButtonColor: {
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
  const appearance = useSelector((state) => state.appearance.value);
  const isDark =
    (window.matchMedia("(prefers-color-scheme:dark)").matches &&
      appearance === "system") ||
    appearance === "dark";
  const isLoggedIn = false;
  const theme = isDark
    ? darkTheme
    : isLoggedIn
    ? lightThemeLoggedIn
    : lightThemeLoggedOut;

  let authenticated;
  const token = localStorage.FBIdToken;
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      // The token has expired.
      window.location.href("/login");
      authenticated = false;
    } else {
      authenticated = true;
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <CssBaseline></CssBaseline>
        <Router>
          {!isLoggedIn && (
            <LoggedOutLayout>
              <Switch>
                <Route exact path="/">
                  {isLoggedIn ? <Home /> : <Welcome />}
                </Route>
                <Route exact path="/products" component={Products} />
                <Route exact path="/pricing" component={Pricing} />
                <Route exact path="/about" component={AboutUs} />
                <AuthRoute
                  exact
                  path="/login"
                  component={LogIn}
                  authenticated={authenticated}
                />
                <AuthRoute
                  exact
                  path="/signup"
                  component={SignUp}
                  authenticated={authenticated}
                />
                <Route exact path="/demo" component={Demo} />
                <Route exact path="*" component={NotFound} />
              </Switch>
            </LoggedOutLayout>
          )}
          {isLoggedIn && (
            <LoggedInLayout>
              <Box className="App">
                <Switch>
                  <Route exact path="/">
                    {isLoggedIn ? <Home /> : <Welcome />}
                  </Route>
                  <Route exact path="/updates">
                    <Updates isDark={isDark} />
                  </Route>
                  <Route exact path="/analytics">
                    <Analytics />
                  </Route>
                  <Route exact path="/social">
                    <Social />
                  </Route>
                  <Route exact path="/support">
                    <Support />
                  </Route>
                  <Route exact path="/settings">
                    <Settings />
                  </Route>
                  <Route exact path="*">
                    <NotFound />
                  </Route>
                </Switch>
              </Box>
            </LoggedInLayout>
          )}
        </Router>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
