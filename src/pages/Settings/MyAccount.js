import { Typography } from "@mui/material";
import React from "react";
import { WattsnTabTitle } from "../../utils/WattsnTabTitle";

export default function MyAccount() {
  WattsnTabTitle("My Account Settings");
  return (
    <div>
      <Typography variant="h5">My Account</Typography>
    </div>
  );
}
