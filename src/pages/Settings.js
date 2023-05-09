import React from "react";
import { TabTitle } from "../utils/TabTitle";
import { Box, Typography } from "@mui/material";
import GiftCardSettings from "../components/GiftCardSettings";
import { useTranslation } from "react-i18next";

export default function Settings() {
  TabTitle("settings");
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="h3">{t("settings")}</Typography>
      <GiftCardSettings />
    </Box>
  );
}
