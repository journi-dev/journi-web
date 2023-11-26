import { Box, SvgIcon } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { ReactComponent as ThreadsIconLight } from "../../assets/images/icons/threads-light.svg";
import { ReactComponent as ThreadsIconDark } from "../../assets/images/icons/threads-dark.svg";

const useStyles = makeStyles()((theme) => {
  return {
    svgWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
});

export function ThreadsLight({ width, height }) {
  const { classes } = useStyles();

  return (
    <Box className={classes.svgWrapper} sx={{ width, height }}>
      <SvgIcon sx={{ width: "inherit", height: "inherit" }}>
        <ThreadsIconLight />
      </SvgIcon>
    </Box>
  );
}

export function ThreadsDark({ width, height }) {
  const { classes } = useStyles();

  return (
    <Box className={classes.svgWrapper} sx={{ width, height }}>
      <SvgIcon sx={{ width: "inherit", height: "inherit" }}>
        <ThreadsIconDark />
      </SvgIcon>
    </Box>
  );
}
