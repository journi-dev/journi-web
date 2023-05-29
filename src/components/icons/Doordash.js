import React from "react";
import { SvgIcon } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { ReactComponent as DoordashIcon } from "../../img/Doordash.svg";

const useStyles = makeStyles()((theme) => {
  return {
    mySvgStyle: {
      fillColor: theme.palette.primary.main,
      marginTop: theme.spacing(0.5),
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(-1),
    },
  };
});

export default function Doordash() {
  const { classes } = useStyles();
  return (
    <SvgIcon className={classes.mySvgStyle}>
      <DoordashIcon />
    </SvgIcon>
  );
}
