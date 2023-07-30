import { AppBar, Box, Toolbar, Typography, Fab } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { QuestionMark } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { CustomButton } from "./CustomComponents";
import { useSelector } from "react-redux";
import Footer from "./Footer";

const footerHeight = 100;

const useStyles = makeStyles()((theme) => {
  return {
    pageContainer: {
      display: "flex",
      flexFlow: "column",
      width: "100%",
      minHeight: "100vh",
    },
    pageContent: {
      padding: theme.spacing(3),
      flex: "1 1 auto",
      height: "auto",
    },
    root: {
      display: "flex",
      // flexDirection: 'column',
    },
    active: {
      background: theme.palette.mode === "dark" ? "#574523" : "#FFF2D8",
      borderRadius: "10px",
    },
    title: {
      padding: theme.spacing(2),
    },
    test: {
      border: (note) => {
        if (note.category === "work") return "1px solid red"; // In order to use this properly, do const { classes } = useStyles(note);
      },
    },
    appBar: {
      width: "100%",
      // flex: "0 1 auto",
    },
    toolbar: theme.mixins.toolbar,
    appBarLeft: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: theme.spacing(2),
      /* backgroundColor: (note) => {
                if (note.category === 'work') return yellow[700]
            } */
    },
    button: {
      borderRadius: 50,
    },
    menuLink: {
      textDecoration: "none",
    },
    menuItem: {
      color: theme.palette.text.primary,
    },
    menuItemActive: {
      color: "appBarButtonColor",
    },
  };
});

export default function LoggedOutLayout() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const isDark = useSelector((state) => state.appearance.value.isDark);

  const { t } = useTranslation();

  const appBarItems = [
    {
      text: "products",
      path: "/products",
    },
    {
      text: "pricing",
      path: "/pricing",
    },
    {
      text: "resources",
      path: "/resources",
    },
    {
      text: "company",
      path: "/company",
    },
  ];

  return (
    <div className={classes.root}>
      {/* Header */}
      <AppBar
        enableColorOnDark
        className={classes.appBar}
        color="welcomeAppBar"
        elevation={0}
        sx={{ py: 0 }}
      >
        <Toolbar>
          <Link className={classes.appBarLeft} to="/">
            <Box
              className={isDark ? "logo-expanded-dark" : "logo-expanded-light"}
              alt="Journi Logo"
            />
          </Link>

          <Box className={classes.appBarLeft} sx={{ display: "flex" }}>
            {appBarItems.map((item) => (
              <Link
                className={classes.menuLink}
                key={item.text}
                to={item.path}
                color={
                  location.pathname === item.path
                    ? "primary"
                    : "appBarButtonColor"
                }
                disableElevation
              >
                <Box
                  className={`${classes.menuItem} ${
                    location.pathname === item.path
                      ? isDark
                        ? "toolbar-button-dark-active"
                        : "toolbar-button-light-active"
                      : isDark
                      ? "toolbar-button-dark"
                      : "toolbar-button-light"
                  }`}
                  sx={{ mx: 2 }}
                >
                  <Typography color="action" sx={{ px: 2, pb: 1 }}>
                    {t(item.text)}
                  </Typography>
                </Box>
              </Link>
            ))}
          </Box>

          <CustomButton
            variant={location.pathname === "/login" ? "contained" : "outlined"}
            className={`${classes.button}`}
            color={"appBarButtonColor"}
            disableElevation
            onClick={() => navigate("/login")}
          >
            <Typography
              variant="caption"
              fontWeight="bold"
              color={
                location.pathname === "/login"
                  ? isDark
                    ? "black"
                    : "white"
                  : isDark
                  ? "white"
                  : "black"
              }
            >
              {t("logIn")}
            </Typography>
          </CustomButton>

          <CustomButton
            variant={location.pathname === "/signup" ? "contained" : "outlined"}
            className={`${classes.button}`}
            color={"appBarButtonColor"}
            disableElevation
            onClick={() => navigate("/signup")}
            sx={{ mx: 2 }}
          >
            <Typography
              variant="caption"
              fontWeight="bold"
              color={
                location.pathname === "/signup"
                  ? isDark
                    ? "black"
                    : "white"
                  : isDark
                  ? "white"
                  : "black"
              }
            >
              {t("getStarted")}
            </Typography>
          </CustomButton>

          <CustomButton
            variant={location.pathname === "/demo" ? "contained" : "outlined"}
            className={classes.button}
            color={
              !isDark && location.pathname !== "/demo"
                ? "appBarButtonColor"
                : "primary"
            }
            disableElevation
            onClick={() => navigate("/demo")}
          >
            <Typography variant="caption" fontWeight="bold">
              {t("demo")}
            </Typography>
          </CustomButton>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <div className={classes.pageContainer}>
        {/* Page Content */}
        <div className={classes.pageContent}>
          <div className={classes.toolbar}></div>
          <Outlet />
          <Fab
            color="primary"
            sx={{
              position: "absolute",
              bottom: footerHeight + 25,
              right: 25,
            }}
          >
            <QuestionMark />
          </Fab>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
