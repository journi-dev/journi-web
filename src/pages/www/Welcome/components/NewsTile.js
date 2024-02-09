import { Box, ButtonBase, Typography } from "@mui/material";

export default function NewsTile({
  letter,
  label,
  tileColor,
  activeTile,
  setActiveTile,
  position = "center",
  borderRadius = 0,
}) {
  return (
    <ButtonBase
      onClick={() =>
        activeTile === letter ? setActiveTile(null) : setActiveTile(letter)
      }
      sx={{
        width: !activeTile ? "25%" : activeTile === letter ? "70%" : "10%",
        height: 500,
        bgcolor: `${tileColor}.main`,
        transition: "width 1s",
        borderRadius:
          position === "center"
            ? 0
            : position === "left"
            ? `${borderRadius}px 0 0 ${borderRadius}px`
            : position === "right"
            ? `0 ${borderRadius}px ${borderRadius}px 0`
            : 0,
      }}
    >
      <Box className="flex-col">
        <Typography variant="h1" align="center">
          {letter}
        </Typography>
        {(activeTile === letter || !activeTile) && (
          <Typography variant="h5" align="center">
            {label}
          </Typography>
        )}
      </Box>
    </ButtonBase>
  );
}
