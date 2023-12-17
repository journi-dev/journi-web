import { Box, Typography } from "@mui/material";
import React from "react";
import { CustomLargeButton } from "../../../components/ui/CustomComponents";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Section11({ classes }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box className={classes} sx={{ width: "100%", bgcolor: "primary.main" }}>
      <Box className="flex-row-space">
        <Box className="flex-col" sx={{ width: "50%", gap: 2 }}>
          <Typography variant="h4" color="black">
            Your Journi starts here. Let's get to work.
          </Typography>
          <Box>
            <CustomLargeButton
              variant="contained"
              color="buttonStatic"
              disableElevation
              onClick={() => navigate("/demo")}
            >
              <Typography
                variant="buttonTextLight"
                fontSize={20}
                sx={{ mx: 2 }}
              >
                {t("getStarted")}
              </Typography>
            </CustomLargeButton>
          </Box>
        </Box>

        <Box sx={{ bgcolor: "wheat", width: 500, height: 250 }} />
      </Box>
    </Box>
  );
}
