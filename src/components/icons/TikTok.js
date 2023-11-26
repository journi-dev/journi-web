import { Box, SvgIcon } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { ReactComponent as TikTokIconLight } from "../../assets/images/icons/tiktok-light.svg";
import { ReactComponent as TikTokIconDark } from "../../assets/images/icons/tiktok-dark.svg";

const useStyles = makeStyles()((theme) => {
  return {
    svgWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
});

export function TikTokLight({ width, height }) {
  const { classes } = useStyles();

  return (
    <Box className={classes.svgWrapper} sx={{ width, height }}>
      <SvgIcon sx={{ width: "inherit", height: "inherit" }}>
        <TikTokIconLight />
      </SvgIcon>
    </Box>
  );
}

export function TikTokDark({ width, height }) {
  const { classes } = useStyles();

  return (
    <Box className={classes.svgWrapper} sx={{ width, height }}>
      <SvgIcon sx={{ width: "inherit", height: "inherit" }}>
        <TikTokIconDark />
      </SvgIcon>
    </Box>
  );
}
