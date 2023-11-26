import { SvgIcon } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { ReactComponent as DoordashIcon } from "../../assets/images/icons/Doordash.svg";

const useStyles = makeStyles()((theme) => {
  return {
    svgWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    svg: {
      fillColor: theme.palette.primary.main,
      // marginTop: theme.spacing(0.5),
      // marginLeft: theme.spacing(0.5),
      // marginRight: theme.spacing(-1),
    },
  };
});

export default function Doordash() {
  const { classes } = useStyles();
  return (
    <div className={classes.svgWrapper}>
      <SvgIcon className={classes.svg}>
        <DoordashIcon />
      </SvgIcon>
    </div>
  );
}
