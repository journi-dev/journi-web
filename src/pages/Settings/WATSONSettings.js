import { Typography } from "@mui/material";
import { WatsonTabTitle } from "../../utils/WatsonTabTitle";

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
