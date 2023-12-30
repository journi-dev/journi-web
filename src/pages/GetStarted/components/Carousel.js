import { Box, Paper } from "@mui/material";

export default function Carousel({ steps, step }) {
  return (
    <Paper
      sx={{
        width: "100%",
        height: "90%",
        overflowX: "hidden",
        overflowY: "scroll",
      }}
    >
      <Box className="flex-col">
        <Box
          className="flex-row"
          sx={{
            width: `${100 * steps.length}%`,
            transform: `translate(-${(step * 100) / 3}%)`,
            transition: "transform 0.5s",
          }}
        >
          {steps.map((item) => item.component)}
        </Box>

        {/* Progress Bar */}
        <Box
          bgcolor="primary.main"
          sx={{
            borderRadius: step / steps.length === 1 ? "0" : "0 10px 10px 0",
            width: `${Math.round((step / steps.length) * 100)}%`,
            height: "7px",
            transition: "width 0.5s",
          }}
        />
      </Box>
    </Paper>
  );
}
