import { Box, Typography } from "@mui/material";

export const Step2 = () => {
  return (
    <Box
      className="flex-col"
      sx={{ p: 2, gap: 2, width: "100%", height: "100%" }}
    >
      {/* Label */}
      <Typography variant="h5" component="h3">
        Next, tell us how we can help.
      </Typography>
    </Box>
  );
};
