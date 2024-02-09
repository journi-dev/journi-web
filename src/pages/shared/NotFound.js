import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { JourniTabTitle } from "../../utils/JourniTabTitle";

export default function NotFound() {
  JourniTabTitle("Uh oh!");

  return (
    <Box className="not-found">
      <Typography variant="h2">Uh-oh. 😞</Typography>
      <Typography>We can't find that page.</Typography>
      <Link to="/">Back to the home page...</Link>
    </Box>
  );
}
