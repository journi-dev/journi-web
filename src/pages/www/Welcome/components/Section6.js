import { Box, Typography } from "@mui/material";
import React from "react";
import { CustomLargeButton } from "../../../../components/ui/CustomComponents";

export default function Section6({ classes }) {
  return (
    <Box className={classes} sx={{ width: "100%" }}>
      <Box className="flex-row-space">
        <Box sx={{ bgcolor: "wheat", width: 500, height: 500 }} />
        <Box className="flex-col" sx={{ width: "50%", gap: 2 }}>
          <Typography variant="h4">Small business, big results.</Typography>
          <Typography>
            Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Scelerisque felis
            imperdiet proin fermentum leo vel orci. Neque egestas congue quisque
            egestas.
          </Typography>
          <Box className="flex-row-start" gap={3}>
            <CustomLargeButton
              variant="outlined"
              color="button"
              sx={{ border: "1.5px solid" }}
              disableElevation
              onClick={() => {}}
            >
              <Typography variant="buttonTextOutlined" fontSize={20} sx={{ mx: 2 }}>
                See our results
              </Typography>
            </CustomLargeButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
