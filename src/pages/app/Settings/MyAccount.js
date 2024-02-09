import { WatsonTabTitle } from "../../../utils/WatsonTabTitle";
import { Typography } from "@mui/material";

export default function MyAccount() {
  WatsonTabTitle("My Account Settings");
  return (
    <div>
      <Typography variant="h5">My Account</Typography>
    </div>
  );
}
