// import { useState } from "react";
import { TabTitle } from "../../utils/TabTitle";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
// import { storage } from "../../utils/Firebase";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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
import { Link, Outlet } from "react-router-dom";

const useStyles = makeStyles()((theme) => {
  return {
    menuItem: {
      width: 250,
      height: 125,
      backgroundColor: theme.palette.tertiary.main,
      color: "#fff",
      borderRadius: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  };
});

export default function Settings() {
  TabTitle("settings");
  const { t } = useTranslation();
  const { classes } = useStyles();
  // const imageListRef = ref(storage, "projectFiles");

  /* const uploadFile = async () => {
    if (!fileUpload) return;
    const imageRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(imageRef, fileUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    } catch (err) {
      console.error(err);
    }
  }; */

  /* useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }); */

  // const [fileUpload, setFileUpload] = useState(null);
  // const [imageList, setImageList] = useState([]);

  const settingsMenu = [
    {
      text: "Business Info",
      icon: <Storefront fontSize="large" color="itemButton" />,
      path: "/settings/business-info",
    },
    {
      text: "Menu & Retail",
      icon: <MenuBook fontSize="large" color="itemButton" />,
      path: "/settings/menu",
    },
    {
      text: "Users & Patrons",
      icon: <People fontSize="large" color="itemButton" />,
      path: "/settings/users",
    },
    {
      text: "App & Website",
      icon: <Devices fontSize="large" color="itemButton" />,
      path: "/settings/my-app",
    },
    {
      text: "Integrations",
      icon: <Power fontSize="large" color="itemButton" />,
      path: "/settings/integrations",
    },
    {
      text: "Gift Cards",
      icon: <CardGiftcard fontSize="large" color="itemButton" />,
      path: "/settings/gift-cards",
    },
    {
      text: "Billing",
      icon: <CreditCard fontSize="large" color="itemButton" />,
      path: "/settings/billing",
    },
    {
      text: "Develop",
      icon: <IntegrationInstructions fontSize="large" color="itemButton" />,
      path: "/settings/develop",
    },
    {
      text: "Journi Settings",
      icon: <DisplaySettings fontSize="large" color="itemButton" />,
      path: "/settings/platform-settings",
    },

    {
      text: "Get Support",
      icon: <Help fontSize="large" color="itemButton" />,
      path: "/settings/help",
    },
    {
      text: "Task Management",
      icon: <TaskAlt fontSize="large" color="itemButton" />,
      path: "/settings/tasks",
    },
    {
      text: "My Account",
      icon: <AccountCircle fontSize="large" color="itemButton" />,
      path: "/settings/my-account",
    },
  ];

  return (
    <Box>
      <Typography variant="h5">{t("settings")}</Typography>
      <Grid container>
        {settingsMenu.map((item) => (
          <Grid item xs={12} sm={6} md={3}>
            <Link to={item.path}>
              <Container className={classes.menuItem} sx={{ my: 2 }}>
                {item.icon}
                <Typography variant="h6">{item.text}</Typography>
              </Container>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Outlet />
    </Box>
  );
}
