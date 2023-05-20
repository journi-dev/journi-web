import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.user.value);
  return (
    <div>
      <Typography variant="h5">Profile</Typography>
      <Typography>
        {!user.firstName
          ? user.displayName
          : user.firstName + " " + user.lastName}
      </Typography>
      <Typography>Logged in as: {user.email}</Typography>
    </div>
  );
}
