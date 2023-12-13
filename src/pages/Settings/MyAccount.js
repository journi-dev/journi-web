import { Typography } from "@mui/material";
import React from "react";
import { WatsonTabTitle } from "../../utils/WatsonTabTitle";

export default function MyAccount() {
  WatsonTabTitle("My Account Settings");
  return (
    <div>
      <Typography variant="h5">My Account</Typography>
    </div>
  );
}
