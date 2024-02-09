import { Box, Typography } from "@mui/material";
import React from "react";
import { CustomLargeButton } from "../../../../components/ui/CustomComponents";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Section5({ classes }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box className={classes} sx={{ width: "100%", bgcolor: "primary.main" }}>
      <Box className="flex-row-space">
        <Box className="flex-col" sx={{ width: "50%", gap: 2 }}>
          <Typography variant="h4" color="black">
            An app and website just for you.
          </Typography>
          <Typography color="black">
            Your app, your website, your platform, your way. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Scelerisque felis
            imperdiet proin fermentum leo vel orci. Neque egestas congue quisque
            egestas.
          </Typography>
          <Box className="flex-row-start" gap={3}>
            <CustomLargeButton
              variant="contained"
              color="buttonStatic"
              disableElevation
              onClick={() => navigate("/getting-started")}
            >
              <Typography
                variant="buttonTextLight"
                fontSize={20}
                sx={{ mx: 2 }}
              >
                {t("getStarted")}
              </Typography>
            </CustomLargeButton>
            <CustomLargeButton
              variant="outlined"
              color="buttonStatic"
              sx={{ border: "1.5px solid" }}
              disableElevation
              onClick={() => {}}
            >
              <Typography variant="buttonTextDark" fontSize={20} sx={{ mx: 2 }}>
                Learn more
              </Typography>
            </CustomLargeButton>
          </Box>
        </Box>

        <Box sx={{ bgcolor: "wheat", width: 500, height: 500 }} />
      </Box>
    </Box>
  );
}
