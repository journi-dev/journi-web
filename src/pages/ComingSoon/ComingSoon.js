import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { TabTitle } from "../../utils/TabTitle";

export default function ComingSoon() {
  TabTitle("Coming Soon!");

  return (
    <Box>
      <Typography variant="h2">Coming soon! 😁</Typography>
      <Typography>This page is in the works!</Typography>
      <Link to="/">For now, head back to the home page...</Link>
    </Box>
  );
}
