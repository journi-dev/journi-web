import { Box, Typography } from "@mui/material";
import { JourniTabTitle } from "../../utils/JourniTabTitle";
import { BasePlan } from "./components/BasePlan";
import { PlusPlanWithBanner } from "./components/PlusPlan";
import { MaxPlan } from "./components/MaxPlan";

export default function Pricing() {
  JourniTabTitle("Pricing");

  const svgArr = [
    require("../../assets/images/svg/pricing-0-base.svg"),
    require("../../assets/images/svg/pricing-1-plus.svg"),
    require("../../assets/images/svg/pricing-2-max.svg"),
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
        <BasePlan svgArr={svgArr} index={0} />
        <PlusPlanWithBanner svgArr={svgArr} />
        <MaxPlan svgArr={svgArr} index={2} />
      </Box>
    </Box>
  );
}
