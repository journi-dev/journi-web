import { Typography } from "@mui/material";
import { WattsnTabTitle } from "../../utils/WattsnTabTitle";

export default function WATTSNSettings() {
  WattsnTabTitle("WATTSN Settings");
  return (
    <div>
      <Typography variant="h5">WATTSN Settings</Typography>
      <Typography>
        platform type: merchant or restauranteur or hybrid
      </Typography>
    </div>
  );
}
