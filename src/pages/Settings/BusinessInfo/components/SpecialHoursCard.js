import { Paper, Typography } from "@mui/material";

export default function SpecialHoursCard() {
  return (
    <Paper elevation={3} sx={{ width: "13rem", p: 2 }}>
      {/* To-Do: Make it say "adjusted hours" or "closed" depending on the hours */}
      <Typography fontSize={14} fontWeight="bold" display="block">
        September 4, 2023
      </Typography>
      <Typography
        fontSize={13}
        fontWeight="bold"
        display="block"
        sx={{ mb: 1 }}
      >
        Labor Day
      </Typography>
      <Typography variant="caption" display="block">
        12:00 AM-12:00 PM
      </Typography>
      <Typography variant="caption" display="block">
        12:00 AM-12:00 PM
      </Typography>
    </Paper>
  );
}
