import { Box, Typography } from "@mui/material";
import AnimatedNumber from "react-animated-numbers";

export default function Section2({ classes }) {
  return (
    <Box className={`${classes}`}>
      <Typography variant="h4" sx={{ m: "0 auto" }}>
        What can Journi do?
      </Typography>

      <Box className="flex-row-space" sx={{ width: "80%", m: "0 auto" }}>
        <Box className="flex-col">
          <Typography
            fontSize={72}
            fontWeight="bold"
            display="inline-flex"
            gap={1}
            mb={-1}
          >
            +
            <AnimatedNumber
              includeComma
              animateToNumber={123}
              transitions={(index) => ({
                type: "spring",
                duration: index + 0.3,
              })}
              fontStyle={{
                fontFamily: "'avenir_nextbold', 'Arial', 'sans-serif'",
                fontSize: 72,
              }}
            />
            %
          </Typography>
          <Typography fontWeight="bold" m="0 auto">
            increase in reach, year over year
          </Typography>
        </Box>
        <Box className="flex-col">
          <Typography
            fontSize={72}
            fontWeight="bold"
            display="inline-flex"
            gap={1}
            mb={-1}
          >
            +
            <AnimatedNumber
              includeComma
              animateToNumber={123}
              transitions={(index) => ({
                type: "spring",
                duration: index + 0.3,
              })}
              fontStyle={{
                fontFamily: "'avenir_nextbold', 'Arial', 'sans-serif'",
                fontSize: 72,
              }}
            />
            %
          </Typography>
          <Typography fontWeight="bold" m="0 auto">
            increase in reach, year over year
          </Typography>
        </Box>
        <Box className="flex-col">
          <Typography
            fontSize={72}
            fontWeight="bold"
            display="inline-flex"
            gap={1}
            mb={-1}
          >
            +
            <AnimatedNumber
              includeComma
              animateToNumber={123}
              transitions={(index) => ({
                type: "spring",
                duration: index + 0.3,
              })}
              fontStyle={{
                fontFamily: "'avenir_nextbold', 'Arial', 'sans-serif'",
                fontSize: 72,
              }}
            />
            %
          </Typography>
          <Typography fontWeight="bold" m="0 auto">
            increase in reach, year over year
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
