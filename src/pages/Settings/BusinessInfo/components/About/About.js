import { Box, Typography } from "@mui/material";
import BusinessCategories from "./BusinessCategories";
import Description from "./Description";
import OpeningDate from "./OpeningDate";
import Amenities from "./Amenities";

export default function About() {
  return (
    <Box>
      <Typography variant="h6">About</Typography>
      <BusinessCategories />
      <Description />
      <OpeningDate />
      <Amenities />
    </Box>
  );
}
