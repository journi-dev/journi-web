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
  Discount,
  EventBusy,
  History,
} from "@mui/icons-material";
import NewAnnouncement from "../components/NewAnnouncement";
import NewBlockoutDates from "../components/NewBlockoutDates";
import NewPromo from "../components/NewPromo";
import { CustomButton } from "../components/CustomComponents";
import { useTranslation } from "react-i18next";
import { makeStyles } from "tss-react/mui";
import PromotionCards from "../components/PromotionCards";

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

export default function Updates() {
  TabTitle("updates");
  const { classes } = useStyles();
  const { t } = useTranslation();
  const [openNewAnnouncement, setOpenNewAnnouncement] = useState(false);
  const [openNewBlockoutDates, setOpenNewBlockoutDates] = useState(false);
  const [openNewPromo, setOpenNewPromo] = useState(false);
  const [newButtonAnchor, setNewButtonAnchor] = useState(null);
  // const [promos, setPromos] = useState([]);

  const newButtonAnchorOpen = Boolean(newButtonAnchor);

  /* const promotionsCollectionsRef = collection(
    db,
    "organizations/uncle-johns/promotions"
  ); */

  const handleNewButtonClick = (e) => {
    setNewButtonAnchor(e.currentTarget);
  };

  const handleNewButtonClose = () => setNewButtonAnchor(null);
  const handleNewAnnouncementClose = () => setOpenNewAnnouncement(false);
  const handleNewBlockoutDatesClose = () => setOpenNewBlockoutDates(false);
  const handleNewPromoClose = () => setOpenNewPromo(false);

  /* const deletePromotion = async (id) => {
    const promoDoc = doc(db, "organizations/uncle-johns/promotions", id);
    await deleteDoc(promoDoc);
  }; */

  /* const updatePromotion = async (id, newParams) => {
    const promoDoc = doc(db, "organizations/uncle-johns/promotions", id);
    await updateDoc(promoDoc, { ...newParams });
  }; */

  /* useEffect(() => {
    const getPromotions = async () => {
      // Read the data
      // Set the promo list
      try {
        const data = await getDocs(promotionsCollectionsRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // console.log(filteredData);
        setPromos(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getPromotions();
  }); // TODO: set dependency to be based on submit button in modal and delete buttons. Solve with prop drilling or Redux (ideally the latter) */

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
          key="blockout-dates"
          onClick={() => {
            setOpenNewBlockoutDates(true);
            handleNewButtonClose();
          }}
        >
          <ListItemIcon>
            <EventBusy />
          </ListItemIcon>
          {t("blockoutDate")}
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
              {t("new")}
            </CustomButton>
          </div>

          {/* New Announcement Modal */}
          <Modal
            open={openNewAnnouncement}
            onClose={() => setOpenNewAnnouncement(false)}
          >
            <Box sx={modalStyle}>
              <NewAnnouncement
                // onSubmit={getPromotions}
                onClose={handleNewAnnouncementClose}
              />
            </Box>
          </Modal>

          {/* New Blockout Dates Modal */}
          <Modal
            open={openNewBlockoutDates}
            onClose={() => setOpenNewBlockoutDates(false)}
          >
            <Box sx={modalStyle}>
              <NewBlockoutDates
                // onSubmit={getPromotions}
                onClose={handleNewBlockoutDatesClose}
              />
            </Box>
          </Modal>

          {/* New Promo Modal */}
          <Modal open={openNewPromo} onClose={handleNewPromoClose}>
            <Box sx={modalStyle}>
              <NewPromo
                // onSubmit={getPromotions}
                onClose={handleNewPromoClose}
              />
            </Box>
          </Modal>

          {/* Active & Upcoming Updates Placeholder */}
          <Typography variant="h5">Active & Upcoming Updates</Typography>

          <PromotionCards />

          {/* Past Updates Placeholder */}
          <Typography variant="h5">Past Updates</Typography>
          <div className={classes.marginAutoItem}>
            <Container
              className="placeholder-light"
              sx={{
                width: "40vw",
              }}
            >
              <div className="flex-row">
                <History color="action" fontSize="large" />
              </div>
              <div className="flex-row">
                <Typography variant="h5" sx={{ my: 1 }}>
                  {t("nothingHereYet")}
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
