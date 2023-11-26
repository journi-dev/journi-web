import { Box, SvgIcon } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { ReactComponent as XIconLight } from "../../assets/images/icons/x-light.svg";
import { ReactComponent as XIconDark } from "../../assets/images/icons/x-dark.svg";

const useStyles = makeStyles()((theme) => {
  return {
    svgWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
});

export function XLight({ width, height }) {
  const { classes } = useStyles();

  return (
    <Box className={classes.svgWrapper} sx={{ width, height }}>
      <SvgIcon sx={{ width: "inherit", height: "inherit" }}>
        <XIconLight />
      </SvgIcon>
    </Box>
  );
}

export function XDark({ width, height }) {
  const { classes } = useStyles();

  return (
    <Box className={classes.svgWrapper} sx={{ width, height }}>
      <SvgIcon sx={{ width: "inherit", height: "inherit" }}>
        <XIconDark />
      </SvgIcon>
    </Box>
  );
}
