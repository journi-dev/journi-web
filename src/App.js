import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { setAuthenticated } from "./context/features/User";
import { useEffect } from "react";
import { changeAppearance, toggleDrawer } from "./context/features/Appearance";
import { getApp } from "./utils/Helpers";

const sharedPalette = {
  primary: {
    main: "#fc6",
  },
  secondary: {
    main: "#121212",
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
    buttonTextColor: {
      main: "#fff",
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
    buttonTextRegular: {
      fontFamily: "'avenir_nextmedium', 'Arial', 'sans-serif'",
      color: "#fff",
    },
    buttonTextOutlined: {
      fontFamily: "'avenir_nextbold', 'Arial', 'sans-serif'",
      color: "#000",
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
      // paper: "#001122",
      paper: "#121212",
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
    buttonTextColor: {
      main: "#000",
    },
    footer: {
      main: "#000",
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
    buttonTextRegular: {
      fontFamily: "'avenir_nextmedium', 'Arial', 'sans-serif'",
      color: "#000",
    },
    buttonTextOutlined: {
      fontFamily: "'avenir_nextbold', 'Arial', 'sans-serif'",
      color: "#fff",
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

  const CurrApp = getApp();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <BrowserRouter>
            <CurrApp />
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
