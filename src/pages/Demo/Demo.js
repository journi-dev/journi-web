import { Box, Typography } from "@mui/material";
import Lottie from "lottie-react";
import animationData from "../../assets/motion-graphics/25992-hand-scrolls-the-messages-on-the-phone.json";
import { WatsonTabTitle } from "../../utils/WatsonTabTitle";

export default function Demo() {
  WatsonTabTitle("Demo");
  return (
    <div>
      <Box className="flex-row" sx={{ height: "70vh" }}>
        <Box className="flex-col">
          <Typography variant="h2">Create. Control. Customize.</Typography>
          <Typography>
            You handle the content. We'll take care of the code.
          </Typography>
        </Box>
        <Lottie animationData={animationData} />
      </Box>
    </div>
  );
}
