import { ExpandMore, MoreVert } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Skeleton,
} from "@mui/material";
import Masonry from "react-masonry-css";
import MenuCategoryLoadingCard from "./MenuCategoryLoadingCard";

// TODO: Make based on theme with makeStyles
const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
};

export default function MenuLoadingAccordion() {
  return (
    <Accordion sx={{ mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box className="flex-row-start" sx={{ alignItems: "center" }}>
          <IconButton sx={{ mr: 1 }}>
            <MoreVert />
          </IconButton>
          <Skeleton width={200} height={40} />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          <MenuCategoryLoadingCard itemCount={3} />
          <MenuCategoryLoadingCard itemCount={1} />
          <MenuCategoryLoadingCard itemCount={2} />
          <MenuCategoryLoadingCard itemCount={2} />
          <MenuCategoryLoadingCard itemCount={4} />
          <MenuCategoryLoadingCard itemCount={3} />
        </Masonry>
      </AccordionDetails>
    </Accordion>
  );
}
