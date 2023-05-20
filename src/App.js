import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Updates from "./pages/Updates";
import Analytics from "./pages/Analytics";
import Social from "./pages/Social";
import Support from "./pages/Support";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
// import { useState } from "react";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import { useSelector } from "react-redux";

const lightTheme = createTheme({
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
    customBackgroundColor: {
      main: "#e7e7e7",
    },
    placeholderColor: {
      main: "#ffebd2",
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
    }, */
    h5: {
      fontFamily: "'avenir_nextdemi_bold', 'Arial', 'sans-serif'",
    },
    h6: {
      fontFamily: "'avenir_nextultra_light', 'Arial', 'sans-serif'",
    },
    variant1: {
      fontFamily: "'avenir_nextregular', 'Arial', 'sans-serif'",
      color: "#fc6",
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
    customBackgroundColor: {
      main: "#2a2a2a",
    },
    placeholderColor: {
      main: "#2a2a2a",
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
    }, */
    h5: {
      fontFamily: "'avenir_nextdemi_bold', 'Arial', 'sans-serif'",
    },
    h6: {
      fontFamily: "'avenir_nextultra_light', 'Arial', 'sans-serif'",
    },
    variant1: {
      fontFamily: "'avenir_nextregular', 'Arial', 'sans-serif'",
      color: "#fc6",
    },
  },
});

function App() {
  const appearance = useSelector((state) => state.appearance.value);
  const isDark =
    (window.matchMedia("(prefers-color-scheme:dark)").matches &&
      appearance === "system") ||
    appearance === "dark";
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <CssBaseline></CssBaseline>
        <Router>
          <Layout>
            <Box className="App">
              <Profile />
              <Auth />
              <Switch>
                <Route exact path="/">
                  <Home />
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
          </Layout>
        </Router>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
