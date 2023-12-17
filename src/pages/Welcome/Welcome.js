import { JourniTabTitle } from "../../utils/JourniTabTitle";
import { Box } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import Section4 from "./components/Section4";
import Section5 from "./components/Section5";
import Section6 from "./components/Section6";
import Section7 from "./components/Section7";
import Section8 from "./components/Section8";
import Section11 from "./components/Section11";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      padding: theme.spacing(5),
    },
    topSection: {
      paddingTop: theme.spacing(5),
      paddingRight: theme.spacing(5),
      paddingBottom: theme.spacing(0),
      paddingLeft: theme.spacing(5),
    },
    midSection: {
      paddingTop: theme.spacing(0),
      paddingRight: theme.spacing(5),
      paddingBottom: theme.spacing(0),
      paddingLeft: theme.spacing(5),
    },
    bottomSection: {
      paddingTop: theme.spacing(0),
      paddingRight: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },
  };
});

export default function Welcome() {
  JourniTabTitle("Welcome");

  const { classes } = useStyles();

  return (
    <Box className="flex-col-start">
      <Section1 classes={classes.topSection} />
      <Section2 classes={classes.midSection} />
      <Section3 classes={classes.container} />
      <Section4 classes={classes.container} />
      <Section5 classes={classes.container} />
      <Section6 classes={classes.container} />
      <Section7 classes={classes.container} />
      <Section8 classes={classes.container} />
      {/* (Reviews) <Section9 classes={classes.container} />
      <Typography variant="h4" sx={{ margin: "0 auto" }}>
      What people are saying about Journi
      </Typography>
    < (Social feed) Section10 classes={classes.container} /> */}

      <Section11 classes={classes.container} />
    </Box>
  );
}
