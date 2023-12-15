import { JourniTabTitle } from "../../utils/JourniTabTitle";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section4 from "./components/Section4";
import { makeStyles } from "tss-react/mui";

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
  const accordions = [
    "💰 More sales",
    "🗣️ More reach",
    "🕹️ More control",
    "🤝 More support",
    "🧠 Less work",
  ];

  return (
    <Box className="flex-col">
      <Section1 classes={classes.topSection} />
      <Section2 classes={classes.midSection} />

      <Typography variant="h4" sx={{ margin: "0 auto" }}>
        Why use Journi?
      </Typography>

      {/* Accordion */}
      <Box width="50%" sx={{ mt: 2 }}>
        <Divider />
        {accordions.map((accordion, i) => (
          <Accordion
            key={i}
            elevation={0}
            sx={{ bgcolor: "background.default" }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h5">{accordion}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        <Divider />
      </Box>

      <Typography variant="h4" sx={{ margin: "0 auto" }}>
        Brands that trust Journi
      </Typography>
      <Typography>North Side Notables</Typography>
      <Typography>East Side Excellence</Typography>
      <Typography>West Side Wonders</Typography>
      <Typography>South Side Staples</Typography>

      <Section4 classes={classes.container} />

      <Typography variant="h4" sx={{ margin: "0 auto" }}>
        What people are saying about Journi
      </Typography>
    </Box>
  );
}
