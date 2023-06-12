import {
  BrowserRouter as Router,
  // Routes,
  Route,
  Switch,
} from "react-router-dom";
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
import Settings from "./pages/Settings/Settings";
import NotFound from "./pages/Error/NotFound";
import Welcome from "./pages/Welcome/Welcome";
import Products from "./pages/Products/Products";
import Pricing from "./pages/Pricing/Pricing";
import AboutUs from "./pages/AboutUs/AboutUs";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import Demo from "./pages/Demo/Demo";
import AuthRoute from "./utils/AuthRoute";
import Layout from "./components/ui/Layout";
import { setAuthenticated } from "./context/features/User";
import BusinessInfo from "./pages/Settings/BusinessInfo";
import Menu from "./pages/Settings/Menu";
import UsersAndPatrons from "./pages/Settings/UsersAndPatrons";
import AppAndWebsite from "./pages/Settings/AppAndWebsite";
import Integrations from "./pages/Settings/Integrations";
import GiftCards from "./pages/Settings/GiftCards";
import Billing from "./pages/Settings/Billing";
import Developers from "./pages/Settings/Developers";
import MyAccount from "./pages/Settings/MyAccount";

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
      main: "#3399ff",
    },
    quaternary: {
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

  const isDark = useSelector((state) => state.appearance.value.isDark);
  const theme = isDark
    ? darkTheme
    : authenticated
    ? lightThemeLoggedIn
    : lightThemeLoggedOut;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <CssBaseline></CssBaseline>
        <Router>
          <Layout authenticated={authenticated}>
            <Box className="App">
              <Switch>
                {/* Home Route */}
                <Route
                  exact
                  path="/"
                  component={authenticated ? Home : Welcome}
                />

                {/* Logged In Routes */}
                <Route exact path="/home" component={Home} />

                <AuthRoute
                  path="/updates"
                  component={Updates}
                  authenticated={!authenticated}
                />
                <AuthRoute
                  path="/analytics"
                  component={Analytics}
                  authenticated={!authenticated}
                />
                <AuthRoute
                  path="/social"
                  component={Social}
                  authenticated={!authenticated}
                />
                <AuthRoute
                  path="/support"
                  component={Support}
                  authenticated={!authenticated}
                />

                {/* Settings Route and Subroutes */}
                <AuthRoute
                  path="/settings"
                  component={Settings}
                  authenticated={!authenticated}
                >
                  <AuthRoute
                    path="/settings/business-info"
                    component={BusinessInfo}
                    authenticated={!authenticated}
                  />

                  <AuthRoute
                    path="/settings/menu"
                    component={Menu}
                    authenticated={!authenticated}
                  />

                  <AuthRoute
                    path="/settings/users"
                    component={UsersAndPatrons}
                    authenticated={!authenticated}
                  />

                  <AuthRoute
                    path="/settings/my-app"
                    component={AppAndWebsite}
                    authenticated={!authenticated}
                  />

                  <AuthRoute
                    path="/settings/integrations"
                    component={Integrations}
                    authenticated={!authenticated}
                  />

                  <AuthRoute
                    path="/settings/gift-cards"
                    component={GiftCards}
                    authenticated={!authenticated}
                  />

                  <AuthRoute
                    path="/settings/billing"
                    component={Billing}
                    authenticated={!authenticated}
                  />

                  <AuthRoute
                    path="/settings/develop"
                    component={Developers}
                    authenticated={!authenticated}
                  />

                  <AuthRoute
                    path="/settings/my-account"
                    component={MyAccount}
                    authenticated={!authenticated}
                  />
                </AuthRoute>

                {/* Logged Out Routes */}
                <Route exact path="/welcome" component={Welcome} />
                <Route exact path="/products" component={Products} />
                <Route exact path="/pricing" component={Pricing} />
                <Route exact path="/about" component={AboutUs} />
                <AuthRoute
                  path="/login"
                  component={LogIn}
                  authenticated={authenticated}
                  redirectPath="/home"
                />
                <AuthRoute
                  path="/signup"
                  component={SignUp}
                  authenticated={authenticated}
                  redirectPath="/home"
                />
                <Route exact path="/demo" component={Demo} />

                {/* Not Found Route */}
                <Route exact path="*" component={NotFound} />
              </Switch>
            </Box>
          </Layout>
        </Router>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
