import { AppBar, Box, Toolbar, Typography, Fab, Divider } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { QuestionMark } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { CustomButton } from "./CustomComponents";
import { useSelector } from "react-redux";
import Footer from "./Footer";

const useStyles = makeStyles()((theme) => {
  return {
    pageContainer: {
      display: "flex",
      flexFlow: "column",
      width: "100%",
      minHeight: "100vh",
    },
    pageContent: {
      // padding: theme.spacing(5),
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
  const isDark = useSelector((state) => state.appearance.isDark);
  // const footerHeight = 100;

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
      text: "about us",
      path: "/about",
    },
  ];

  return (
    <div className={classes.root}>
      {/* Header */}
      <AppBar
        enableColorOnDark
        className={classes.appBar}
        color="appBar"
        elevation={0}
        sx={{ py: 0 }}
      >
        <Toolbar>
          {/* Logo */}
          <Link className={classes.appBarLeft} to="/">
            <Box
              className={isDark ? "logo-expanded-dark" : "logo-expanded-light"}
              alt="Journi Logo"
            />
          </Link>

          {/* Toolbar Links */}
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
                  <Typography
                    variant="appBarText"
                    color="action"
                    sx={{ px: 2, pb: 1 }}
                  >
                    {t(item.text)}
                  </Typography>
                </Box>
              </Link>
            ))}
          </Box>

          {/* "Log in" button */}
          <Link
            className={classes.menuLink}
            to={"/login"}
            color={
              location.pathname === "/login" ? "primary" : "appBarButtonColor"
            }
          >
            <Box
              className={`${classes.menuItem} ${
                location.pathname === "/login"
                  ? isDark
                    ? "toolbar-button-dark-active"
                    : "toolbar-button-light-active"
                  : isDark
                  ? "toolbar-button-dark"
                  : "toolbar-button-light"
              }`}
              sx={{ mx: 2 }}
            >
              <Typography
                variant="appBarText"
                color="action"
                sx={{ px: 2, pb: 1 }}
              >
                {t("logIn")}
              </Typography>
            </Box>
          </Link>

          {/* "Get started" button */}
          <CustomButton
            variant={"contained"}
            color={isDark ? "button" : "secondary"}
            disableElevation
            onClick={() => navigate("/getting-started")}
          >
            <Typography variant="buttonText">{t("getStarted")}</Typography>
          </CustomButton>
        </Toolbar>
        <Divider />
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
              borderRadius: 2,
              position: "fixed",
              bottom: 30,
              right: 30,
            }}
          >
            <QuestionMark />
          </Fab>
        </div>

        <Footer />
      </div>
    </div>
  );
}
