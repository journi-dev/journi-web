import React, { useState } from "react";
import { TabTitle } from "../utils/TabTitle";
import { Box, Container, Modal, Typography } from "@mui/material";
import { Add, Discount } from "@mui/icons-material";
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
      width: "auto",
      display: "flex",
    },
    marginAutoItem: {
      margin: "auto",
    },
  };
});

const newPromoStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
};

export default function Updates({ isDark }) {
  TabTitle("updates");
  const { t } = useTranslation();
  const [openNewPromo, setOpenNewPromo] = useState(false);
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <div className="flex-col">
        <Typography>{t("updates")}</Typography>
        <Typography>{t("promotions")}</Typography>
        <Typography>{t("announcements")}</Typography>
        <CustomButton
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenNewPromo(true)}
        >
          New Promo
        </CustomButton>
        <Modal open={openNewPromo} onClose={() => setOpenNewPromo(false)}>
          <Box sx={newPromoStyle}>
            <NewPromo />
          </Box>
        </Modal>
        <Typography>Active Promotions</Typography>

        <Container
          className={`flex-col ${
            isDark ? "placeholder-dark" : "placeholder-light"
          }`}
          sx={{
            width: "40vw",
          }}

          //   /* color: "customBorderColor.main",
          // TODO: make customBorderColor.dark and color to that...
          // maybe rename to placeholderColor. ✅
          // And also make icons action color. ✅
          // and turn this sx into a class called placeholder ✅
          // but add it to css so everyone can use it */ ✅
        >
          <div className="flex-row">
            <Discount color="action" fontSize="large" sx={{ mb: 1 }} />
          </div>
          <div className="flex-row">
            <Typography textAlign="center">
              You currently don't have any active promotions. Promotions are a
              great way to attract and increase business!
            </Typography>
          </div>
        </Container>
        <Typography>Past Promotions</Typography>
      </div>
    </div>
  );
}
