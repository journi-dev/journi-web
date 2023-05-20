import React from "react";
import {
  AppBar,
  Avatar,
  Drawer,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider,
  CircularProgress,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  Container,
  styled,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { Link, useHistory, useLocation } from "react-router-dom";
import format from "date-fns/format";
import {
  Home,
  BarChart,
  Share,
  Help,
  Logout,
  Settings,
  /* Notifications, */ NotificationsNoneOutlined,
  LightMode,
  Language,
  Favorite,
  Code,
  ManageAccounts,
  Edit,
  BugReport,
  DarkMode,
  SettingsBrightness,
  // MenuRounded,
  ChevronLeft,
  ChevronRight,
  Campaign,
} from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  AmericanFlag,
  // ChineseFlag,
  // PolishFlag,
  SpanishFlag,
} from "./CircleFlags";
import { CustomButton } from "./CustomComponents";
import { useDispatch, useSelector } from "react-redux";
import { changeAppearance } from "../utils/redux/features/Appearance";

const drawerWidth = 240;
const footerHeight = 100;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)})`,
  },
});

const CustomDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

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
    drawerOpen: {
      width: drawerWidth,
    },
    drawerClose: {
      width: 0,
    },
    drawerPaperOpen: {
      width: drawerWidth,
    },
    drawerPaperClose: {
      width: 0,
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
    appBarOpen: {
      width: `calc(100% - ${drawerWidth}px)`,
      // flex: "0 1 auto",
    },
    appBarClose: {
      width: `calc(100% - ${theme.spacing(7)})`,
      // flex: "0 1 auto",
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: theme.spacing(2),
      /* backgroundColor: (note) => {
                if (note.category === 'work') return yellow[700]
            } */
    },
    flexCol: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    flexColWithStart: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
    },
    flexRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      margin: "0px 0px 15px 0px",
    },
    flexRowWithStart: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "start",
    },
  };
});

export default function Layout({ children }) {
  const { classes } = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const appearance = useSelector((state) => state.appearance.value);

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

  const [time, setTime] = useState(new Date());
  const [weatherTemp, setWeatherTemp] = useState(0);
  const [weatherDesc, setWeatherDesc] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [language, setLanguage] = useState(languages["en"]);

  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);

  const [isDrawerExpanded, setIsDrawerExpanded] = useState(false);

  // const [appearance, setAppearance] = useState("system");

  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);

  const handleClick1 = (e) => {
    setAnchorEl1(e.currentTarget);
  };

  const handleClick2 = (e) => {
    setAnchorEl2(e.currentTarget);
  };

  const handleClick3 = (e) => {
    setAnchorEl3(e.currentTarget);
  };

  const handleClose1 = (e) => {
    setAnchorEl1(null);
  };

  const handleClose2 = (e) => {
    setAnchorEl2(null);
  };

  const handleClose3 = (e) => {
    setAnchorEl3(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // const abortCont = new AbortController();
    const [lat, lon, key] = [
      String(41.8781),
      String(-87.6298),
      "727b45bf8760b5807a8376e5b36b63b0",
    ];
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;
    setTimeout(() => {
      fetch(url /* { signal: abortCont.signal } */)
        .then((response) => response.json())
        // .then((res) => {
        //   if (!res.ok) throw Error("Error fetching data");
        // })
        .then((data) => {
          console.log(data);
          setWeatherTemp(data.main.temp);
          setWeatherDesc(data.weather[0].description);
          setWeatherIcon(
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
          );
          setIsLoading(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          }
          setError(err.message);
          setIsLoading(false);
        });
    }, 1000);

    // return () => abortCont.abort();
  }, []); // time, Make it every 5 minutes instead?

  const { t, i18n } = useTranslation();

  const menuItems = [
    {
      text: "home",
      icon: <Home color="primary" />,
      path: "/",
    },
    {
      text: "updates",
      icon: <Campaign color="primary" />,
      path: "/updates",
    },
    {
      text: "analytics",
      icon: <BarChart color="primary" />,
      path: "/analytics",
    },
    {
      text: "social",
      icon: <Share color="primary" />,
      path: "/social",
    },
    {
      text: "support",
      icon: <Help color="primary" />,
      path: "/support",
    },
  ];
  const footerMenuItems = [
    {
      text: "settings",
      icon: <Settings color="primary" />,
      path: "/settings",
    },
    {
      text: "logOut",
      icon: <Logout color="primary" />,
      path: "/welcome",
    },
  ];

  return (
    <div className={classes.root}>
      {/* Header */}
      <AppBar
        className={isDrawerExpanded ? classes.appBarOpen : classes.appBarClose}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setIsDrawerExpanded(!isDrawerExpanded)}
            sx={{ mr: 1 }}
          >
            {isDrawerExpanded ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
          <Typography className={classes.date}>
            {t(format(time, "EEE").toLowerCase())},{" "}
            {language.nativeName === "Spanish"
              ? `${format(time, "d")} de `
              : ""}
            {t(format(time, "MMM").toLowerCase())}{" "}
            {language.nativeName !== "Spanish" ? format(time, "d") : ""}
            {t(format(time, "Y"))}
          </Typography>
          <Typography sx={{ mr: 2 }}>
            {time.getHours() < 12
              ? t("goodMorning")
              : time.getHours() < 18
              ? t("goodAfternoon")
              : t("goodEvening")}
            , Jamal
          </Typography>
          <Tooltip title={t("notifications")}>
            <IconButton>
              <NotificationsNoneOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("myAccount")}>
            <IconButton onClick={handleClick1}>
              <Avatar src="/stockProfilePicture.jpg" />
            </IconButton>
          </Tooltip>
          {/* <Navbar /> */}
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl1}
        open={open1}
        onClose={handleClose1}
        onClick={handleClose1}
        PaperProps={{
          elevation: 0,
          sx: {
            width: 250,
            overflow: "visible",
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
        <Box className={classes.flexRowWithStart} sx={{ ml: 1.5, mb: 1.5 }}>
          {/* Profile Picture */}
          <Badge
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={
              <IconButton sx={{ width: 20, height: 20 }}>
                <Edit sx={{ width: 15, height: 15 }} />
              </IconButton>
            }
            color="secondary"
            overlap="circular"
          >
            <Box
              component="img"
              sx={{
                height: 50,
                width: 50,
                borderRadius: 25,
              }}
              alt="Jamal Riley"
              src="/stockProfilePicture.jpg"
            />
          </Badge>

          {/* Name and Email */}
          <Box className={classes.flexCol} sx={{ ml: 2 }}>
            <Typography fontWeight="bold">Jamal Riley</Typography>
            <Typography>test@test.com</Typography>
          </Box>
        </Box>

        <MenuItem onClick={handleClose1}>
          <ListItemIcon>
            <ManageAccounts fontSize="small" />
          </ListItemIcon>
          {t("myAccount")}
        </MenuItem>

        <MenuItem onClick={handleClose1}>
          <ListItemIcon>
            <Language fontSize="small" />
          </ListItemIcon>
          Language: English
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleClose1}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t("logOut")}
        </MenuItem>
      </Menu>

      {/* Language Menu */}
      <Menu
        anchorEl={anchorEl2}
        open={open2}
        onClose={handleClose2}
        onClick={handleClose2}
        PaperProps={{
          elevation: 0,
          sx: {
            width: 150,
            overflow: "visible",
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
            width: 160,
            overflow: "visible",
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
              dispatch(changeAppearance(appearances[mode].name));
              // newAppearance(appearances[mode].name);
              handleClose3();
            }}
          >
            <ListItemIcon>{appearances[mode].icon}</ListItemIcon>
            {t(appearances[mode].name)}
          </MenuItem>
        ))}
      </Menu>

      {/* Side Drawer */}
      <CustomDrawer
        className={isDrawerExpanded ? classes.drawerOpen : classes.drawerClose}
        anchor="left"
        variant="permanent"
        open={isDrawerExpanded}
        // onClick={() => setIsDrawerExpanded(!isDrawerExpanded)}
        classes={{
          paper: isDrawerExpanded
            ? classes.drawerPaperOpen
            : classes.drawerPaperClose,
        }}
      >
        <Link to="/">
          <Container
            className={isDrawerExpanded ? "logo-expanded" : "logo-compressed"}
            alt="Journi Logo"
          />
        </Link>

        {/* Main Menu Options */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={t(item.text)}
              onClick={() => history.push(item.path)}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={t(item.text)}></ListItemText>
            </ListItem>
          ))}
        </List>

        {/* Bottom Menu Options */}
        <List sx={{ mt: "auto" }}>
          {footerMenuItems.map((item) => (
            <ListItem
              button
              key={t(item.text)}
              onClick={() => history.push(item.path)}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={t(item.text)}></ListItemText>
            </ListItem>
          ))}
        </List>

        {/* Weather and Time */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            my: 1,
          }}
        >
          {/* Weather */}
          {error && <Typography>{error}</Typography>}
          {isLoading && <CircularProgress />}
          {weatherIcon && (
            <Box
              sx={{
                display: "flex",
                flexDirection: isDrawerExpanded ? "row" : "column",
                justifyContent: "center",
                alignItems: "center",
                mb: isDrawerExpanded ? 0 : 1,
              }}
            >
              <Box
                component="img"
                sx={{
                  width: 40,
                  height: 40,
                  userSelect: "none",
                }}
                alt={weatherDesc}
                src={weatherIcon}
              />

              <Typography sx={{ userSelect: "none" }}>
                {Math.round(weatherTemp)}° F
              </Typography>
            </Box>
          )}

          {isDrawerExpanded && (
            <Divider flexItem orientation="vertical" sx={{ my: 1 }} />
          )}

          {/* Time */}
          {isDrawerExpanded && (
            <Typography sx={{ userSelect: "none" }}>
              {format(time, "h:mm")}{" "}
              {Number(format(time, "H")) < 12 ? "AM" : "PM"}
            </Typography>
          )}
        </Box>
      </CustomDrawer>

      {/* Page Content */}
      <div className={classes.pageContainer}>
        {/* Page Content */}
        <div className={classes.pageContent}>
          <div className={classes.toolbar}></div>
          {children}
        </div>

        {/* Footer */}
        <Paper className={classes.footer} elevation={0} sx={{ mt: 1 }}>
          {/* Footer Menu */}
          <Box className={classes.flexRow}>
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
              startIcon={language.icon}
            >
              <Typography variant="caption" color="text.primary">
                {t("language")}: {t(language.name)}
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
          <Box className={classes.flexRow} sx={{ userSelect: "none" }}>
            <Typography variant="caption" sx={{ mr: 1 }}>
              &#169; {format(time, "yyyy")} Journi R&D
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
