import React from "react";
import { Box, SvgIcon } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { ReactComponent as GoogleIcon } from "../../assets/images/icons/Google.svg";

const useStyles = makeStyles()((theme) => {
  return {
    svgWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
});

export default function GoogleLogo() {
  const { classes } = useStyles();
  return (
    <Box className={classes.svgWrapper}>
      <SvgIcon>
        <GoogleIcon />
      </SvgIcon>
    </Box>
  );
}
