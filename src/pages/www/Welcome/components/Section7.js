import { Box, Typography } from "@mui/material";
import React from "react";
import { CustomLargeButton } from "../../../../components/ui/CustomComponents";

export default function Section7({ classes }) {
  return (
    <Box className={classes} sx={{ width: "100%", bgcolor: "footer.main" }}>
      <Box className="flex-row-space">
        <Box className="flex-col" sx={{ width: "50%", gap: 2 }}>
          <Typography variant="h4">Digital marketing, simplfied.</Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Scelerisque felis imperdiet proin fermentum leo vel orci. Neque
            egestas congue quisque egestas.
          </Typography>
          <Box className="flex-row-start" gap={3}>
            <CustomLargeButton
              variant="outlined"
              color="button"
              sx={{ border: "1.5px solid" }}
              disableElevation
              onClick={() => {}}
            >
              <Typography
                variant="buttonTextOutlined"
                fontSize={20}
                sx={{ mx: 2 }}
              >
                Explore our features
              </Typography>
            </CustomLargeButton>
          </Box>
        </Box>
        <Box sx={{ bgcolor: "wheat", width: 500, height: 500 }} />
      </Box>
    </Box>
  );
}
