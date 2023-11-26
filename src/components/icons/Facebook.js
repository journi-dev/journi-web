import { Box, SvgIcon } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { ReactComponent as FacebookIcon } from "../../assets/images/icons/facebook.svg";

const useStyles = makeStyles()((theme) => {
  return {
    svgWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
});

export default function Facebook({ width, height }) {
  const { classes } = useStyles();

  return (
    <Box className={classes.svgWrapper} sx={{ width, height }}>
      <SvgIcon sx={{ width: "inherit", height: "inherit" }}>
        <FacebookIcon />
      </SvgIcon>
    </Box>
  );
}
