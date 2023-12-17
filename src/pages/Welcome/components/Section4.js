import { Box, Typography } from "@mui/material";
import { useState } from "react";
import NewsTile from "./NewsTile";

export default function Section4({ classes }) {
  const [activeTile, setActiveTile] = useState(null);

  return (
    <Box className={`${classes}`}>
      <Typography variant="h4" align="center" pb={2}>
        Our local business NEWSreel
      </Typography>
      <Box className="flex-row-start">
        <NewsTile
          letter="N"
          label="North Side Notables"
          tileColor="footer"
          activeTile={activeTile}
          setActiveTile={setActiveTile}
          position="left"
          borderRadius={50}
        />
        <NewsTile
          letter="E"
          label="East Side Excellence"
          tileColor="primary"
          activeTile={activeTile}
          setActiveTile={setActiveTile}
        />
        <NewsTile
          letter="W"
          label="West Side Wonders"
          tileColor="footer"
          activeTile={activeTile}
          setActiveTile={setActiveTile}
        />
        <NewsTile
          letter="S"
          label="South Side Staples"
          tileColor="primary"
          activeTile={activeTile}
          setActiveTile={setActiveTile}
          position="right"
          borderRadius={50}
        />
      </Box>
    </Box>
  );
}
