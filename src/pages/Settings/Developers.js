import { Typography } from "@mui/material";
import React from "react";
import { WatsonTabTitle } from "../../utils/WatsonTabTitle";

export default function Developers() {
  WatsonTabTitle("Developer Settings");
  return (
    <div>
      <Typography variant="h5">Developers</Typography>
    </div>
  );
}
