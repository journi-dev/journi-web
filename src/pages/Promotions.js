import React, { useState } from "react";
import { TabTitle } from "../utils/TabTitle";
import { Box, Container, Modal, Typography } from "@mui/material";
import { Add, Discount, Lightbulb } from "@mui/icons-material";
import NewPromo from "../components/NewPromo";
import { CustomButton } from "../components/CustomComponents";
import { useTranslation } from "react-i18next";

const newPromoStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
};

export default function Promotions() {
  TabTitle("promotions");
  const { t } = useTranslation();
  const [openNewPromo, setOpenNewPromo] = useState(false);

  return (
    <Box>
      <Typography>{t("promotions")}</Typography>
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
        sx={{
          minHeight: 150,
          width: 500,
          borderRadius: 5,
          borderColor: "customBorderColor.main",
          borderStyle: "dashed",
          my: 2,
          userSelect: "none",
          // color: "customBorderColor.main", TODO: make customBorderColor.dark and color to that... maybe rename to placeholderColor. And also make icons secondary color. and turn this sx into a class called placeholder but add it to css so everyone can use it
        }}
      >
        <Discount />
        <Typography>
          You currently don't have any active promotions. Promotions are a great
          way to attract and increase business!
        </Typography>
        <Typography>
          {<Lightbulb />} Learn more about how to create and manage your
          promotions.
        </Typography>
      </Container>
      <Typography>Past Promotions</Typography>
    </Box>
  );
}
