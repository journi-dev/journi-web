import { WatsonTabTitle } from "../../../utils/WatsonTabTitle";
import { Typography } from "@mui/material";

export default function WATSONSettings() {
  WatsonTabTitle("WATSON Settings");
  return (
    <div>
      <Typography variant="h5">WATSON Settings</Typography>
      <Typography>
        platform type: merchant or restauranteur or hybrid
      </Typography>
    </div>
  );
}
