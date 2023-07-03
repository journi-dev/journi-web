import { Typography } from "@mui/material";
import React from "react";
import { WattsnTabTitle } from "../../utils/WattsnTabTitle";

export default function Developers() {
  WattsnTabTitle("Developer Settings");
  return (
    <div>
      <Typography variant="h5">Developers</Typography>
    </div>
  );
}
