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
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import format from "date-fns/format";
// import { enUS, es /* , zhCN, pl */ } from "date-fns/locale";
import {
  Home,
  BarChart,
  Share,
  Help,
  Logout,
  Settings,
  NotificationsNoneOutlined,
  Language,
  ManageAccounts,
  Edit,
  ChevronLeft,
  ChevronRight,
  Campaign,
} from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../context/features/User";
import Footer from "./Footer";
import { toggleDrawer } from "../../context/features/Appearance";
import { languages } from "../../utils/UIObjects";

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
    },
    pageContent: {
      minHeight: "100vh",
      padding: theme.spacing(5),
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
      // backgroundColor: "#1f2124",
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

export default function LoggedInLayout() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [time, setTime] = useState(new Date());
  const [weatherTemp, setWeatherTemp] = useState(0);
  const [weatherDesc, setWeatherDesc] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [anchorEl1, setAnchorEl1] = useState(null);

  const handleClick1 = (e) => {
    setAnchorEl1(e.currentTarget);
  };

  const handleClose1 = (e) => {
    setAnchorEl1(null);
  };

  const handleLogOut = () => {
    // e.preventDefault();
    dispatch(logOutUser(navigate));
  };

  // Time
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Weather
  useEffect(() => {
    // const abortCont = new AbortController();

    const getWeather = (lat, lon) => {
      const key = "727b45bf8760b5807a8376e5b36b63b0";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;
      // setTimeout(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
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
      // }, 1000);
    };

    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = (position) => {
      const coords = position.coords;
      const [lat, lon] = [coords.latitude, coords.longitude];
      /* console.log(
        `Location access granted. Using user's coordinates (${lat}, ${lon}).`
      ); */
      getWeather(lat, lon);
    };

    const error = (err) => {
      const [lat, lon] = [41.8781, -87.6298];
      /* console.log(
        `Error Code ${err.code}: ${err.message}. Using default coordinates (${lat}, ${lon}) instead.`
      ); */
      getWeather(lat, lon);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);

    // return () => abortCont.abort();
  }, []); // time, Make it every 5 minutes instead?

  const isDark = useSelector((state) => state.appearance.isDark);
  const isDrawerExpanded = useSelector(
    (state) => state.appearance.isDrawerExpanded
  );
  const language = useSelector((state) => state.language.selectedLanguage);
  const { t } = useTranslation();

  const menuItems = [
    {
      text: "home",
      icon: <Home color="sideDrawerIconColor" />,
      path: "/home",
      path2: "/",
    },
    {
      text: "updates",
      icon: <Campaign color="sideDrawerIconColor" />,
      path: "/updates",
    },
    {
      text: "analytics",
      icon: <BarChart color="sideDrawerIconColor" />,
      path: "/analytics",
    },
    {
      text: "social",
      icon: <Share color="sideDrawerIconColor" />,
      path: "/social",
    },
    {
      text: "support",
      icon: <Help color="sideDrawerIconColor" />,
      path: "/support",
    },
  ];
  const footerMenuItems = [
    {
      text: "settings",
      icon: <Settings color="sideDrawerIconColor" />,
      path: "/settings",
      action: () => {},
    },
    {
      text: "logOut",
      icon: <Logout color="sideDrawerIconColor" />,
      path: "/welcome",
      action: () => {
        handleLogOut();
      },
    },
  ];

  return (
    <div className={classes.root}>
      {/* Header */}
      <AppBar
        enableColorOnDark
        className={isDrawerExpanded ? classes.appBarOpen : classes.appBarClose}
        color="appBar"
        elevation={0}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => {
              dispatch(toggleDrawer(!isDrawerExpanded));
              localStorage.setItem(
                "isDrawerExpanded",
                JSON.stringify(!isDrawerExpanded)
              );
            }}
            sx={{ mr: 1 }}
          >
            {isDrawerExpanded ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>

          <Typography className={classes.date}>
            {format(time, "PPPP", { locale: languages[language].locale })}
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
        <Divider />
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl1}
        open={Boolean(anchorEl1)}
        onClose={handleClose1}
        onClick={handleClose1}
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
        <Link to="/home">
          <Container
            className={
              isDrawerExpanded
                ? isDark
                  ? "logo-expanded-dark"
                  : "logo-expanded-light"
                : isDark
                ? "logo-compressed-dark"
                : "logo-compressed-light"
            }
            alt="Journi Logo"
          />
        </Link>

        {/* Main Menu Options */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={t(item.text)}
              onClick={() => navigate(item.path)}
              className={
                location.pathname === item.path ||
                (item.path2 && location.pathname === item.path2)
                  ? classes.active
                  : null
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
              onClick={() => {
                navigate(item.path);
                item.action();
              }}
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
              {format(time, "h:mm a")}
            </Typography>
          )}
        </Box>
      </CustomDrawer>

      {/* Page Content */}
      <div className={classes.pageContainer}>
        {/* Page Content */}
        <div className={classes.pageContent}>
          <div className={classes.toolbar}></div>
          <Outlet />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
