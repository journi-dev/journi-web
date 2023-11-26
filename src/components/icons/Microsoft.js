import { Box, SvgIcon } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { ReactComponent as MicrosoftIcon } from "../../assets/images/icons/Microsoft.svg";

const useStyles = makeStyles()((theme) => {
  return {
    svgWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
});

export default function MicrosoftLogo() {
  const { classes } = useStyles();
  return (
    <Box className={classes.svgWrapper}>
      <SvgIcon>
        <MicrosoftIcon />
      </SvgIcon>
    </Box>
  );
}
