import { Typography } from "@mui/material";
import React from "react";

export default function UsersAndPatrons() {
  return (
    <div>
      <Typography variant="h5">Users & Patrons</Typography>
      <Typography>patrons (see name, phone, email, send password reset)</Typography>
      <Typography>users (Customer service rep, manager, admin)</Typography>
    </div>
  );
}
