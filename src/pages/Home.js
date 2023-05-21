import React from "react";
import { Box, Typography } from "@mui/material";
import Masonry from "react-masonry-css";
import Orders from "../components/Orders";
import { TabTitle } from "../utils/TabTitle";
import { useTranslation } from "react-i18next";
// import { makeStyles } from '@mui/material';

// const useStyles = makeStyles({
// })

// TODO: Make based on theme with makeStyles
const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
};

export default function Home() {
  TabTitle("home");
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="h5">{t("home")}</Typography>
      <Typography variant="h5">Pinned Updates</Typography>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        <div>
          <Typography>First Order</Typography>
          <Typography>10% off: FIRSTORDER</Typography>
          <Typography>
            Get 10% off your first online order. Offer expires 1 month after
            account sign-up.
          </Typography>
        </div>
        <div>
          <Typography>Front-Line Worker</Typography>
          <Typography>$10 off: ESSENTIAL</Typography>
          <Typography>
            As a token of gratitude, front-line and essential workers receive a
            permanent $10 discount for every order where this promo code is
            applied. Offer only valid on the verified user accounts.
            Verification required.
          </Typography>
        </div>
        <div>
          <Typography>French Fry-day</Typography>
          <Typography>Free Item: FRYDAY</Typography>
          <Typography>
            Happy Fry-day! Get a free small order of fries with your order.
            Today only.
          </Typography>
        </div>
        <div>
          <Typography>Buy One, Get One Free</Typography>
          <Typography> Menu Item Discount: BOGODRINK</Typography>
          <Typography>Buy one drink, and get one for free!</Typography>
        </div>
      </Masonry>
      <Orders />
    </Box>
  );
}
