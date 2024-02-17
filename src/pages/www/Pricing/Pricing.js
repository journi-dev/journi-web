import { JourniTabTitle } from "../../../utils/JourniTabTitle";
import { Box, Typography } from "@mui/material";
import { PRICE_INFO } from "../../../utils/PriceInfo";
import { PlanTileWithBanner } from "./components/PlanTile";

export default function Pricing() {
  JourniTabTitle("Pricing");

  const svgArr = [
    require("../../../assets/images/svg/pricing-0-base.svg"),
    require("../../../assets/images/svg/pricing-1-plus.svg"),
    require("../../../assets/images/svg/pricing-2-max.svg"),
  ];
  return (
    <Box sx={{ py: 5 }}>
      <Typography
        variant="coloredText1"
        component="h2"
        sx={{
          fontSize: 50,
          textAlign: "center",
          mb: 2,
        }}
      >
        Choose the plan that's best for you.
      </Typography>

      <Box className="flex-row-even" alignItems={"flex-end"}>
        {PRICE_INFO.map((plan, i) => (
          <PlanTileWithBanner
            svgArr={svgArr}
            index={i}
            plan={plan}
            isBannerShowing={plan.isFeatured}
          />
        ))}
      </Box>
    </Box>
  );
}
