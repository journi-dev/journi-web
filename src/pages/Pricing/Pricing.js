import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { JourniTabTitle } from "../../utils/JourniTabTitle";

export default function Pricing() {
  JourniTabTitle("Pricing");
  return (
    <div>
      <Typography variant="h3">Pricing</Typography>
      <Typography>Choose what's right for your business.</Typography>
      <Box className="flex-row">
        <Paper className="flex-col" sx={{ width: "23em", p: 2, mx: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5">Lite</Typography>
            <Typography variant="caption">
              Keep up with the times while keeping costs low. Serve your patrons
              who already know you.
            </Typography>
          </Box>
          <Typography variant="subtitle1">What you pay...</Typography>
          <ul>
            <li>$500 setup fee</li>
            <li>3% fee on web orders</li>
          </ul>
          <Typography variant="subtitle1">What you get...</Typography>
          <ul>
            <li>A custom-built website full content customization</li>
            <li>
              Full access to Journi's X1 platform to track orders, patrons, and
              more
            </li>
            <li>
              A dedicated product manager to assist in managing your business'
              metrics and platform updates
            </li>
            <li>Support for your team from us Mon-Fri from 9 AM to 6 PM</li>
          </ul>
          <Typography>Get started</Typography>
        </Paper>

        <Paper className="flex-col" sx={{ width: "23em", p: 2, mx: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5">Plus</Typography>
            <Typography variant="caption">
              All the basics, plus a little more. Expand your patron base with
              higher discoverability and more digital mediums.
            </Typography>
          </Box>
          <Typography variant="subtitle1">What you pay...</Typography>
          <ul>
            <li>$750 setup fee</li>
            <li>5% fee on app and web orders</li>
          </ul>
          <Typography variant="subtitle1">What you also get...</Typography>
          <ul>
            <li>
              A custom-built, companion iOS and Android app, also with full
              content customization
            </li>
            <li>
              Integrations with other business and social media platforms to
              manage your business storefront and social presence, all from one
              place
            </li>
            <li>
              Support for both your team and your patrons during your business
              hours
            </li>
          </ul>
          <Typography>Get started</Typography>
        </Paper>

        <Paper className="flex-col" sx={{ width: "23em", p: 2, mx: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5">Max</Typography>
            <Typography variant="caption">
              Maximum sales, maximum metrics, maximum effort. Get everything
              that Journi has to offer to make your business stand out.
            </Typography>
          </Box>
          <Typography variant="subtitle1">What you pay...</Typography>
          <ul>
            <li>$750 setup fee</li>
            <li>10% fee on app and web orders</li>
          </ul>
          <Typography variant="subtitle1">What you also get...</Typography>
          <ul>
            <li>
              A dedicated marketing analyst to assist in maximizing your
              business' SEO and other marketing KPIs
            </li>
            <li>
              For the first 6 months, pay only 5% fees for each month that you
              don’t get at least 20 orders
            </li>
            <li>24/7 support for both your team and your patrons</li>
          </ul>
          <Typography>Get started</Typography>
        </Paper>
      </Box>
    </div>
  );
}
