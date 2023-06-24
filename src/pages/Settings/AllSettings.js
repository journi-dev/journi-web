import { TabTitle } from "../../utils/TabTitle";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  AccountCircle,
  CardGiftcard,
  CreditCard,
  Devices,
  DisplaySettings,
  Help,
  IntegrationInstructions,
  MenuBook,
  People,
  Power,
  Storefront,
  TaskAlt,
} from "@mui/icons-material";
import { makeStyles } from "tss-react/mui";
import { Link, Outlet, useLocation } from "react-router-dom";
import StickyBox from "react-sticky-box";

const useStyles = makeStyles()((theme) => {
  return {
    menu: {
      position: "relative",
    },
    menuItem: {
      textDecoration: "none",
      color: theme.palette.text.secondary,
      borderLeft: "2px solid rgba(255, 204, 102, 0)",
    },
    menuItemActive: {
      textDecoration: "none",
      color: theme.palette.text.primary,
      borderLeft: "2px solid rgba(255, 204, 102, 1)",
    },
  };
});

export default function AllSettings() {
  TabTitle("settings");
  const { t } = useTranslation();
  const { classes } = useStyles();
  const location = useLocation();

  const settingsMenu = [
    {
      text: "Business Info",
      icon: <Storefront fontSize="small" color="itemButton" />,
      path: "/settings/business-info",
    },
    {
      text: "Menu & Retail",
      icon: <MenuBook fontSize="small" color="itemButton" />,
      path: "/settings/menu",
    },
    {
      text: "Users & Patrons",
      icon: <People fontSize="small" color="itemButton" />,
      path: "/settings/users",
    },
    {
      text: "App & Website",
      icon: <Devices fontSize="small" color="itemButton" />,
      path: "/settings/my-app",
    },
    {
      text: "Integrations",
      icon: <Power fontSize="small" color="itemButton" />,
      path: "/settings/integrations",
    },
    {
      text: "Gift Cards",
      icon: <CardGiftcard fontSize="small" color="itemButton" />,
      path: "/settings/gift-cards",
    },
    {
      text: "Billing",
      icon: <CreditCard fontSize="small" color="itemButton" />,
      path: "/settings/billing",
    },
    {
      text: "Develop",
      icon: <IntegrationInstructions fontSize="small" color="itemButton" />,
      path: "/settings/develop",
    },
    {
      text: "Journi Settings",
      icon: <DisplaySettings fontSize="small" color="itemButton" />,
      path: "/settings/platform-settings",
    },

    {
      text: "Get Support",
      icon: <Help fontSize="small" color="itemButton" />,
      path: "/settings/help",
    },
    {
      text: "Task Management",
      icon: <TaskAlt fontSize="small" color="itemButton" />,
      path: "/settings/tasks",
    },
    {
      text: "My Account",
      icon: <AccountCircle fontSize="small" color="itemButton" />,
      path: "/settings/my-account",
    },
  ];

  return (
    <Box className="flex-row-space">
      <Outlet />
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
            <Box sx={{ my: 1 }}>
              <Link
                to={item.path}
                className={
                  location.pathname === item.path
                    ? classes.menuItemActive
                    : classes.menuItem
                }
              >
                <Typography variant="caption" sx={{ mx: 1 }}>
                  {item.icon}
                </Typography>
                <Typography variant="caption">{item.text}</Typography>
              </Link>
            </Box>
          ))}
        </StickyBox>
      </Box>
    </Box>
  );
}
