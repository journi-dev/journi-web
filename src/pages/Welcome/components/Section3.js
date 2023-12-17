import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";

export default function Section3({ classes }) {
  const accordions = [
    "💰 More sales",
    "🗣️ More reach",
    "🕹️ More control",
    "🤝 More support",
    "🧠 Less work",
  ];
  return (
    <Box className={`${classes}`}>
      <Typography variant="h4" align="center" pb={2}>
        Why use Journi?
      </Typography>

      <Box className="flex-row-space">
        {/* Accordion */}
        <Box width="50%" sx={{ mt: 2 }}>
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
        </Box>

        <Box sx={{ bgcolor: "wheat", width: 500 }} />
      </Box>
    </Box>
  );
}
