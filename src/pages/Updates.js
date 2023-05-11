import React, { useState } from "react";
import { TabTitle } from "../utils/TabTitle";
import {
  Box,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import {
  Add,
  Announcement,
  Campaign,
  Discount,
  History,
} from "@mui/icons-material";
import NewPromo from "../components/NewPromo";
import { CustomButton } from "../components/CustomComponents";
import { useTranslation } from "react-i18next";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      display: "flex",
    },
    marginAutoContainer: {
      width: "100%",
    },
    marginAutoItem: {
      // margin: "0 auto",
      // justifyContent: "center",
    },
  };
});

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
};

export default function Updates({ isDark }) {
  TabTitle("updates");
  const { classes } = useStyles();
  const { t } = useTranslation();
  const [openNewPromo, setOpenNewPromo] = useState(false);
  const [openNewAnnouncement, setOpenNewAnnouncement] = useState(false);
  const [newButtonAnchor, setNewButtonAnchor] = useState(null);

  const newButtonAnchorOpen = Boolean(newButtonAnchor);

  const handleNewButtonClick = (e) => {
    setNewButtonAnchor(e.currentTarget);
  };

  const handleNewButtonClose = (e) => {
    setNewButtonAnchor(null);
  };

  return (
    <div className={classes.root}>
      {/* New Button Menu */}
      <Menu
        anchorEl={newButtonAnchor}
        open={newButtonAnchorOpen}
        onClose={handleNewButtonClose}
        onClick={handleNewButtonClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: 175,
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
        <MenuItem
          dense
          key="announcement"
          onClick={() => {
            setOpenNewAnnouncement(true);
            handleNewButtonClose();
          }}
        >
          <ListItemIcon>
            <Announcement />
          </ListItemIcon>
          {t("announcement")}
        </MenuItem>
        <MenuItem
          dense
          key="promotion"
          onClick={() => {
            setOpenNewPromo(true);
            handleNewButtonClose();
          }}
        >
          <ListItemIcon>
            <Discount />
          </ListItemIcon>
          {t("promotion")}
        </MenuItem>
      </Menu>

      <div className={classes.marginAutoContainer}>
        <div className={classes.marginAutoItem}>
          <div className="flex-row-space">
            <Typography variant="h5">{t("updates")}</Typography>

            <CustomButton
              variant="contained"
              startIcon={<Add />}
              onClick={handleNewButtonClick}
              sx={{ borderRadius: 10 }}
            >
              New
            </CustomButton>
          </div>

          {/* New Announcement */}
          <Modal
            open={openNewAnnouncement}
            onClose={() => setOpenNewAnnouncement(false)}
          >
            <Box sx={modalStyle}>
              <Typography textAlign="center">Coming soon!</Typography>
              <Typography textAlign="center">Stay tuned!</Typography>
            </Box>
          </Modal>

          {/* New Promo */}
          <Modal open={openNewPromo} onClose={() => setOpenNewPromo(false)}>
            <Box sx={modalStyle}>
              <NewPromo />
            </Box>
          </Modal>

          <Typography variant="h5">Active & Upcoming Updates</Typography>

          {/* Active & Upcoming Updates Placeholder */}
          <div className={classes.marginAutoItem}>
            <Container
              className={`flex-col ${
                isDark ? "placeholder-dark" : "placeholder-light"
              }`}
              sx={{
                width: "40vw",
              }}
            >
              <div className="flex-row">
                <Campaign color="action" fontSize="large" />
              </div>
              <div className="flex-row">
                <Typography variant="h5" sx={{ my: 1 }}>
                  Nothing to report yet!
                </Typography>
              </div>
              <Typography textAlign="center">
                You currently don't have any active promotions or announcements.
                Promotions are a great way to attract and increase business, and
                announcements help keep your patrons informed!
              </Typography>
              <div className="flex-row">
                <Typography textAlign="center" sx={{ mt: 1 }}>
                  Try creating either one today!
                </Typography>
              </div>
            </Container>
          </div>

          <Typography variant="h5">Past Updates</Typography>

          {/* Past Updates Placeholder */}
          <div className={classes.marginAutoItem}>
            <Container
              className={`flex-col ${
                isDark ? "placeholder-dark" : "placeholder-light"
              }`}
              sx={{
                width: "40vw",
              }}
            >
              <div className="flex-row">
                <History color="action" fontSize="large" />
              </div>
              <div className="flex-row">
                <Typography variant="h5" sx={{ my: 1 }}>
                  Nothing to report yet!
                </Typography>
              </div>
              <Typography textAlign="center">
                You currently don't have any past promotions or announcements.
                Promotions are a great way to attract and increase business, and
                announcements help keep your patrons informed!
              </Typography>
              <div className="flex-row">
                <Typography textAlign="center" sx={{ mt: 1 }}>
                  Try creating either one today!
                </Typography>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}
