import { WatsonTabTitle } from "../../../utils/WatsonTabTitle";
import { Typography } from "@mui/material";

export default function AppAndWebsite() {
  WatsonTabTitle("App & Website Settings");
  return (
    <div>
      <Typography variant="h5">App & Website</Typography>
      <Typography>website link</Typography>
      <Typography>App & website name</Typography>
      <Typography>support domain</Typography>
      <Typography>app name</Typography>
      <Typography>app icon</Typography>
      <Typography>favicon</Typography>
      <Typography>app store link</Typography>
    </div>
  );
}
