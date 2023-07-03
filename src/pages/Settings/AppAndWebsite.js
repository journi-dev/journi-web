import { Typography } from "@mui/material";
import React from "react";
import { WattsnTabTitle } from "../../utils/WattsnTabTitle";

export default function AppAndWebsite() {
  WattsnTabTitle("App & Website Settings");
  return (
    <div>
      <Typography variant="h5">App & Website</Typography>
      <Typography>website link</Typography>
      <Typography>App & website name</Typography>
      <Typography>support domain</Typography>
      <Typography>app name</Typography>
      <Typography>app icon</Typography>
      <Typography>favicon</Typography>
      <Typography>app store link</Typography>
    </div>
  );
}
