import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  ListItemIcon,
  Paper,
  Divider,
  Menu,
  MenuItem,
  Fab,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import format from "date-fns/format";
import {
  LightMode,
  Favorite,
  Code,
  BugReport,
  DarkMode,
  SettingsBrightness,
  QuestionMark,
} from "@mui/icons-material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AmericanFlag,
  // ChineseFlag,
  // PolishFlag,
  SpanishFlag,
} from "../icons/CircleFlags";
import { CustomButton } from "./CustomComponents";
import { useDispatch, useSelector } from "react-redux";
import { changeAppearance } from "../../context/features/Appearance";

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
    footer: {
      width: "100%",
      display: "flex",
      flex: `0 1 ${footerHeight}px`,
      flexDirection: "column",
      justifyContent: "center",
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
  };
});

export default function LoggedOutLayout() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const appearance = useSelector((state) => state.appearance.value.mode);

  const languages = {
    en: { name: "english", nativeName: "English", icon: <AmericanFlag /> },
    es: { name: "spanish", nativeName: "Spanish", icon: <SpanishFlag /> },
    // pl: { name: "polish", nativeName: "Polish", icon: <PolishFlag /> },
    // cn: { name: "chinese", nativeName: "Chinese", icon: <ChineseFlag /> },
  };
  const appearances = {
    light: { name: "light", icon: <LightMode color="action" /> },
    dark: { name: "dark", icon: <DarkMode color="action" /> },
    system: {
      name: "system",
      icon: <SettingsBrightness color="action" />,
    },
  };

  const [language, setLanguage] = useState(languages["en"]);

  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);

  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);

  const handleClick2 = (e) => {
    setAnchorEl2(e.currentTarget);
  };

  const handleClick3 = (e) => {
    setAnchorEl3(e.currentTarget);
  };

  const handleClose2 = (e) => {
    setAnchorEl2(null);
  };

  const handleClose3 = (e) => {
    setAnchorEl3(null);
  };

  const { t, i18n } = useTranslation();

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
        className={classes.appBar}
        color="welcomeAppBar"
        elevation={0}
        sx={{ py: 0 }}
      >
        <Toolbar>
          <Link className={classes.appBarLeft} to="/">
            <Box className="logo-expanded" alt="Journi Logo" />
          </Link>

          <Box className={classes.appBarLeft}>
            {appBarItems.map((item) => (
              <CustomButton
                key={item.text}
                color={
                  location.pathname === item.path
                    ? "primary"
                    : "appBarButtonColor"
                }
                disableElevation
                onClick={() => navigate(item.path)}
                sx={{ mx: 2 }}
              >
                <Box
                  className={
                    location.pathname === item.path
                      ? "toolbar-button-active"
                      : "toolbar-button"
                  }
                >
                  <Typography sx={{ px: 2, pb: 1 }}>{t(item.text)}</Typography>
                </Box>
              </CustomButton>
            ))}
          </Box>
          <CustomButton
            variant="outlined"
            className={classes.button}
            color={
              location.pathname === "/login" ? "primary" : "appBarButtonColor"
            }
            disableElevation
            onClick={() => navigate("/login")}
          >
            <Typography variant="caption">{t("logIn")}</Typography>
          </CustomButton>
          <CustomButton
            variant="outlined"
            className={classes.button}
            color={
              location.pathname === "/signup" ? "primary" : "appBarButtonColor"
            }
            disableElevation
            onClick={() => navigate("/signup")}
            sx={{ mx: 2 }}
          >
            <Typography variant="caption">{t("getStarted")}</Typography>
          </CustomButton>
          <CustomButton
            variant="contained"
            className={classes.button}
            disableElevation
            onClick={() => navigate("/demo")}
          >
            <Typography variant="caption" fontWeight="bold">
              {t("demo")}
            </Typography>
          </CustomButton>
        </Toolbar>
      </AppBar>

      {/* Language Menu */}
      <Menu
        anchorEl={anchorEl2}
        open={open2}
        onClose={handleClose2}
        onClick={handleClose2}
        PaperProps={{
          elevation: 0,
          sx: {
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {Object.keys(languages).map((lang) => (
          <MenuItem
            dense
            key={languages[lang].name}
            sx={{
              fontWeight: i18n.resolvedLanguage === lang ? "bold" : "normal",
            }}
            type="submit"
            onClick={() => {
              i18n.changeLanguage(lang);
              handleClose2();
              setLanguage(languages[lang]);
            }}
          >
            <ListItemIcon>{languages[lang].icon}</ListItemIcon>
            {t(languages[lang].name)}
          </MenuItem>
        ))}
      </Menu>

      {/* Appearance Menu */}
      <Menu
        anchorEl={anchorEl3}
        open={open3}
        onClose={handleClose3}
        onClick={handleClose3}
        PaperProps={{
          elevation: 0,
          sx: {
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {Object.keys(appearances).map((mode) => (
          <MenuItem
            dense
            key={mode}
            type="submit"
            onClick={() => {
              const newAppearance = appearances[mode].name;
              dispatch(changeAppearance(newAppearance));
              localStorage.setItem("Appearance", JSON.stringify(newAppearance));
              handleClose3();
            }}
          >
            <ListItemIcon>{appearances[mode].icon}</ListItemIcon>
            {t(appearances[mode].name)}
          </MenuItem>
        ))}
      </Menu>

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
        <Paper className={classes.footer} elevation={0} sx={{ mt: 1 }}>
          {/* Footer Menu */}
          <Box className="flex-row" sx={{ mb: 1 }}>
            <CustomButton size="small">
              <Typography variant="caption" color="text.primary">
                {t("termsOfService")}
              </Typography>
            </CustomButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <CustomButton size="small">
              <Typography variant="caption" color="text.primary">
                {t("privacyPolicy")}
              </Typography>
            </CustomButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <CustomButton startIcon={<BugReport color="action" />} size="small">
              <Typography variant="caption" color="text.primary">
                {t("reportABug")}
              </Typography>
            </CustomButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <CustomButton
              onClick={handleClick2}
              size="small"
              startIcon={languages[localStorage.getItem("i18nextLng")].icon}
            >
              <Typography variant="caption" color="text.primary">
                {t("language")}:{" "}
                {t(languages[localStorage.getItem("i18nextLng")].name)}
              </Typography>
            </CustomButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <CustomButton
              onClick={handleClick3}
              size="small"
              startIcon={appearances[appearance].icon}
            >
              <Typography variant="caption" color="text.primary">
                {t("appearance")}: {t(appearance)}
              </Typography>
            </CustomButton>
          </Box>

          {/* Company Details */}
          <Box className="flex-row" sx={{ userSelect: "none", mb: 1 }}>
            <Typography variant="caption" sx={{ mr: 1 }}>
              &#169; {format(new Date(), "yyyy")} Journi R&D
            </Typography>
            {/* <Divider orientation="vertical" flexItem sx={{ mx: 1 }} /> */}
            <Code fontSize="small" sx={{ ml: 1 }} />
            <Typography variant="caption" sx={{ mx: 1 }}>
              {t("with")}
            </Typography>
            <Favorite fontSize="small" />
          </Box>
        </Paper>
      </div>
    </div>
  );
}
