import { WatsonTabTitle } from "../../utils/WatsonTabTitle";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  AccountCircle,
  CardGiftcard,
  CreditCard,
  Devices,
  DisplaySettings,
  // Help,
  // IntegrationInstructions,
  MenuBook,
  People,
  // Power,
  Storefront,
  // TaskAlt,
} from "@mui/icons-material";
import { makeStyles } from "tss-react/mui";
import { Link, Outlet, useLocation } from "react-router-dom";
import StickyBox from "react-sticky-box";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      width: "100%",
    },
    menuLink: {
      textDecoration: "none",
    },
    menuItem: {
      color: theme.palette.text.secondary,
      borderLeft: "2px solid rgba(255, 204, 102, 0)",
    },
    menuItemActive: {
      color: theme.palette.text.primary,
      borderLeft: "2px solid rgba(255, 204, 102, 1)",
    },
  };
});

export default function AllSettings() {
  WatsonTabTitle("settings");
  const { t } = useTranslation();
  const { classes } = useStyles();
  const location = useLocation();

  const settingsMenu = [
    {
      text: "Business Info",
      icon: <Storefront fontSize="inherit" color="itemButton" />,
      path: "/settings/business-info",
      keywords: [
        "Business info",
        "contact info",
        "external accounts",
        "business hours",
        "delivery & shipping",
      ],
    },
    {
      text: "Menu & Retail",
      icon: <MenuBook fontSize="inherit" color="itemButton" />,
      path: "/settings/menu",
      keywords: [""],
    },
    {
      text: "Users & Patrons",
      icon: <People fontSize="inherit" color="itemButton" />,
      path: "/settings/users",
      keywords: [""],
    },
    {
      text: "App & Website",
      icon: <Devices fontSize="inherit" color="itemButton" />,
      path: "/settings/my-app",
      keywords: [""],
    },
    // {
    //   text: "Integrations 🚧",
    //   icon: <Power fontSize="inherit" color="itemButton" />,
    //   path: "/settings/integrations",
    //   keywords: [""],
    // },
    {
      text: "Rewards & Gift Cards",
      icon: <CardGiftcard fontSize="inherit" color="itemButton" />,
      path: "/settings/gift-cards",
      keywords: [""],
    },
    {
      text: "Billing",
      icon: <CreditCard fontSize="inherit" color="itemButton" />,
      path: "/settings/billing",
      keywords: [""],
    },
    // {
    //   text: "Developers 🚧",
    //   icon: <IntegrationInstructions fontSize="inherit" color="itemButton" />,
    //   path: "/settings/develop",
    //   keywords: [""],
    // },
    {
      text: "Platform Settings",
      icon: <DisplaySettings fontSize="inherit" color="itemButton" />,
      path: "/settings/platform",
      keywords: [""],
    },
    // {
    //   text: "Get Support 🚧",
    //   icon: <Help fontSize="inherit" color="itemButton" />,
    //   path: "/settings/help",
    //   keywords: [""],
    // },
    // {
    //   text: "Tasks 🚧",
    //   icon: <TaskAlt fontSize="inherit" color="itemButton" />,
    //   path: "/settings/tasks",
    //   keywords: [""],
    // },
    {
      text: "My Account",
      icon: <AccountCircle fontSize="inherit" color="itemButton" />,
      path: "/settings/my-account",
      keywords: [""],
    },
  ];

  return (
    <Box className="flex-row-space">
      <Box className={classes.root}>
        {location.pathname === "/settings" ? (
          <Box>
            <Typography variant="h4" pb={2}>
              Settings
            </Typography>
            <Box className="flex-row">
              <Grid container spacing={3}>
                {settingsMenu.map((item, i) => (
                  <Grid key={i} item xs={12} sm={6} md={3}>
                    <Link to={item.path} className={classes.menuLink}>
                      <Paper sx={{ p: 2, height: 150 }}>
                        <Typography variant="h5" pb={1}>
                          {item.icon} {item.text}
                        </Typography>
                        <Typography color="text.secondary">{item.keywords.join(", ")}</Typography>
                      </Paper>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        ) : (
          <Outlet />
        )}
      </Box>
      <Box className="menu" sx={{ mx: 2, width: 150 }}>
        <StickyBox offsetTop={75}>
          <Typography
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            sx={{ ml: 1 }}
          >
            {t("settings")}
          </Typography>
          {settingsMenu.map((item) => (
            <Link key={item.path} to={item.path} className={classes.menuLink}>
              <Box
                className={`flex-row-start ${
                  location.pathname === item.path
                    ? classes.menuItemActive
                    : classes.menuItem
                }`}
                sx={{ my: 1, alignContent: "center" }}
              >
                <Typography variant="caption" sx={{ mx: 1 }}>
                  {item.icon}
                </Typography>
                <Typography variant="caption">{item.text}</Typography>
              </Box>
            </Link>
          ))}
        </StickyBox>
      </Box>
    </Box>
  );
}
