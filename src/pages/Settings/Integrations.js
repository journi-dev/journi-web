import { Typography } from "@mui/material";
import React from "react";
import { WattsnTabTitle } from "../../utils/WattsnTabTitle";

export default function Integrations() {
  WattsnTabTitle("Integration Settings");
  return (
    <div>
      <Typography variant="h5">Integrations</Typography>
      Facebook
      Instagram
      X
      Threads
      YouTube
      LinkedIn
      Yelp
      Uber Eats
      Doordash
      Grubhub
      Postmates
      Mailchimp
      Constant Contact
    </div>
  );
}
